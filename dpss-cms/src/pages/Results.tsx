import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabaseAdmin } from '../lib/supabase';
import { GraduationCap, Plus, Search, Trash2, RefreshCw, Award } from 'lucide-react';

type Result = {
  id: string;
  hall_ticket_no: string;
  student_name: string;
  class: string;
  total_marks: number;
  max_marks: number;
  scholarship_percentage: number;
  remarks: string;
  entered_by: string;
  created_at: string;
};

const SCHOLARSHIP_COLOR: Record<number, string> = {
  100: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/20',
  50:  'text-emerald-400 bg-emerald-500/15 border-emerald-500/20',
  40:  'text-blue-400 bg-blue-500/15 border-blue-500/20',
  30:  'text-purple-400 bg-purple-500/15 border-purple-500/20',
  20:  'text-pink-400 bg-pink-500/15 border-pink-500/20',
  10:  'text-orange-400 bg-orange-500/15 border-orange-500/20',
  0:   'text-gray-400 bg-gray-500/15 border-gray-500/20',
};

export default function Results() {
  const [data, setData]       = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: rows } = await supabaseAdmin
      .from('scholarship_results')
      .select('*')
      .order('created_at', { ascending: false });
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteResult = async (id: string) => {
    if (!window.confirm('Delete this result? This cannot be undone.')) return;
    setDeleting(id);
    await supabaseAdmin.from('scholarship_results').delete().eq('id', id);
    setData(prev => prev.filter(r => r.id !== id));
    setDeleting(null);
  };

  const filtered = data.filter(r => {
    const q = search.toLowerCase();
    return !q || r.hall_ticket_no.toLowerCase().includes(q) || r.student_name.toLowerCase().includes(q) || r.class.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-amber-400" size={24} />
            Scholarship Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">{data.length} results entered</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-surface-border rounded-xl text-gray-400 hover:text-white text-sm transition-colors">
            <RefreshCw size={15} /> Refresh
          </button>
          <Link to="/results/enter"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-primary/20">
            <Plus size={18} /> Enter New Result
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by Hall Ticket No, student name or class..."
          className="w-full pl-10 pr-4 py-3 bg-surface-card border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-surface-card rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Award size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">No results entered yet.</p>
          <p className="text-sm mt-1">Click "Enter New Result" to add a student's result.</p>
          <Link to="/results/enter" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors">
            <Plus size={16} /> Enter First Result
          </Link>
        </div>
      ) : (
        <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-surface-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Student</span>
            <span>Hall Ticket</span>
            <span>Total Marks</span>
            <span>Scholarship</span>
            <span></span>
          </div>

          <div className="divide-y divide-surface-border">
            {filtered.map(row => {
              const scholarshipColor = SCHOLARSHIP_COLOR[row.scholarship_percentage] ?? SCHOLARSHIP_COLOR[0];
              return (
                <div key={row.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-white/3 transition-colors">
                  <div>
                    <p className="text-white font-medium text-sm">{row.student_name}</p>
                    <p className="text-gray-500 text-xs">Class {row.class}</p>
                  </div>
                  <p className="font-mono text-gray-300 text-sm">{row.hall_ticket_no}</p>
                  <div>
                    <p className="text-white font-semibold">{row.total_marks}<span className="text-gray-500 font-normal">/{row.max_marks}</span></p>
                    <p className="text-gray-500 text-xs">{Math.round((row.total_marks / row.max_marks) * 100)}%</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border w-fit ${scholarshipColor}`}>
                    <Award size={10} />
                    {row.scholarship_percentage > 0 ? `${row.scholarship_percentage}% Scholarship` : 'Not Selected'}
                  </span>
                  <button onClick={() => deleteResult(row.id)} disabled={deleting === row.id}
                    className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40">
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
