import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface TrackingSectionProps {
  language: Language;
  initialQuery?: string;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  language,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searchType, setSearchType] = useState<'appointment' | 'enquiry' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleTrack(initialQuery);
    }
  }, [initialQuery]);

  const handleTrack = async (searchVal?: string) => {
    const val = (searchVal || query).trim();
    if (!val) {
      setError('Please enter a Reference Number (KP-XXXX / ENQ-XXXX) or registered Mobile Number.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);
    setSearchType(null);

    try {
      // First try appointment lookup
      const isEnq = val.toUpperCase().startsWith('ENQ');
      
      if (!isEnq) {
        const apptRes = await fetch(`/api/appointments/track/${encodeURIComponent(val)}?mobile=${encodeURIComponent(val)}`);
        if (apptRes.ok) {
          const apptData = await apptRes.json();
          setResult(apptData);
          setSearchType('appointment');
          setIsLoading(false);
          return;
        }
      }

      // If not found or if inquiry code, try enquiry lookup
      const enqRes = await fetch(`/api/enquiries/track/${encodeURIComponent(val)}`);
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setResult(enqData);
        setSearchType('enquiry');
        setIsLoading(false);
        return;
      }

      setError('No active records found matching this Reference Number or Mobile. Please verify the code or visit the Panchayat office.');
    } catch (err: any) {
      setError('Network error while checking application status.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW':
      case 'RECEIVED':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Scrutiny (Pending Review)</span>
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved & Slot Confirmed</span>
          </span>
        );
      case 'COMPLETED':
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Completed / Dispatched</span>
          </span>
        );
      case 'REJECTED':
      case 'CLOSED':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>Incomplete / Reschedule Advised</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded text-xs bg-slate-100 text-slate-800 font-medium">
            {status}
          </span>
        );
    }
  };

  return (
    <section id="track" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Citizen Transparency Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            {t.trackHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {t.trackSubheading}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleTrack(); }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.trackInputPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 shadow-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer disabled:bg-slate-400"
            >
              <Search className="w-4 h-4" />
              <span>{isLoading ? 'Checking...' : t.trackButton}</span>
            </button>
          </form>

          {/* Sample quick buttons for user convenience */}
          <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span>Try sample demonstration references:</span>
            <button
              type="button"
              onClick={() => { setQuery('KP-2026-1042'); handleTrack('KP-2026-1042'); }}
              className="font-mono text-blue-900 hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
            >
              KP-2026-1042 (Approved)
            </button>
            <button
              type="button"
              onClick={() => { setQuery('KP-2026-1043'); handleTrack('KP-2026-1043'); }}
              className="font-mono text-amber-800 hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
            >
              KP-2026-1043 (Pending)
            </button>
            <button
              type="button"
              onClick={() => { setQuery('ENQ-2026-8819'); handleTrack('ENQ-2026-8819'); }}
              className="font-mono text-emerald-800 hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
            >
              ENQ-2026-8819 (Enquiry)
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 max-w-2xl mx-auto flex items-start space-x-2.5 mb-8">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block">{error}</span>
              <p className="text-[11px] text-red-700">
                Tip: Reference numbers are printed on your acknowledgment slip in the format KP-YEAR-XXXX.
              </p>
            </div>
          </div>
        )}

        {/* TRACKING RESULT DISPLAY */}
        {result && (
          <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 max-w-3xl mx-auto animate-fade-in space-y-6">
            
            {/* Header with Reference & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {searchType === 'appointment' ? 'Appointment Request Record' : 'Citizen Grievance / Enquiry'}
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                    {result.referenceNumber}
                  </h3>
                  {result.isDemo && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
                      Sample Demo Record
                    </span>
                  )}
                </div>
              </div>

              <div>
                {getStatusBadge(result.status)}
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Administrative Lifecycle Stage:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                {/* Stage 1: Submitted */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs text-slate-900 font-bold">1. Request Received</strong>
                    <span className="text-[11px] text-slate-600">Logged in Panchayat register</span>
                  </div>
                </div>

                {/* Stage 2: Scrutiny */}
                <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                  result.status !== 'PENDING_REVIEW'
                    ? 'bg-blue-50/70 border-blue-200'
                    : 'bg-amber-50 border-amber-300'
                }`}>
                  {result.status !== 'PENDING_REVIEW' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  )}
                  <div>
                    <strong className="block text-xs text-slate-900 font-bold">2. Officer Scrutiny</strong>
                    <span className="text-[11px] text-slate-600">
                      {result.assignedOfficer || 'Desk verification in progress'}
                    </span>
                  </div>
                </div>

                {/* Stage 3: Decision */}
                <div className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                  result.status === 'APPROVED' || result.status === 'COMPLETED' || result.status === 'RESOLVED'
                    ? 'bg-emerald-50 border-emerald-300'
                    : result.status === 'REJECTED' || result.status === 'CLOSED'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}>
                  {result.status === 'APPROVED' || result.status === 'COMPLETED' || result.status === 'RESOLVED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : result.status === 'REJECTED' || result.status === 'CLOSED' ? (
                    <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block text-xs text-slate-900 font-bold">3. Final Decision</strong>
                    <span className="text-[11px] text-slate-600">
                      {result.status === 'APPROVED' ? 'Visit Slot Confirmed' : result.status === 'PENDING_REVIEW' ? 'Awaiting Decision' : result.status}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Official Remarks Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                <span>Official Panchayat Remarks & Instructions</span>
              </span>
              <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                {result.officialRemarks || result.officialResponse || 'Your application is under active consideration. No further documents are required at this stage.'}
              </p>

              {result.approvedSlot && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                  <span className="font-semibold">Confirmed Visit Schedule:</span>
                  <span className="font-mono font-bold">{result.approvedSlot}</span>
                </div>
              )}
            </div>

            {/* Record Specifics Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Citizen Name</span>
                <strong className="text-slate-900">{result.fullName || result.citizenName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Service / Subject</span>
                <strong className="text-slate-900">{result.serviceName || result.subject}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Registered Date</span>
                <span className="text-slate-700">
                  {new Date(result.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Assigned Desk</span>
                <span className="text-slate-700 font-medium">
                  {result.assignedOfficer || result.respondedBy || 'Kumbalgodu Helpdesk'}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
