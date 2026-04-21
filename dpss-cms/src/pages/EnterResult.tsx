import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAdmin } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { Search, CheckCircle, AlertCircle, ArrowLeft, Save } from 'lucide-react';

// Scholarship % based on total marks
function calcScholarship(total: number): number {
  if (total === 100) return 100;
  if (total >= 95)   return 50;
  if (total >= 90)   return 40;
  if (total >= 80)   return 30;
  if (total >= 70)   return 20;
  if (total >= 60)   return 10;
  return 0;
}

type Student = {
  'STUDENT NAME': string;
  'CLASS': string;
  'Hall Ticket Number': string;
};

const SCHOLARSHIP_OPTIONS = [100, 50, 40, 30, 20, 10, 0];

export default function EnterResult() {
  const navigate = useNavigate();

  // Step 1 — find student
  const [htNo, setHtNo]       = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [finding, setFinding] = useState(false);
  const [findErr, setFindErr] = useState<string | null>(null);

  // Step 2 — marks
  const [english, setEnglish] = useState('');
  const [science, setScience] = useState('');
  const [social,  setSocial]  = useState('');
  const [maths,   setMaths]   = useState('');
  const [gk,      setGk]      = useState('');
  const [scholarship, setScholarship] = useState<number | null>(null);
  const [remarks,  setRemarks] = useState('');
  const [saving,   setSaving]  = useState(false);
  const [saved,    setSaved]   = useState(false);
  const [saveErr,  setSaveErr] = useState<string | null>(null);

  const isHighClass = () => {
    const cls = student?.['CLASS'] ?? '';
    const num = parseInt(cls.replace(/\D/g, ''), 10);
    return num >= 6 && num <= 9;
  };

  const maxPerSubject = isHighClass() ? 20 : 25;
  const totalSubjects = isHighClass() ? 5 : 4;
  const maxTotal      = maxPerSubject * totalSubjects; // always 100

  const total = [english, science, social, maths, ...(isHighClass() ? [gk] : [])].reduce(
    (s, v) => s + (parseInt(v) || 0), 0
  );

  const findStudent = async () => {
    if (!htNo.trim()) return;
    setFinding(true); setFindErr(null); setStudent(null);
    const { data, error } = await supabaseAdmin
      .from('scholarship_applicants')
      .select('"STUDENT NAME", "CLASS", "Hall Ticket Number"')
      .eq('"Hall Ticket Number"', htNo.trim())
      .maybeSingle();

    setFinding(false);
    if (error || !data) {
      setFindErr('No student found with that Hall Ticket Number. Please check and try again.');
      return;
    }
    setStudent(data as Student);
    const suggested = calcScholarship(0);
    setScholarship(suggested);
  };

  const handleSave = async () => {
    const vals = [english, science, social, maths];
    if (isHighClass()) vals.push(gk);
    if (vals.some(v => v === '' || isNaN(Number(v)))) {
      setSaveErr('Please fill in all subject marks.'); return;
    }
    if (scholarship === null) {
      setSaveErr('Please select the scholarship percentage.'); return;
    }

    setSaving(true); setSaveErr(null);
    const { data: { session } } = await supabase.auth.getSession();
    const enteredBy = session?.user.email?.split('@')[0] ?? 'unknown';

    const row = {
      hall_ticket_no:         student!['Hall Ticket Number'],
      student_name:           student!['STUDENT NAME'],
      class:                  student!['CLASS'],
      english_marks:          parseInt(english),
      science_marks:          parseInt(science),
      social_marks:           parseInt(social),
      maths_marks:            parseInt(maths),
      gk_marks:               isHighClass() ? parseInt(gk) : null,
      total_marks:            total,
      max_marks:              maxTotal,
      scholarship_percentage: scholarship,
      remarks:                remarks.trim() || null,
      entered_by:             enteredBy,
      // Marks update does NOT flip is_published — only admin can publish explicitly
      // is_published is intentionally omitted here so upsert preserves existing value
    };

    // For new records, we need to set is_published = false explicitly
    const { data: existing } = await supabaseAdmin
      .from('scholarship_results')
      .select('id, is_published')
      .eq('hall_ticket_no', student!['Hall Ticket Number'])
      .maybeSingle();

    const upsertRow = existing ? row : { ...row, is_published: false };
    const { error } = await supabaseAdmin.from('scholarship_results').upsert([upsertRow], { onConflict: 'hall_ticket_no' });
    setSaving(false);
    if (error) { setSaveErr(`Save failed: ${error.message}`); return; }
    setSaved(true);
    setTimeout(() => navigate('/results'), 1800);
  };

  // Auto-suggest scholarship when total changes
  const suggested = calcScholarship(total);

  const SubjectInput = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label} <span className="text-gray-500 text-xs">(max {maxPerSubject})</span></label>
      <input type="number" min={0} max={maxPerSubject} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-surface border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
        placeholder={`0 – ${maxPerSubject}`} />
    </div>
  );

  if (saved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center animate-fade-in max-w-sm mx-auto px-6">
          <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <p className="text-xl font-bold text-white">Result Saved as DRAFT!</p>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            The result has been saved privately. Go to the <span className="text-amber-400 font-semibold">Results List</span> and click <span className="text-green-400 font-semibold">"Publish"</span> to make it visible to the student.
          </p>
          <p className="text-gray-500 text-xs mt-3">Redirecting to results list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/results')} className="p-2 rounded-xl bg-surface-card border border-surface-border text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Enter Scholarship Result</h1>
          <p className="text-gray-400 text-sm">Search by Hall Ticket No, enter marks, save.</p>
        </div>
      </div>

      {/* ── Step 1: Find Student ── */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 mb-5">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Step 1 — Find Student</h2>
        <div className="flex gap-3">
          <input value={htNo} onChange={e => setHtNo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && findStudent()}
            placeholder="Enter Hall Ticket Number..."
            className="flex-1 px-4 py-3 bg-surface border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          <button onClick={findStudent} disabled={finding || !htNo.trim()}
            className="px-5 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-2">
            {finding ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Search size={16} />}
            {finding ? 'Finding...' : 'Find'}
          </button>
        </div>

        {findErr && (
          <div className="flex items-center gap-2 mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <AlertCircle size={16} /> {findErr}
          </div>
        )}

        {student && (
          <div className="mt-4 bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-4 animate-fade-in">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shrink-0">
              {student['STUDENT NAME'][0]}
            </div>
            <div>
              <p className="text-white font-semibold">{student['STUDENT NAME']}</p>
              <p className="text-gray-400 text-sm">Class {student['CLASS']} &bull; {student['Hall Ticket Number']}</p>
            </div>
            <CheckCircle size={20} className="text-primary ml-auto shrink-0" />
          </div>
        )}
      </div>

      {/* ── Step 2: Enter Marks ── */}
      {student && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 mb-5 animate-fade-in">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Step 2 — Enter Marks</h2>
          <p className="text-gray-500 text-xs mb-5">
            {isHighClass() ? 'Class 6-9: 5 subjects × 20 marks each = 100 total' : 'Class 1-5: 4 subjects × 25 marks each = 100 total'}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <SubjectInput label="English"  value={english} onChange={setEnglish} />
            <SubjectInput label="Science"  value={science} onChange={setScience} />
            <SubjectInput label="Social"   value={social}  onChange={setSocial} />
            <SubjectInput label="Maths"    value={maths}   onChange={setMaths} />
            {isHighClass() && <SubjectInput label="GK" value={gk} onChange={setGk} />}
          </div>

          {/* Live total */}
          <div className="mt-5 flex items-center justify-between bg-surface rounded-xl px-5 py-3.5">
            <span className="text-gray-400 text-sm font-medium">Total Marks</span>
            <span className="text-2xl font-bold text-white">{total}<span className="text-gray-500 text-base font-normal">/{maxTotal}</span></span>
          </div>
        </div>
      )}

      {/* ── Step 3: Scholarship ── */}
      {student && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 mb-5 animate-fade-in">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-1">Step 3 — Scholarship %</h2>

          {/* Auto-suggest banner */}
          {total > 0 && (
            <div className="mb-4 text-xs font-semibold text-primary bg-primary/10 border border-primary/25 px-4 py-2.5 rounded-xl">
              💡 Based on marks ({total}/100), suggested scholarship: <strong>{suggested > 0 ? `${suggested}%` : 'Not Selected'}</strong>
              {scholarship !== suggested && (
                <button onClick={() => setScholarship(suggested)} className="ml-2 underline text-accent hover:text-yellow-300">Apply</button>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {SCHOLARSHIP_OPTIONS.map(pct => (
              <button key={pct} onClick={() => setScholarship(pct)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                  scholarship === pct
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
                    : 'bg-surface border-surface-border text-gray-400 hover:text-white hover:border-gray-500'
                }`}>
                {pct > 0 ? `${pct}%` : 'Not Selected'}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Remarks <span className="text-gray-500 text-xs">(optional)</span></label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)}
              rows={2} placeholder="Any notes about this result..."
              className="w-full px-4 py-3 bg-surface border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" />
          </div>
        </div>
      )}

      {/* Save */}
      {student && (
        <div className="animate-fade-in">
          {saveErr && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
              <AlertCircle size={16} /> {saveErr}
            </div>
          )}
          <button onClick={handleSave} disabled={saving || scholarship === null}
            className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-base transition-all disabled:opacity-50 shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
            {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
            {saving ? 'Saving...' : 'Save Result'}
          </button>
        </div>
      )}
    </div>
  );
}
