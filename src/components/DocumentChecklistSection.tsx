import React, { useState } from 'react';
import { 
  FileCheck2, 
  Printer, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language, ServiceItem } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface DocumentChecklistSectionProps {
  language: Language;
  onSelectService: (service: ServiceItem) => void;
  onRequestAppointment: (service: ServiceItem) => void;
}

export const DocumentChecklistSection: React.FC<DocumentChecklistSectionProps> = ({
  language,
  onSelectService,
  onRequestAppointment
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const t = TRANSLATIONS[language];

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const title = language === 'en' ? currentService.titleEn : currentService.titleKn;
  const docs = language === 'en' ? currentService.requiredDocsEn : currentService.requiredDocsKn;
  const guidance = language === 'en' ? currentService.guidanceEn : currentService.guidanceKn;

  const handlePrintChecklist = () => {
    window.print();
  };

  return (
    <section id="checklist" className="py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-blue-900" />
            <span>Official Document Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.checklistHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.checklistSubheading}
          </p>
        </div>

        {/* Two Column Layout: Service Selectors on Left, Detailed Guidance Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selection Navigation */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider px-2 block mb-2">
              Select Civic Service:
            </span>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  selectedServiceId === service.id
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs font-bold leading-tight">
                    {language === 'en' ? service.titleEn : service.titleKn}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${selectedServiceId === service.id ? 'text-amber-200' : 'text-slate-500'}`}>
                    {service.category}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${selectedServiceId === service.id ? 'text-amber-300' : 'text-slate-400'}`} />
              </button>
            ))}

            {/* General Rule Box */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 mt-4 space-y-2 shadow-xs">
              <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Self-Attestation Standard</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                As per Karnataka State Citizen Charter, all citizen document submissions can be self-attested with signature and date, except where a formal court or notary affidavit is explicitly demanded by statute.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Checklist & Instructions for Selected Service */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Verified Checklist
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {title}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrintChecklist}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
                    title="Print Document Checklist"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>Print Checklist</span>
                  </button>

                  <button
                    onClick={() => onRequestAppointment(currentService)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs"
                  >
                    <span>Book Visit</span>
                  </button>
                </div>
              </div>

              {/* Table of Documents */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Required Document Matrix (Original vs Copy)
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Document Title</th>
                        <th className="py-2.5 px-3 w-28">Type</th>
                        <th className="py-2.5 px-3">Official Verification Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {docs.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {doc.name}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              doc.type === 'Original'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : doc.type === 'Photocopy'
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {doc.type}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600 leading-relaxed">
                            {doc.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step by Step guidance */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Procedural Guidelines at Panchayat Office
                </h4>
                <div className="space-y-2.5">
                  {guidance.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Counter and Fee Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-200 text-xs">
                <div>
                  <strong className="block text-blue-950 font-bold mb-0.5">Designated Service Desk:</strong>
                  <span className="text-slate-700">{language === 'en' ? currentService.counterEn : currentService.counterKn}</span>
                </div>
                <div>
                  <strong className="block text-blue-950 font-bold mb-0.5">Statutory Fees / Charges:</strong>
                  <span className="text-slate-700">{language === 'en' ? currentService.statutoryFeeEn : currentService.statutoryFeeKn}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
