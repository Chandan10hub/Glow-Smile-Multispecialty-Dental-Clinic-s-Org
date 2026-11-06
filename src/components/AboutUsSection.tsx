import React from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Award, 
  Scale, 
  Vote, 
  Trees, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface AboutUsSectionProps {
  language: Language;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  language
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <Scale className="w-3.5 h-3.5 text-blue-900" />
            <span>Constitutional Local Self-Government</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.aboutHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.aboutSubheading}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              {language === 'en' ? (
                <>
                  <strong>Gram Panchayat Kumbalgodu</strong> operates as the premier grassroots rural local self-governing body for Kumbalgodu and its adjoining habitations within Bengaluru South Taluk. Established under the framework of the historic <strong>73rd Constitutional Amendment</strong> and governed by the <strong>Karnataka Gram Swaraj and Panchayat Raj Act, 1993</strong>, the office serves as the bridge between citizens and state governance.
                </>
              ) : (
                <>
                  <strong>ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ</strong>ಯು ಬೆಂಗಳೂರು ದಕ್ಷಿಣ ತಾಲೂಕಿನ ಕುಂಬಳಗೋಡು ಮತ್ತು ಸುತ್ತಮುತ್ತಲಿನ ಹಳ್ಳಿಗಳ ಪ್ರಮುಖ ತಳಮಟ್ಟದ ಸ್ಥಳೀಯ ಸ್ವಯಂ ಆಡಳಿತ ಸಂಸ್ಥೆಯಾಗಿದೆ. ಐತಿಹಾಸಿಕ <strong>73ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿ</strong> ಮತ್ತು <strong>ಕರ್ನಾಟಕ ಗ್ರಾಮ ಸ್ವರಾಜ್ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಅಧಿನಿಯಮ 1993</strong> ರ ಅಡಿಯಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದ ಈ ಕಚೇರಿಯು ನಾಗರಿಕರು ಮತ್ತು ಸರ್ಕಾರದ ನಡುವಿನ ಮುಖ್ಯ ಕೊಂಡಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.
                </>
              )}
            </p>

            <p>
              {language === 'en' ? (
                <>
                  Kumbalgodu occupies a unique geographical position as an evolving peri-urban hub along the bustling Bengaluru-Mysuru corridor. The Panchayat manages civic sanitation, drinking water infrastructure, streetlighting networks, civil registrations, and property tax records through the state government&apos;s digital <strong>E-Swathu</strong> and <strong>e-JanMa</strong> platforms.
                </>
              ) : (
                <>
                  ಬೆಂಗಳೂರು-ಮೈಸೂರು ಕಾರಿಡಾರ್‌ನಲ್ಲಿ ತ್ವರಿತವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಅರೆ-ನಗರ ಕೇಂದ್ರವಾಗಿರುವ ಕುಂಬಳಗೋಡು ಪಂಚಾಯಿತಿಯು ಸ್ವಚ್ಛತೆ, ಕುಡಿಯುವ ನೀರು, ಬೀದಿದೀಪಗಳ ಜಾಲ, ಜನನ-ಮರಣ ನೋಂದಣಿ ಮತ್ತು ಸರ್ಕಾರದ ಅಧಿಕೃತ <strong>ಈ-ಸ್ವತ್ತು</strong> ತಂತ್ರಾಂಶದ ಮೂಲಕ ಆಸ್ತಿ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.
                </>
              )}
            </p>

            {/* Core Responsibilities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Piped Drinking Water Supply & Testing</span>
              </div>
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Solid Waste Management & Segregation</span>
              </div>
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Statutory Birth & Death Registrations</span>
              </div>
              <div className="flex items-start space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>E-Swathu Form 9 & 11A Certification</span>
              </div>
            </div>
          </div>

          {/* Right Column: Governance Architecture Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <Vote className="w-5 h-5 text-blue-900" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Administrative Hierarchy
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-amber-700 font-bold uppercase block">Democratically Elected Wing</span>
                  <div className="font-bold text-slate-900 text-sm">Adhyaksha & Upadhyaksha</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Elected ward members representing Kumbalgodu citizens and guiding civic development resolutions.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase block">Executive Administration</span>
                  <div className="font-bold text-slate-900 text-sm">Panchayat Development Officer (PDO)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Chief executive officer appointed by RDPR Karnataka responsible for statutory sanctions and administration.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">Direct Citizen Sovereign Body</span>
                  <div className="font-bold text-slate-900 text-sm">The Gram Sabha</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Open general assembly of all registered voters to inspect accounts, approve schemes, and review projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
