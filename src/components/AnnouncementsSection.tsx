import React, { useState } from 'react';
import { 
  BellRing, 
  Calendar, 
  AlertTriangle, 
  Tag, 
  ChevronRight, 
  FileText,
  Users,
  Building
} from 'lucide-react';
import { AnnouncementItem, Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface AnnouncementsSectionProps {
  language: Language;
  announcements: AnnouncementItem[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  language,
  announcements
}) => {
  const [filter, setFilter] = useState<'ALL' | 'Event' | 'Notice' | 'Tax' | 'Alert'>('ALL');
  const t = TRANSLATIONS[language];

  const filtered = announcements.filter(a => filter === 'ALL' || a.category === filter);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Alert':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Event':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Tax':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <section id="announcements" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
              <BellRing className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span>Official Notice Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.announcementsHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.announcementsSubheading}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            {(['ALL', 'Event', 'Notice', 'Tax', 'Alert'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  filter === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Updates' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-6 transition duration-300 border flex flex-col justify-between ${
                item.important
                  ? 'bg-amber-50/50 border-amber-300 shadow-sm ring-1 ring-amber-200'
                  : 'bg-white border-slate-200 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {language === 'en' ? item.titleEn : item.titleKn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'en' ? item.contentEn : item.contentKn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Gram Panchayat Kumbalgodu</span>
                {item.important && (
                  <span className="text-amber-800 font-bold text-[10px] uppercase">
                    Urgent Public Notice
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
