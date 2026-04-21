import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabaseAdmin } from '../lib/supabase';
import { MessageSquare, FileText, GraduationCap, TrendingUp, ArrowRight, Clock } from 'lucide-react';

interface Stats {
  contacts: number;
  contactsNew: number;
  admissions: number;
  admissionsNew: number;
  results: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ contacts: 0, contactsNew: 0, admissions: 0, admissionsNew: 0, results: 0 });
  const [recentContacts, setRecentContacts]   = useState<any[]>([]);
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [
        { count: cTotal }, { count: cNew },
        { count: aTotal }, { count: aNew },
        { count: rTotal },
        { data: rc }, { data: ra },
      ] = await Promise.all([
        supabaseAdmin.from('contact_inquiries').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabaseAdmin.from('admissions').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabaseAdmin.from('scholarship_results').select('*', { count: 'exact', head: true }),
        supabaseAdmin.from('contact_inquiries').select('id,name,subject,created_at,status').order('created_at', { ascending: false }).limit(5),
        supabaseAdmin.from('admissions').select('id,first_name,last_name,class,created_at,status').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        contacts: cTotal ?? 0, contactsNew: cNew ?? 0,
        admissions: aTotal ?? 0, admissionsNew: aNew ?? 0,
        results: rTotal ?? 0,
      });
      setRecentContacts(rc ?? []);
      setRecentAdmissions(ra ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const STAT_CARDS = [
    { label: 'Contact Enquiries', value: stats.contacts, badge: stats.contactsNew, color: 'text-blue-400', bg: 'bg-blue-500/10', icon: MessageSquare, to: '/enquiries' },
    { label: 'Admission Applications', value: stats.admissions, badge: stats.admissionsNew, color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: FileText, to: '/admissions' },
    { label: 'Results Entered', value: stats.results, badge: 0, color: 'text-amber-400', bg: 'bg-amber-500/10', icon: GraduationCap, to: '/results' },
  ];

  if (loading) return <Loader />;

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map(({ label, value, badge, color, bg, icon: Icon, to }) => (
          <Link key={label} to={to}
            className="bg-surface-card border border-surface-border rounded-2xl p-6 hover:border-gray-600 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon size={22} className={color} />
              </div>
              {badge > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/15 text-red-400 text-xs font-bold rounded-full border border-red-500/20">
                  {badge} New
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className={`text-xs font-medium mt-3 ${color} flex items-center gap-1 group-hover:gap-2 transition-all`}>
              View all <ArrowRight size={12} />
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-400" /> Recent Enquiries
            </h2>
            <Link to="/enquiries" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {recentContacts.length === 0 ? (
              <p className="text-gray-500 text-sm p-6 text-center">No enquiries yet.</p>
            ) : recentContacts.map((c) => (
              <div key={c.id} className="px-6 py-4 hover:bg-white/3 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <StatusBadge status={c.status} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-500 text-xs">{c.subject || 'General Inquiry'}</p>
                  <span className="text-gray-700">·</span>
                  <p className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={10} /> {timeAgo(c.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <FileText size={16} className="text-emerald-400" /> Recent Applications
            </h2>
            <Link to="/admissions" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-surface-border">
            {recentAdmissions.length === 0 ? (
              <p className="text-gray-500 text-sm p-6 text-center">No applications yet.</p>
            ) : recentAdmissions.map((a) => (
              <div key={a.id} className="px-6 py-4 hover:bg-white/3 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{a.first_name} {a.last_name}</p>
                  <StatusBadge status={a.status} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-500 text-xs">Class {a.class}</p>
                  <span className="text-gray-700">·</span>
                  <p className="text-gray-600 text-xs flex items-center gap-1">
                    <Clock size={10} /> {timeAgo(a.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">Enter Scholarship Results</p>
            <p className="text-gray-400 text-sm">Add exam marks and scholarship percentages for students.</p>
          </div>
        </div>
        <Link to="/results/enter"
          className="shrink-0 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-md shadow-primary/20">
          Enter Results <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New:      'bg-blue-500/15 text-blue-400 border-blue-500/20',
    Read:     'bg-gray-500/15 text-gray-400 border-gray-500/20',
    Handled:  'bg-green-500/15 text-green-400 border-green-500/20',
    Reviewed: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    Called:   'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Enrolled: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[status] ?? map['Read']}`}>
      {status}
    </span>
  );
}

function Loader() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="h-8 w-48 bg-surface-card rounded-xl animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map(i => <div key={i} className="h-36 bg-surface-card rounded-2xl animate-pulse" />)}
      </div>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return 'Just now';
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
