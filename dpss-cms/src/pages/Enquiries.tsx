import { useEffect, useState } from 'react';
import { supabaseAdmin } from '../lib/supabase';
import { MessageSquare, Search, ChevronDown, ChevronUp, Phone, Mail, Clock, RefreshCw } from 'lucide-react';

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = ['New', 'Read', 'Handled'];

export default function Enquiries() {
  const [data, setData]       = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: rows } = await supabaseAdmin
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    await supabaseAdmin.from('contact_inquiries').update({ status }).eq('id', id);
    setData(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setUpdating(null);
  };

  const filtered = data.filter(r => {
    const matchStatus = filter === 'All' || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.phone.includes(q);
    return matchStatus && matchSearch;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({ ...acc, [s]: data.filter(r => r.status === s).length }), {} as Record<string, number>);

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <MessageSquare className="text-blue-400" size={24} />
            Contact Enquiries
          </h1>
          <p className="text-gray-400 text-sm mt-1">{data.length} total enquiries received</p>
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
              filter === s
                ? 'bg-primary text-white shadow-sm shadow-primary/30'
                : 'bg-surface-card border border-surface-border text-gray-400 hover:text-white'
            }`}>
            {s} {s !== 'All' && <span className="ml-1 opacity-70">({counts[s] ?? 0})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
          className="w-full pl-10 pr-4 py-3 bg-surface-card border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => <div key={i} className="h-20 bg-surface-card rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
          <p>No enquiries match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(row => (
            <div key={row.id} className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
              {/* Row header */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer"
                onClick={() => setExpanded(expanded === row.id ? null : row.id)}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                  {row.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-medium text-sm">{row.name}</p>
                    <StatusBadge status={row.status} />
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1"><Mail size={11} />{row.email}</span>
                    <span className="flex items-center gap-1"><Phone size={11} />{row.phone}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{fmtDate(row.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-gray-400 text-xs hidden sm:block max-w-[180px] truncate">{row.subject || 'General Inquiry'}</p>
                  {expanded === row.id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === row.id && (
                <div className="px-6 pb-5 border-t border-surface-border animate-fade-in">
                  <div className="mt-4 bg-surface rounded-xl p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Message</p>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{row.message}</p>
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
    New:     'bg-blue-500/15 text-blue-400 border-blue-500/20',
    Read:    'bg-gray-500/15 text-gray-400 border-gray-500/20',
    Handled: 'bg-green-500/15 text-green-400 border-green-500/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[status] ?? map['Read']}`}>
      {status}
    </span>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
