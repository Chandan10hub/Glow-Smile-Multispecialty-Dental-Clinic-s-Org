import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Globe, 
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdminModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onOpenAdminModal,
  onNavigate
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t-4 border-emerald-600 no-print">
      
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Office Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm block">
                  {language === 'en' ? 'Gram Panchayat Kumbalgodu' : 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Bengaluru South Taluk, Karnataka
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {t.footerGovNote}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>Panchayat Code: <strong className="text-slate-200">216345</strong> (LGD Code)</div>
              <div>Jurisdiction: Kumbalgodu Gram Panchayat</div>
            </div>
          </div>

          {/* Col 2: Citizen Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">
              Civic Facilitation
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-amber-300 flex items-center space-x-1.5 transition text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.navServices}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('track')} 
                  className="hover:text-amber-300 flex items-center space-x-1.5 transition text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.navTrack}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('checklist')} 
                  className="hover:text-amber-300 flex items-center space-x-1.5 transition text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.navChecklist}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('forms')} 
                  className="hover:text-amber-300 flex items-center space-x-1.5 transition text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.navForms}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('announcements')} 
                  className="hover:text-amber-300 flex items-center space-x-1.5 transition text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.navAnnouncements}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official State Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">
              Karnataka State Government Links
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://sevasindhu.karnataka.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between group"
                >
                  <span>Seva Sindhu Citizen Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://rdpr.karnataka.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between group"
                >
                  <span>RDPR Karnataka Official</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://ejanma.karnataka.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between group"
                >
                  <span>e-JanMa Civil Registration</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://nadakacheri.karnataka.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between group"
                >
                  <span>Nadakacheri Revenue Services</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
              <li>
                <a
                  href="https://bengalurusouth.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between group"
                >
                  <span>Bengaluru South District Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative Hours & Officer Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[11px]">
              Office Access
            </h4>
            <div className="space-y-1.5 text-slate-400 text-xs">
              <div className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mon–Sat: 10:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Mysore Road, Kumbalgodu, Bengaluru</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Helpline: 080-28437000 (Subject to confirmation)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={onOpenAdminModal}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Panchayat Officer Console</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-slate-950 py-4 px-4 sm:px-8 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 Gram Panchayat Office Kumbalgodu, Bengaluru South, Karnataka. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">{t.footerLegal}</span>
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'kn' : 'en')}
              className="text-emerald-400 hover:underline"
            >
              {language === 'en' ? 'ಕನ್ನಡ ಆವೃತ್ತಿ' : 'English Version'}
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
