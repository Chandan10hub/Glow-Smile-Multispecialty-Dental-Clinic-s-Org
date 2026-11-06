import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { FREQUENTLY_ASKED_QUESTIONS } from '../data/servicesData.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ContactSectionProps {
  language: Language;
  onOpenEnquiryModal: () => void;
  onOpenAppointmentModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  onOpenEnquiryModal,
  onOpenAppointmentModal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[language];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-900" />
            <span>Public Civic Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.contactHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.contactSubheading}
          </p>
        </div>

        {/* Contact Cards & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Verified Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-900" />
              </div>
              <div className="text-xs">
                <strong className="block text-sm font-bold text-slate-900 mb-1">
                  {t.officeAddressLabel}
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Gram Panchayat Office Kumbalgodu,<br />
                  Mysore Road, Kumbalgodu Village & Industrial Area,<br />
                  Bengaluru South Taluk, Bengaluru Urban District,<br />
                  Karnataka, India – 560074.
                </p>
                <div className="mt-2 text-[11px] text-blue-900 font-semibold flex items-center space-x-1">
                  <Navigation className="w-3 h-3" />
                  <span>Landmark: Near Mysore Road / Kumbalgodu Junction</span>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="text-xs">
                <strong className="block text-sm font-bold text-slate-900 mb-1">
                  {t.workingHoursLabel}
                </strong>
                <p className="text-slate-700 font-medium">
                  Monday to Saturday: 10:00 AM – 05:00 PM
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Lunch Break: 01:30 PM – 02:15 PM<br />
                  Sunday & Government Gazetted Holidays: Closed
                </p>
                <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200 text-[10px] text-amber-900 font-medium">
                  {t.hoursNotice}
                </div>
              </div>
            </div>

            {/* Telephony and Email */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 block">{t.helplineLabel}</span>
                  <span className="font-bold text-slate-900">080-28437000 (Subject to official confirmation)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-100">
                <Mail className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 block">{t.emailLabel}</span>
                  <span className="font-bold text-slate-900">gp-kumbalgodu-bengaluru@kar.gov.in</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={onOpenAppointmentModal}
                className="py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition shadow-sm text-center cursor-pointer"
              >
                Schedule Visit
              </button>
              <button
                onClick={onOpenEnquiryModal}
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs transition text-center cursor-pointer"
              >
                Submit Grievance
              </button>
            </div>

          </div>

          {/* Right Column: Google Maps & Location View */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col">
              
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="font-bold">Kumbalgodu Gram Panchayat Map Location</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Kumbalgodu,Bengaluru,Karnataka"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-amber-300 hover:underline flex items-center space-x-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Map Representation */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-100">
                <iframe
                  title="Kumbalgodu Gram Panchayat Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15557.51444265434!2d77.44391695!3d12.87222165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f24bf7bfcb7%3A0xe54e209fb30ff610!2sKumbalgodu%2C%20Bengaluru%2C%20Karnataka%20560074!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Coordinates: 12.8722° N, 77.4439° E • Bengaluru South</span>
                <span className="font-medium text-slate-800">Public Transport: BMTC Bus Stop Kumbalgodu</span>
              </div>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions Section */}
        <div className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Clear Citizen Guidance
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-900 transition cursor-pointer"
                  >
                    <span>
                      {language === 'en' ? faq.qEn : faq.qKn}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {language === 'en' ? faq.aEn : faq.aKn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
