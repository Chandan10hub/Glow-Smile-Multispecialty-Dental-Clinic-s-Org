import React from 'react';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  Clock, 
  CreditCard, 
  MapPin, 
  Calendar,
  Download,
  HelpCircle
} from 'lucide-react';
import { ServiceItem, Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  language: Language;
  onClose: () => void;
  onBookAppointment: (service: ServiceItem) => void;
  onOpenEnquiry: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  language,
  onClose,
  onBookAppointment,
  onOpenEnquiry
}) => {
  if (!service) return null;

  const t = TRANSLATIONS[language];
  const title = language === 'en' ? service.titleEn : service.titleKn;
  const desc = language === 'en' ? service.shortDescEn : service.shortDescKn;
  const badge = language === 'en' ? service.badgeEn : service.badgeKn;
  const eligibility = language === 'en' ? service.eligibilityEn : service.eligibilityKn;
  const docs = language === 'en' ? service.requiredDocsEn : service.requiredDocsKn;
  const guidance = language === 'en' ? service.guidanceEn : service.guidanceKn;
  const fee = language === 'en' ? service.statutoryFeeEn : service.statutoryFeeKn;
  const timeframe = language === 'en' ? service.timeframeEn : service.timeframeKn;
  const counter = language === 'en' ? service.counterEn : service.counterKn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-400/30">
                {badge}
              </span>
              <span className="text-[11px] text-slate-300">
                {counter}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {desc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Quick Stat Pill Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-900 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Turnaround Time</span>
                <span className="font-bold text-slate-900">{timeframe}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:border-l sm:border-slate-200 sm:pl-3">
              <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Statutory Fees</span>
                <span className="font-bold text-slate-900">{fee}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:border-l sm:border-slate-200 sm:pl-3">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Office Desk</span>
                <span className="font-bold text-slate-900">{counter}</span>
              </div>
            </div>
          </div>

          {/* Eligibility Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2.5 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Eligibility & Jurisdiction Criteria (Verified)</span>
            </h4>
            <ul className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              {eligibility.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-slate-700 leading-relaxed">
                  <span className="text-emerald-700 font-bold text-sm leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents: Original vs Photocopy Table */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <FileCheck className="w-4 h-4 text-blue-900" />
                <span>Document Checklist (Original vs Photocopy)</span>
              </h4>
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Self-Attestation Required
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-[11px] uppercase font-bold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Document Name</th>
                    <th className="py-2.5 px-3 w-28">Requirement</th>
                    <th className="py-2.5 px-3">Official Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {docs.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {d.name}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          d.type === 'Original'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : d.type === 'Photocopy'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-slate-200 text-slate-800'
                        }`}>
                          {d.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 leading-relaxed">
                        {d.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              * Note: Please ensure all photocopies bear the clear signature or thumb impression of the applicant.
            </p>
          </div>

          {/* Application Procedure & Guidance */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-slate-700" />
              <span>Step-by-Step Procedure at Kumbalgodu Panchayat</span>
            </h4>
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              {guidance.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Statutory Disclaimer */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-[11px] text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Statutory Declaration:</strong> The Gram Panchayat does not collect any unofficial charges. If any discrepancy or delayed record scrutiny occurs, citizens may directly escalate to the Panchayat Development Officer (PDO) during office hours.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenEnquiry(service);
            }}
            className="text-xs font-semibold text-slate-700 hover:text-blue-900 underline"
          >
            Ask a Specific Question
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAppointment(service);
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Request Appointment for this Service</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
