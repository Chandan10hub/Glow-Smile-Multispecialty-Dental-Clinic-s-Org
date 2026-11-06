import React from 'react';
import { 
  Baby, 
  FileText, 
  Edit3, 
  Building2, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { ServiceItem, Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ServiceCardProps {
  service: ServiceItem;
  language: Language;
  onSelectService: (service: ServiceItem) => void;
  onRequestAppointment: (service: ServiceItem) => void;
  onOpenEnquiry: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  language,
  onSelectService,
  onRequestAppointment,
  onOpenEnquiry
}) => {
  const t = TRANSLATIONS[language];

  // Dynamic icon mapping
  const renderIcon = () => {
    switch (service.iconName) {
      case 'Baby':
        return <Baby className="w-6 h-6 text-blue-900" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-blue-900" />;
      case 'Edit3':
        return <Edit3 className="w-6 h-6 text-blue-900" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-900" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-900" />;
      default:
        return <HelpCircle className="w-6 h-6 text-blue-900" />;
    }
  };

  const title = language === 'en' ? service.titleEn : service.titleKn;
  const desc = language === 'en' ? service.shortDescEn : service.shortDescKn;
  const badge = language === 'en' ? service.badgeEn : service.badgeKn;
  const docs = language === 'en' ? service.requiredDocsEn : service.requiredDocsKn;
  const timeframe = language === 'en' ? service.timeframeEn : service.timeframeKn;
  const counter = language === 'en' ? service.counterEn : service.counterKn;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-900/40">
      
      {/* Top Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white transition duration-300">
            <span className="group-hover:text-white">
              {renderIcon()}
            </span>
          </div>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-right leading-tight max-w-[190px] truncate">
            {badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition mb-2">
          {title}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {desc}
        </p>

        {/* Required Documents Snapshot */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Key Required Documents:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {docs.slice(0, 3).map((doc, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span className="truncate">
                  {doc.name}
                  <span className="text-[10px] text-slate-600 ml-1 font-semibold">({doc.type})</span>
                </span>
              </li>
            ))}
            {docs.length > 3 && (
              <li className="text-[11px] text-blue-800 font-semibold pl-5">
                +{docs.length - 3} more verified requirements
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Card Footer Details & Actions */}
      <div className="bg-slate-50/80 p-5 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeframe}</span>
          </span>
          <span className="font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
            {counter}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelectService(service)}
            className="w-full py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition flex items-center justify-center space-x-1 cursor-pointer"
          >
            <span>{t.viewDetailsBtn}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => onRequestAppointment(service)}
            className="w-full py-2 px-2.5 rounded-lg text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 transition flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.bookAppointmentBtn}</span>
          </button>
        </div>

        <button
          onClick={() => onOpenEnquiry(service)}
          className="w-full text-center text-[11px] font-semibold text-slate-700 hover:text-blue-900 flex items-center justify-center space-x-1 py-1"
        >
          <MessageSquare className="w-3 h-3" />
          <span>Have a question about this service? Submit Enquiry</span>
        </button>
      </div>

    </div>
  );
};
