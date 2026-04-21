import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  School
} from 'lucide-react';
import { toast } from 'sonner';

export default function ScholarshipApplicants() {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  useEffect(() => {
    fetchApplicants();
  }, []);

  async function fetchApplicants() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scholarship_applicants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (error: any) {
      toast.error('Error fetching applicants: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      (app["STUDENT NAME"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app["FATHER'S NAME"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app["FATHER’S CONTACT NUMBER"]?.includes(searchTerm));
    
    const matchesClass = filterClass === 'All' || app["CLASS"] === filterClass;
    
    return matchesSearch && matchesClass;
  });

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Student Name", "Class", "DOB", "Father's Name", "Phone", "Hall Ticket", "Status"].join(",") + "\n"
      + filteredApplicants.map(app => [
          app["STUDENT NAME"],
          app["CLASS"],
          app["DOB"],
          app["FATHER'S NAME"],
          app["FATHER’S CONTACT NUMBER"],
          app["Hall Ticket Number"] || 'N/A',
          app["RATING"] || 'New'
        ].join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `scholarship_applicants_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scholarship Applicants</h1>
          <p className="text-gray-500 text-sm">Manage and track DPSSAT 2026 registrations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} /> Export CSV
          </button>
          <button 
            onClick={fetchApplicants}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
          >
            Refresh List
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Applicants</p>
              <h3 className="text-2xl font-bold">{applicants.length}</h3>
            </div>
          </div>
        </div>
        {/* Add more stats if needed */}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name, father's name or mobile..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="All">All Classes</option>
            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`Class ${n}`}>Class {n}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student & Class</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Parent Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Hall Ticket</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : filteredApplicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No applicants found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900">{app["STUDENT NAME"]}</p>
                        <p className="text-xs text-gray-500">{app["CLASS"]} • DOB: {app["DOB"]}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Users size={14} /> {app["FATHER'S NAME"]}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone size={14} /> {app["FATHER’S CONTACT NUMBER"]}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono font-bold">
                        {app["Hall Ticket Number"] || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-600 line-clamp-1 truncate max-w-[200px]" title={app["ADDRESS"]}>
                        {app["ADDRESS"]}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app["RATING"] === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {app["RATING"] || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
