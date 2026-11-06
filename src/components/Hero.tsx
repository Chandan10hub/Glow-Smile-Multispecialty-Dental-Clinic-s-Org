import React from 'react';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileCheck, 
  BellRing,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Language, AnnouncementItem } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface HeroProps {
  language: Language;
  onOpenAppointmentModal: () => void;
  onNavigateToServices: () => void;
  onNavigateToTrack: () => void;
  announcements: AnnouncementItem[];
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenAppointmentModal,
  onNavigateToServices,
  onNavigateToTrack,
  announcements
}) => {
  const t = TRANSLATIONS[language];
  const latestAnnouncement = announcements.find(a => a.important) || announcements[0];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Subtle background geometric pattern for official authority */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Live Notice / Announcement Ticker */}
      {latestAnnouncement && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-amber-300 font-medium overflow-hidden">
              <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 uppercase text-[10px] font-bold tracking-wider shrink-0">
                <BellRing className="w-3 h-3 mr-1 animate-pulse" />
                {t.heroNoticePrefix}
              </span>
              <span className="truncate">
                {language === 'en' ? latestAnnouncement.titleEn : latestAnnouncement.titleKn}: {language === 'en' ? latestAnnouncement.contentEn : latestAnnouncement.contentKn}
              </span>
            </div>
            <button 
              onClick={onNavigateToServices}
              className="hidden md:inline-flex items-center text-[11px] text-amber-300 hover:text-white underline shrink-0 cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      )}

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.heroBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-200">RDPR Karnataka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.heroHeading}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {language === 'en' ? (
                <>
                  Welcome to the official digital services portal of <strong>Gram Panchayat Office Kumbalgodu</strong> (Bengaluru South Taluk, Karnataka). Access document guidelines for Birth and Death certificates, E-Swathu property documentation, civic requests, and schedule your appointment with designated administrative officers.
                </>
              ) : (
                <>
                  <strong>ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಾರ್ಯಾಲಯ</strong> (ಬೆಂಗಳೂರು ದಕ್ಷಿಣ ತಾಲೂಕು, ಕರ್ನಾಟಕ) ದ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ನಾಗರಿಕ ಸೇವಾ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ. ಜನನ-ಮರಣ ಪ್ರಮಾಣಪತ್ರಗಳು, ಈ-ಸ್ವತ್ತು ಆಸ್ತಿ ದಾಖಲೆಗಳು ಮತ್ತು ನಾಗರಿಕ ವಿಚಾರಣೆಗಳಿಗೆ ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ ಹಾಗೂ ಕಚೇರಿ ಭೇಟಿಗೆ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನಿಗದಿಪಡಿಸಿಕೊಳ್ಳಿ.
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenAppointmentModal}
                className="flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 transition hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-100" />
                <span>{t.heroBtnAppointment}</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={onNavigateToServices}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.heroBtnServices}</span>
              </button>

              <button
                onClick={onNavigateToTrack}
                className="flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                <span>{t.heroBtnTrack}</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Statutory Guidelines</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Digital Acknowledgment Slips</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent Scrutiny Process</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Administrative Information Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 text-slate-800 shadow-2xl border border-slate-200/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                    Office Directory & Hours
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {language === 'en' ? 'Panchayat Office Kumbalgodu' : 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಾರ್ಯಾಲಯ'}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                  GP
                </div>
              </div>

              <div className="space-y-4 py-4 text-xs">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Location & Jurisdiction:</strong>
                    <span className="text-slate-600 leading-relaxed">
                      Kumbalgodu Village & Industrial Area, Mysore Road, Bengaluru South Taluk, Karnataka – 560074.
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-blue-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Working Hours:</strong>
                    <span className="text-slate-600">
                      Monday to Saturday: 10:00 AM – 05:00 PM
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Lunch Break: 1:30 PM – 2:15 PM | Sunday: Closed
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Key Citizen Counters:</strong>
                    <span className="text-slate-600">
                      Counter 1: Birth & Death Records • Counter 2: E-Swathu & Property Tax • Counter 3: Grievances & Redressal
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Note / Alert */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <span>
                  <strong>Important Notice:</strong> Physical visits require original identity documents and prior administrative confirmation. Hours subject to official confirmation.
                </span>
              </div>

              {/* Card Footer action */}
              <div className="pt-4 mt-2 flex items-center justify-between">
                <button
                  onClick={onNavigateToTrack}
                  className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>Track Application Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-500 font-medium">
                  Ref format: KP-2026-XXXX
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom stats banner */}
      <div className="bg-slate-950/80 border-t border-slate-800 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="text-xl font-extrabold text-amber-400">6 Major</div>
            <div className="text-xs text-slate-400 mt-0.5">{t.quickStatsServices}</div>
          </div>
          <div className="p-2 border-l border-slate-800">
            <div className="text-xl font-extrabold text-emerald-400">10 AM - 5 PM</div>
            <div className="text-xs text-slate-400 mt-0.5">{t.quickStatsHours}</div>
          </div>
          <div className="p-2 border-l border-slate-800">
            <div className="text-xl font-extrabold text-blue-400">Kumbalgodu</div>
            <div className="text-xs text-slate-400 mt-0.5">{t.quickStatsLocation}</div>
          </div>
          <div className="p-2 border-l border-slate-800">
            <div className="text-xl font-extrabold text-slate-200">100% Free</div>
            <div className="text-xs text-slate-400 mt-0.5">Appointment Request System</div>
          </div>
        </div>
      </div>
    </div>
  );
};
