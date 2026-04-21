import { useEffect, useState } from 'react';
import { supabaseAdmin } from '../lib/supabase';
import { FileText, Search, ChevronDown, ChevronUp, Phone, Calendar, RefreshCw, User } from 'lucide-react';

type Application = {
  id: string;
  reg_id?: string;
  first_name?: string;
  last_name?: string;
  student_first_name?: string;
  student_last_name?: string;
  class?: string;
  class_applying_for?: string;
  dob?: string;
  date_of_birth?: string;
  gender?: string;
  father_name?: string;
  father_phone?: string;
  mother_name?: string;
  perm_address?: string;
  permanent_address?: string;
  city?: string;
  source?: string;
  status?: string;
  created_at: string;
};

const STATUS_OPTIONS = ['New', 'Reviewed', 'Called', 'Enrolled'];

export default function Admissions() {
  const [data, setData]       = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: rows } = await supabaseAdmin
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await supabaseAdmin.from('admissions').update({ status }).eq('id', id);
    setData(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setUpdating(null);
  };

  const getName = (a: Application) =>
    `${a.first_name ?? a.student_first_name ?? ''} ${a.last_name ?? a.student_last_name ?? ''}`.trim() || 'N/A';

  const getClass = (a: Application) => a.class ?? a.class_applying_for ?? 'N/A';

  const filtered = data.filter(r => {
    const matchStatus = filter === 'All' || r.status === filter;
    const q = search.toLowerCase();
    const name = getName(r).toLowerCase();
    const matchSearch = !q || name.includes(q) || (r.father_phone ?? '').includes(q) || getClass(r).toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: data.filter(r => r.status === s).length }), {} as Record<string, number>);

  const Detail = ({ label, value }: { label: string; value?: string | null }) => (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="text-gray-200 text-sm">{value || '—'}</p>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="text-emerald-400" size={24} />
            Admission Applications
          </h1>
          <p className="text-gray-400 text-sm mt-1">{data.length} total applications received</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-surface-border rounded-xl text-gray-400 hover:text-white text-sm transition-colors">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...STATUS_OPTIONS].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === s ? 'bg-primary text-white shadow-sm shadow-primary/30'
                : 'bg-surface-card border border-surface-border text-gray-400 hover:text-white'
            }`}>
            {s} {s !== 'All' && <span className="ml-1 opacity-70">({counts[s] ?? 0})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by student name, phone or class..."
          className="w-full pl-10 pr-4 py-3 bg-surface-card border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-surface-card rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p>No applications match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(row => (
            <div key={row.id} className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
              <div className="flex items-center gap-4 px-6 py-4 cursor-pointer"
                onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium text-sm">{getName(row)}</p>
                    {row.reg_id && <span className="text-[10px] font-mono text-gray-500 bg-surface px-2 py-0.5 rounded">{row.reg_id}</span>}
                    <StatusBadge status={row.status ?? 'New'} />
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500 flex-wrap">
                    <span>Class {getClass(row)}</span>
                    <span className="flex items-center gap-1"><Phone size={10} /> {row.father_phone ?? '—'}</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {fmtDate(row.created_at)}</span>
                  </div>
                </div>
                {expanded === row.id ? <ChevronUp size={16} className="text-gray-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-500 shrink-0" />}
              </div>

              {/* Expanded full details */}
              {expanded === row.id && (
                <div className="px-6 pb-5 border-t border-surface-border animate-fade-in">
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface rounded-xl p-4">
                    <Detail label="Student Name"    value={getName(row)} />
                    <Detail label="Class"           value={getClass(row)} />
                    <Detail label="Date of Birth"   value={row.dob ?? row.date_of_birth} />
                    <Detail label="Gender"          value={row.gender} />
                    <Detail label="Father's Name"   value={row.father_name} />
                    <Detail label="Father's Phone"  value={row.father_phone} />
                    <Detail label="Mother's Name"   value={row.mother_name} />
                    <Detail label="City"            value={row.city} />
                    <Detail label="Source"          value={row.source} />
                    <div className="col-span-2 sm:col-span-3">
                      <Detail label="Permanent Address" value={row.perm_address ?? row.permanent_address} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-gray-500 font-medium mr-2">Mark as:</p>
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => updateStatus(row.id, s)}
                        disabled={updating === row.id || row.status === s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50
                          ${row.status === s ? 'bg-primary text-white' : 'bg-surface border border-surface-border text-gray-400 hover:text-white hover:border-gray-500'}`}>
                        {updating === row.id ? '...' : s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New:      'bg-blue-500/15 text-blue-400 border-blue-500/20',
    Reviewed: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    Called:   'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Enrolled: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[status] ?? map['New']}`}>
      {status}
    </span>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
