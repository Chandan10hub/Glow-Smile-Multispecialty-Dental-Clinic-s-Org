import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  LogOut, 
  RefreshCw, 
  MessageSquare, 
  Settings, 
  Bell, 
  BarChart3,
  Edit,
  Save,
  Check,
  X
} from 'lucide-react';
import { AppointmentRecord, EnquiryRecord, Language, OfficeConfigState } from '../types/index.ts';

interface AdminDashboardProps {
  token: string;
  adminUser: { email: string; name: string; role: string };
  onLogout: () => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  adminUser,
  onLogout,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'enquiries' | 'settings'>('appointments');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [officeConfig, setOfficeConfig] = useState<OfficeConfigState | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAppt, setEditingAppt] = useState<AppointmentRecord | null>(null);
  const [editingEnq, setEditingEnq] = useState<EnquiryRecord | null>(null);

  // Status edit form state
  const [editStatus, setEditStatus] = useState<string>('');
  const [editRemarks, setEditRemarks] = useState<string>('');
  const [editSlot, setEditSlot] = useState<string>('');
  const [editOfficer, setEditOfficer] = useState<string>('');

  // Enquiry response form state
  const [enqResponse, setEnqResponse] = useState<string>('');
  const [enqStatus, setEnqStatus] = useState<string>('');
  const [enqOfficer, setEnqOfficer] = useState<string>('');

  // Settings form state
  const [specialNoticeEn, setSpecialNoticeEn] = useState('');
  const [specialNoticeKn, setSpecialNoticeKn] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [apptsRes, enqsRes, analyticsRes, configRes] = await Promise.all([
        fetch('/api/admin/appointments', { headers: authHeaders }),
        fetch('/api/admin/enquiries', { headers: authHeaders }),
        fetch('/api/admin/analytics', { headers: authHeaders }),
        fetch('/api/office-config')
      ]);

      if (apptsRes.ok) {
        const d = await apptsRes.json();
        setAppointments(d.appointments || []);
      }
      if (enqsRes.ok) {
        const d = await enqsRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (analyticsRes.ok) {
        const d = await analyticsRes.json();
        setAnalytics(d);
      }
      if (configRes.ok) {
        const d = await configRes.json();
        setOfficeConfig(d);
        setSpecialNoticeEn(d.specialNoticeEn || '');
        setSpecialNoticeKn(d.specialNoticeKn || '');
        setWorkingHours(d.workingHours || '');
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleUpdateAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({
          status: editStatus,
          officialRemarks: editRemarks,
          approvedSlot: editSlot || undefined,
          assignedOfficer: editOfficer || undefined
        })
      });

      if (res.ok) {
        setEditingAppt(null);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update appointment:', err);
    }
  };

  const handleUpdateEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({
          status: enqStatus,
          officialResponse: enqResponse,
          respondedBy: enqOfficer || 'Kumbalgodu GP Desk'
        })
      });

      if (res.ok) {
        setEditingEnq(null);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update enquiry:', err);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/admin/office-config', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({
          specialNoticeEn,
          specialNoticeKn,
          workingHours
        })
      });

      if (res.ok) {
        setSaveSuccessMessage('Office settings and alert notices updated successfully.');
        setTimeout(() => setSaveSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  const handleExportCsv = () => {
    window.location.href = '/api/admin/export/appointments';
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesSearch = 
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.mobileNumber.includes(searchQuery) ||
      a.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchesSearch = 
      e.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.mobileNumber.includes(searchQuery) ||
      e.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-800 text-amber-300 flex items-center justify-center font-bold">
              GP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Officer Control Console
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  Demo Auth Active
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                Gram Panchayat Kumbalgodu Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="hidden md:block text-right">
              <span className="font-bold text-slate-200 block">{adminUser.name}</span>
              <span className="text-[11px] text-slate-400">{adminUser.email}</span>
            </div>

            <button
              onClick={fetchData}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-950 text-red-200 hover:bg-red-900 border border-red-800 transition font-medium cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Dashboard</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex space-x-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => { setActiveTab('appointments'); setStatusFilter('ALL'); }}
            className={`py-3 px-4 font-bold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'appointments'
                ? 'border-amber-400 text-amber-300 bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Requests ({appointments.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('enquiries'); setStatusFilter('ALL'); }}
            className={`py-3 px-4 font-bold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'enquiries'
                ? 'border-amber-400 text-amber-300 bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Citizen Grievances & Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 font-bold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'settings'
                ? 'border-amber-400 text-amber-300 bg-slate-800/50'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Notice Board & Working Hours</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Analytics Top Stats */}
        {analytics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Visits</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{analytics.appointments.total}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-xs bg-amber-50/30">
              <span className="text-[11px] font-semibold text-amber-800 uppercase block">Pending Scrutiny</span>
              <div className="text-2xl font-black text-amber-900 mt-1">{analytics.appointments.pending}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-xs bg-emerald-50/30">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase block">Approved Visits</span>
              <div className="text-2xl font-black text-emerald-900 mt-1">{analytics.appointments.approved}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-300 shadow-xs bg-blue-50/30">
              <span className="text-[11px] font-semibold text-blue-800 uppercase block">Completed Records</span>
              <div className="text-2xl font-black text-blue-900 mt-1">{analytics.appointments.completed}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-purple-300 shadow-xs bg-purple-50/30 col-span-2 md:col-span-1">
              <span className="text-[11px] font-semibold text-purple-800 uppercase block">Citizen Enquiries</span>
              <div className="text-2xl font-black text-purple-900 mt-1">{analytics.enquiries.total}</div>
            </div>
          </div>
        )}

        {/* TAB 1: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            
            {/* Filter and Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
                {['ALL', 'PENDING_REVIEW', 'APPROVED', 'COMPLETED', 'REJECTED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      statusFilter === st
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'ALL' ? 'All Requests' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, ref, mobile..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleExportCsv}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-xs shrink-0 cursor-pointer"
                  title="Export records to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Ref Number</th>
                      <th className="py-3 px-4">Citizen Particulars</th>
                      <th className="py-3 px-4">Service Required</th>
                      <th className="py-3 px-4">Preferred Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Official Remarks</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-mono font-bold text-blue-950">
                          {appt.referenceNumber}
                          {appt.isDemo && (
                            <span className="block text-[9px] text-amber-700 font-sans">
                              (Demo Data)
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <strong className="block text-slate-900">{appt.fullName}</strong>
                          <span className="text-slate-500 text-[11px]">+91 {appt.mobileNumber}</span>
                          {appt.email && <span className="block text-slate-400 text-[10px]">{appt.email}</span>}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800 max-w-[180px]">
                          {appt.serviceName}
                        </td>
                        <td className="py-3 px-4">
                          <span className="block font-semibold text-slate-900">{appt.preferredDate}</span>
                          <span className="text-[11px] text-slate-500">{appt.preferredTime}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            appt.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : appt.status === 'PENDING_REVIEW'
                              ? 'bg-amber-100 text-amber-800'
                              : appt.status === 'COMPLETED'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {appt.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {appt.officialRemarks || 'Pending Scrutiny'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setEditingAppt(appt);
                              setEditStatus(appt.status);
                              setEditRemarks(appt.officialRemarks || '');
                              setEditSlot(appt.approvedSlot || `${appt.preferredDate} at ${appt.preferredTime}`);
                              setEditOfficer(appt.assignedOfficer || 'Panchayat Development Officer Desk');
                            }}
                            className="px-2.5 py-1.5 rounded bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold text-[11px] border border-blue-200 transition cursor-pointer"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredAppointments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500">
                          No appointment requests found matching filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Status:</span>
                {['ALL', 'RECEIVED', 'IN_REVIEW', 'RESOLVED', 'CLOSED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      statusFilter === st
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'ALL' ? 'All Enquiries' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grievance or subject..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Tracking Ref</th>
                      <th className="py-3 px-4">Citizen</th>
                      <th className="py-3 px-4">Category & Subject</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Official Action</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 font-mono font-bold text-blue-950">
                          {enq.referenceNumber}
                        </td>
                        <td className="py-3 px-4">
                          <strong className="block text-slate-900">{enq.citizenName}</strong>
                          <span className="text-slate-500 text-[11px]">+91 {enq.mobileNumber}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block text-[10px] font-bold uppercase text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                            {enq.category}
                          </span>
                          <div className="font-semibold text-slate-800 mt-1">{enq.subject}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {enq.description}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            enq.status === 'RESOLVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : enq.status === 'IN_REVIEW'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                          {enq.officialResponse || 'Awaiting initial review'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setEditingEnq(enq);
                              setEnqStatus(enq.status);
                              setEnqResponse(enq.officialResponse || '');
                              setEnqOfficer(enq.respondedBy || 'PDO Redressal Cell');
                            }}
                            className="px-2.5 py-1.5 rounded bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold text-[11px] border border-blue-200 transition cursor-pointer"
                          >
                            Respond
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredEnquiries.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500">
                          No citizen grievances found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SETTINGS & NOTICE BOARD */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Notice Board & Working Hours Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Changes made here immediately reflect on the citizen portal header banner and contact details.
              </p>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Portal Special Notice / Banner (English)
                </label>
                <textarea
                  rows={2}
                  value={specialNoticeEn}
                  onChange={(e) => setSpecialNoticeEn(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Portal Special Notice / Banner (Kannada - ಕನ್ನಡ)
                </label>
                <textarea
                  rows={2}
                  value={specialNoticeKn}
                  onChange={(e) => setSpecialNoticeKn(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Official Working Hours Text
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Default: 10:00 AM – 05:00 PM (Monday to Saturday). Sunday Closed.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save Configuration Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* EDIT APPOINTMENT MODAL */}
      {editingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">Scrutiny & Scheduling</span>
                <h4 className="text-base font-bold text-slate-900">
                  Update Request: {editingAppt.referenceNumber}
                </h4>
              </div>
              <button onClick={() => setEditingAppt(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">Citizen Name:</span>
              <strong className="text-slate-900 text-sm">{editingAppt.fullName} (+91 {editingAppt.mobileNumber})</strong>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px]">Service & Reason:</span>
              <div className="font-medium text-slate-800">{editingAppt.serviceName}</div>
              <p className="text-[11px] text-slate-600 italic mt-0.5">&quot;{editingAppt.reasonForVisit}&quot;</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Administrative Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none"
              >
                <option value="PENDING_REVIEW">PENDING REVIEW</option>
                <option value="APPROVED">APPROVED (Slot Confirmed)</option>
                <option value="COMPLETED">COMPLETED (Documents Handed Over)</option>
                <option value="REJECTED">REJECTED (Incomplete Documentation)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Confirmed Slot & Counter</label>
              <input
                type="text"
                value={editSlot}
                onChange={(e) => setEditSlot(e.target.value)}
                placeholder="e.g. 2026-11-12 at 11:30 AM (Counter 2)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Assigned Officer / Desk</label>
              <input
                type="text"
                value={editOfficer}
                onChange={(e) => setEditOfficer(e.target.value)}
                placeholder="e.g. Village Accountant / PDO Desk"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Official Remarks (Visible to Citizen on Tracking)</label>
              <textarea
                rows={3}
                value={editRemarks}
                onChange={(e) => setEditRemarks(e.target.value)}
                placeholder="Instructions on required originals, or reason for rescheduling..."
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setEditingAppt(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateAppointment(editingAppt.id)}
                className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ENQUIRY MODAL */}
      {editingEnq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">Citizen Grievance Redressal</span>
                <h4 className="text-base font-bold text-slate-900">
                  Response to: {editingEnq.referenceNumber}
                </h4>
              </div>
              <button onClick={() => setEditingEnq(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <strong className="block text-slate-900">{editingEnq.subject}</strong>
              <p className="text-slate-600 mt-1">{editingEnq.description}</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Status</label>
              <select
                value={enqStatus}
                onChange={(e) => setEnqStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
              >
                <option value="RECEIVED">RECEIVED</option>
                <option value="IN_REVIEW">IN REVIEW</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Official Response</label>
              <textarea
                rows={3}
                value={enqResponse}
                onChange={(e) => setEnqResponse(e.target.value)}
                placeholder="Type official reply to the citizen regarding grievance resolution..."
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button onClick={() => setEditingEnq(null)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => handleUpdateEnquiry(editingEnq.id)}
                className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800"
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
