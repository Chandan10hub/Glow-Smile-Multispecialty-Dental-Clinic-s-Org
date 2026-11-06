import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  UserCheck, 
  Calendar,
  Search,
  FileCheck2
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  fontScale: number;
  onFontScaleChange: (scale: number) => void;
  onOpenAppointmentModal: () => void;
  onOpenAdminModal: () => void;
  onOpenEnquiryModal: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  fontScale,
  onFontScaleChange,
  onOpenAppointmentModal,
  onOpenAdminModal,
  onOpenEnquiryModal,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'services', label: t.navServices },
    { id: 'track', label: t.navTrack },
    { id: 'checklist', label: t.navChecklist },
    { id: 'forms', label: t.navForms },
    { id: 'announcements', label: t.navAnnouncements },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Government Tricolor Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

      {/* Top Utility Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-medium tracking-wide text-amber-300">
              {t.govPortalTitle}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              {t.portalSubtext}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Font Scaler */}
            <div className="flex items-center space-x-1 border border-slate-700 rounded px-1.5 py-0.5 bg-slate-800">
              <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">Text Size:</span>
              <button 
                onClick={() => onFontScaleChange(0.9)} 
                className={`px-1 rounded hover:bg-slate-700 ${fontScale === 0.9 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                onClick={() => onFontScaleChange(1.0)} 
                className={`px-1 rounded hover:bg-slate-700 ${fontScale === 1.0 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="Default font size"
              >
                A
              </button>
              <button 
                onClick={() => onFontScaleChange(1.1)} 
                className={`px-1 rounded hover:bg-slate-700 ${fontScale === 1.1 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'kn' : 'en')}
              className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-medium transition cursor-pointer"
              title="Toggle English / ಕನ್ನಡ"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdminModal}
              className="flex items-center space-x-1 text-slate-300 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition"
              title="Panchayat Officer Login"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.navAdmin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-3.5 cursor-pointer group"
        >
          {/* Emblem representation */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-slate-900 text-amber-400 flex items-center justify-center shadow-md border border-amber-400/30 group-hover:scale-105 transition">
            <Building2 className="w-7 h-7 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Official Citizen Portal
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">
                Bengaluru South • RDPR
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === 'en' ? 'Gram Panchayat Office Kumbalgodu' : 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಾರ್ಯಾಲಯ'}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'en' ? 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಾರ್ಯಾಲಯ, ಬೆಂಗಳೂರು' : 'Kumbalgodu Gram Panchayat Office, Bengaluru South, Karnataka'}
            </p>
          </div>
        </div>

        {/* Desktop Header Quick CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('track')}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition"
          >
            <Search className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.navTrack}</span>
          </button>

          <button
            onClick={onOpenAppointmentModal}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-sm transition hover:shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{t.navAppointment}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={onOpenAppointmentModal}
            className="px-2.5 py-1.5 text-xs font-bold text-white bg-blue-900 rounded-lg flex items-center space-x-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px]">Book</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2.5 text-xs font-semibold transition border-b-2 ${
                activeSection === 'home'
                  ? 'border-blue-900 text-blue-900 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navHome}
            </button>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2.5 text-xs font-semibold transition border-b-2 ${
                  activeSection === item.id
                    ? 'border-blue-900 text-blue-900 bg-white font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-600">
            <span className="flex items-center space-x-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>10 AM – 5 PM (Mon–Sat)</span>
            </span>
            <span className="text-slate-300">|</span>
            <button
              onClick={onOpenEnquiryModal}
              className="text-blue-900 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>{t.enquireBtn}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
              activeSection === 'home' ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
            }`}
          >
            {t.navHome}
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${
                activeSection === item.id ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiryModal();
              }}
              className="w-full text-center py-2 px-3 text-sm font-semibold rounded bg-slate-100 text-slate-800"
            >
              {t.enquireBtn}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full text-center py-2 px-3 text-sm font-semibold rounded bg-amber-50 text-amber-900 border border-amber-200"
            >
              {t.navAdmin}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
