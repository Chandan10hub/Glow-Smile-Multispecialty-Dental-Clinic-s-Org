import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Printer, 
  Eye, 
  CheckCircle, 
  Building2, 
  X,
  FileCheck2
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { OFFICIAL_DOWNLOADABLE_FORMS } from '../data/servicesData.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface DownloadFormsSectionProps {
  language: Language;
}

export const DownloadFormsSection: React.FC<DownloadFormsSectionProps> = ({
  language
}) => {
  const [previewForm, setPreviewForm] = useState<any | null>(null);
  const t = TRANSLATIONS[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="forms" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Download className="w-3.5 h-3.5 text-emerald-800" />
            <span>Standard Prescribed Formats</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.formsHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.formsSubheading}
          </p>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_DOWNLOADABLE_FORMS.map((form) => (
            <div 
              key={form.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-900/40 hover:shadow-md transition duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                    {form.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {form.fileSize}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-900 transition mb-2">
                  {language === 'en' ? form.titleEn : form.titleKn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {form.descriptionEn}
                </p>

                <div className="text-[11px] text-slate-500 font-medium pb-2 border-b border-slate-200">
                  Authority: {form.department}
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-2">
                <button
                  onClick={() => setPreviewForm(form)}
                  className="flex-1 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.downloadBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>
            * Physical hard copies of all official forms are also available free of cost at the Kumbalgodu Panchayat Front Desk.
          </span>
          <span className="font-semibold text-slate-800 hidden sm:inline">
            Zero Charges for Government Forms
          </span>
        </div>

      </div>

      {/* FORM PREVIEW / PRINT MODAL */}
      {previewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm">Official Form Printable Preview</h4>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Form</span>
                </button>
                <button
                  onClick={() => setPreviewForm(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Paper Document Body (Formatted like Karnataka Official Template) */}
            <div className="p-8 overflow-y-auto bg-white font-serif text-slate-900 text-xs space-y-6">
              
              {/* Official Header */}
              <div className="text-center border-b-2 border-slate-900 pb-4">
                <div className="text-xs uppercase font-sans tracking-widest text-slate-600">
                  Government of Karnataka • Rural Development and Panchayat Raj
                </div>
                <h2 className="text-base font-bold font-sans text-slate-900 uppercase mt-1">
                  Gram Panchayat Office Kumbalgodu
                </h2>
                <div className="text-xs text-slate-600 font-sans">
                  Bengaluru South Taluk, Bengaluru Urban District, Karnataka 560074
                </div>
                <div className="mt-3 inline-block border-2 border-slate-900 px-4 py-1 text-xs font-bold uppercase font-sans tracking-wide">
                  {previewForm.titleEn}
                </div>
              </div>

              {/* Form Fields Simulation */}
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Application Reference No: __________________</span>
                  <span>Date: _____ / _____ / 2026</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-2">
                  <div className="font-bold uppercase text-[11px] text-slate-800">1. Applicant Particulars</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Full Name: ___________________________________</div>
                    <div>Aadhaar No: _______________________________</div>
                    <div>Father / Husband: ____________________________</div>
                    <div>Mobile: ____________________________________</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-2">
                  <div className="font-bold uppercase text-[11px] text-slate-800">2. Residential Address in Kumbalgodu</div>
                  <div>Door / House No: ______________________ Street / Cross: _____________________________</div>
                  <div>Layout / Village: ___________________________________ PIN: 560074</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-2">
                  <div className="font-bold uppercase text-[11px] text-slate-800">3. Purpose / Specific Details</div>
                  <div className="h-16 border-b border-dashed border-slate-400">
                    <span className="text-slate-400 italic">State particulars or reason for requesting service:</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded space-y-2">
                  <div className="font-bold uppercase text-[11px] text-slate-800">4. Declaration & Undertaking</div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    I hereby declare that the particulars provided above are true to the best of my knowledge. I understand that submitting fraudulent information is punishable under Section 199/200 of IPC and the Karnataka Panchayat Raj Act.
                  </p>
                  <div className="flex justify-between items-end pt-6">
                    <div>Place: Kumbalgodu<br />Date: ____________</div>
                    <div className="text-center">
                      _________________________________<br />
                      Signature / Thumb Impression of Applicant
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-slate-900 pt-4 text-[11px] text-slate-500 flex justify-between">
                  <span>Form Code: {previewForm.id}</span>
                  <span>Kumbalgodu Gram Panchayat Official Form</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-3 flex justify-between items-center text-xs text-slate-600 no-print">
              <span>Press Print to generate paper copy or PDF.</span>
              <button
                onClick={() => setPreviewForm(null)}
                className="px-4 py-1.5 bg-slate-300 hover:bg-slate-400 text-slate-800 font-semibold rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
