import React, { useState } from 'react';
import { ServiceItem, Language } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ServiceCard } from './ServiceCard.tsx';
import { TRANSLATIONS } from '../data/translations.ts';
import { Search, Filter, ShieldAlert } from 'lucide-react';

interface ServiceGridProps {
  language: Language;
  onSelectService: (service: ServiceItem) => void;
  onRequestAppointment: (service: ServiceItem) => void;
  onOpenEnquiry: (service: ServiceItem) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  language,
  onSelectService,
  onRequestAppointment,
  onOpenEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'ALL', label: t.filterAll },
    { id: 'Civil Registration', label: t.filterCivil },
    { id: 'Revenue & Land', label: t.filterRevenue },
    { id: 'Licenses & NOC', label: t.filterLicensing },
    { id: 'Civic Amenities', label: t.filterCivic },
  ];

  const filteredServices = SERVICES_DATA.filter((svc) => {
    const matchesCategory = selectedCategory === 'ALL' || svc.category === selectedCategory;
    const matchesSearch = 
      svc.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.titleKn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDescEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDescKn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <span>Official Civic Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.servicesHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.servicesSubheading}
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or documents..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Notice for Citizens */}
        <div className="mb-8 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-950 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-blue-800 shrink-0" />
            <span>
              <strong>Statutory Compliance:</strong> All official documentation and eligibility criteria adhere strictly to the Karnataka Panchayat Raj Act and Karnataka Registration of Births and Deaths Rules.
            </span>
          </div>
          <span className="text-[11px] font-bold text-blue-900 hidden sm:inline whitespace-nowrap">
            Zero Hidden Fees
          </span>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              language={language}
              onSelectService={onSelectService}
              onRequestAppointment={onRequestAppointment}
              onOpenEnquiry={onOpenEnquiry}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm font-semibold text-slate-700">No services match your search or filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-blue-900 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
