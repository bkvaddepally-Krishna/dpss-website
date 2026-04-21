import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabaseAdmin } from '../lib/supabase';
import {
  GraduationCap, Plus, Search, Trash2, RefreshCw, Award,
  Globe, EyeOff, CheckSquare, Loader2, ChevronUp, ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';

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
  is_published: boolean;
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
  const [data, setData]             = useState<Result[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [deleting, setDeleting]     = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [bulkPublishing, setBulkPublishing] = useState(false);
  const [sortField, setSortField]   = useState<'student_name' | 'total_marks' | 'created_at'>('created_at');
  const [sortDir, setSortDir]       = useState<'asc' | 'desc'>('desc');

  const load = async () => {
    setLoading(true);
    const { data: rows, error } = await supabaseAdmin
      .from('scholarship_results')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load results: ' + error.message);
    }
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const togglePublish = async (row: Result) => {
    const newState = !row.is_published;
    setPublishing(row.id);
    const { error } = await supabaseAdmin
      .from('scholarship_results')
      .update({ is_published: newState })
      .eq('id', row.id);
    setPublishing(null);
    if (error) {
      toast.error(`Failed: ${error.message}`);
      return;
    }
    setData(prev => prev.map(r => r.id === row.id ? { ...r, is_published: newState } : r));
    toast.success(newState ? `✅ Published for ${row.student_name}` : `🔒 Unpublished for ${row.student_name}`);
  };

  const bulkPublishAll = async () => {
    const drafts = filtered.filter(r => !r.is_published);
    if (drafts.length === 0) { toast.info('No draft results to publish.'); return; }
    if (!window.confirm(`Publish ALL ${drafts.length} draft results? Students will be able to see their results immediately.`)) return;

    setBulkPublishing(true);
    const ids = drafts.map(r => r.id);
    const { error } = await supabaseAdmin
      .from('scholarship_results')
      .update({ is_published: true })
      .in('id', ids);
    setBulkPublishing(false);
    if (error) { toast.error('Bulk publish failed: ' + error.message); return; }
    setData(prev => prev.map(r => ids.includes(r.id) ? { ...r, is_published: true } : r));
    toast.success(`✅ ${drafts.length} results published successfully!`);
  };

  const deleteResult = async (id: string, name: string) => {
    if (!window.confirm(`Delete result for ${name}? This cannot be undone.`)) return;
    setDeleting(id);
    const { error } = await supabaseAdmin.from('scholarship_results').delete().eq('id', id);
    if (error) { toast.error('Delete failed: ' + error.message); setDeleting(null); return; }
    setData(prev => prev.filter(r => r.id !== id));
    setDeleting(null);
    toast.success('Result deleted.');
  };

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = data
    .filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.hall_ticket_no.toLowerCase().includes(q) || r.student_name.toLowerCase().includes(q) || r.class.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'all' || (filterStatus === 'draft' ? !r.is_published : r.is_published);
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      let av: any = a[sortField], bv: any = b[sortField];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const publishedCount = data.filter(r => r.is_published).length;
  const draftCount     = data.filter(r => !r.is_published).length;

  const SortIcon = ({ field }: { field: typeof sortField }) =>
    sortField === field
      ? (sortDir === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)
      : null;

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-amber-400" size={24} />
            Scholarship Results
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {data.length} total — <span className="text-green-400 font-semibold">{publishedCount} published</span>
            {' '}/ <span className="text-amber-400 font-semibold">{draftCount} drafts</span>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={bulkPublishAll}
            disabled={bulkPublishing || draftCount === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
          >
            {bulkPublishing
              ? <Loader2 size={15} className="animate-spin" />
              : <CheckSquare size={15} />}
            Publish All Drafts ({draftCount})
          </button>
          <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-surface-border rounded-xl text-gray-400 hover:text-white text-sm transition-colors">
            <RefreshCw size={15} /> Refresh
          </button>
          <Link to="/results/enter"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-primary/20">
            <Plus size={18} /> Enter New Result
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: data.length, color: 'text-white' },
          { label: 'Published', value: publishedCount, color: 'text-green-400' },
          { label: 'Drafts', value: draftCount, color: 'text-amber-400' },
          { label: 'With Scholarship', value: data.filter(r => r.scholarship_percentage > 0).length, color: 'text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-surface-card border border-surface-border rounded-2xl p-5">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by Hall Ticket, student name or class..."
            className="w-full pl-10 pr-4 py-3 bg-surface-card border border-surface-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
        </div>
        <div className="flex bg-surface-card border border-surface-border rounded-xl overflow-hidden text-sm">
          {(['all', 'published', 'draft'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2.5 font-semibold capitalize transition-colors ${
                filterStatus === s
                  ? s === 'published' ? 'bg-green-600 text-white' : s === 'draft' ? 'bg-amber-500 text-gray-900' : 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-20 bg-surface-card rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Award size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">No results found.</p>
          <p className="text-sm mt-1">
            {data.length === 0
              ? 'Click "Enter New Result" to add the first result.'
              : 'Try adjusting your search or filter.'}
          </p>
          {data.length === 0 && (
            <Link to="/results/enter" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors">
              <Plus size={16} /> Enter First Result
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1.2fr_auto] gap-4 px-6 py-3 border-b border-surface-border text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <button className="text-left flex items-center hover:text-white transition-colors" onClick={() => handleSort('student_name')}>
              Student <SortIcon field="student_name" />
            </button>
            <span>Hall Ticket</span>
            <button className="text-left flex items-center hover:text-white transition-colors" onClick={() => handleSort('total_marks')}>
              Marks <SortIcon field="total_marks" />
            </button>
            <span>Scholarship</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-surface-border">
            {filtered.map(row => {
              const scholarshipColor = SCHOLARSHIP_COLOR[row.scholarship_percentage] ?? SCHOLARSHIP_COLOR[0];
              const isPublishing = publishing === row.id;

              return (
                <div key={row.id} className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1.2fr_auto] gap-4 px-6 py-4 items-center hover:bg-white/3 transition-colors">
                  {/* Student */}
                  <div>
                    <p className="text-white font-medium text-sm">{row.student_name}</p>
                    <p className="text-gray-500 text-xs">Class {row.class}</p>
                  </div>

                  {/* Hall Ticket */}
                  <p className="font-mono text-gray-300 text-sm">{row.hall_ticket_no}</p>

                  {/* Marks */}
                  <div>
                    <p className="text-white font-semibold">{row.total_marks}<span className="text-gray-500 font-normal">/{row.max_marks}</span></p>
                    <p className="text-gray-500 text-xs">{Math.round((row.total_marks / row.max_marks) * 100)}%</p>
                  </div>

                  {/* Scholarship */}
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border w-fit ${scholarshipColor}`}>
                    <Award size={10} />
                    {row.scholarship_percentage > 0 ? `${row.scholarship_percentage}%` : 'None'}
                  </span>

                  {/* Status Badge + Publish Toggle */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      row.is_published
                        ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                    }`}>
                      {row.is_published ? <Globe size={10} /> : <EyeOff size={10} />}
                      {row.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                    <button
                      onClick={() => togglePublish(row)}
                      disabled={isPublishing}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        row.is_published
                          ? 'bg-gray-700 hover:bg-red-500/20 hover:text-red-400 text-gray-300'
                          : 'bg-green-600 hover:bg-green-500 text-white shadow'
                      } disabled:opacity-50`}
                    >
                      {isPublishing
                        ? <Loader2 size={12} className="animate-spin" />
                        : row.is_published ? <EyeOff size={12} /> : <Globe size={12} />}
                      {row.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteResult(row.id, row.student_name)}
                    disabled={deleting === row.id}
                    className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                  >
                    {deleting === row.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
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
