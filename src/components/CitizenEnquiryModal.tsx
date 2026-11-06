import React, { useState, useEffect } from 'react';
import { 
  X, 
  HelpCircle, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  AlertCircle,
  Building2,
  Tag
} from 'lucide-react';
import { ServiceItem, Language, EnquiryRecord } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface CitizenEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceItem | null;
  language: Language;
  onEnquirySubmitted?: (enquiry: EnquiryRecord) => void;
}

export const CitizenEnquiryModal: React.FC<CitizenEnquiryModalProps> = ({
  isOpen,
  onClose,
  service,
  language,
  onEnquirySubmitted
}) => {
  const t = TRANSLATIONS[language];

  const [citizenName, setCitizenName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Civic Enquiry');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdEnquiry, setCreatedEnquiry] = useState<EnquiryRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (service) {
      setCategory(service.category);
      setSubject(`Inquiry regarding ${service.titleEn}`);
    } else {
      setCategory('General Civic Enquiry');
      setSubject('');
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const categories = [
    'General Civic Enquiry',
    'Civil Registration (Birth & Death)',
    'Revenue & Land (E-Swathu)',
    'Licenses & NOC',
    'Drinking Water Supply',
    'Sanitation & Drainage',
    'Streetlights Maintenance',
    'Panchayat Property Tax'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!citizenName.trim() || citizenName.trim().length < 3) {
      setError('Please enter your full name (minimum 3 characters).');
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!subject.trim() || !description.trim() || description.trim().length < 10) {
      setError('Please provide a subject and detailed description of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenName: citizenName.trim(),
          mobileNumber: cleanMobile,
          email: email.trim() || undefined,
          category,
          subject: subject.trim(),
          description: description.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setCreatedEnquiry(data.enquiry);
      if (onEnquirySubmitted) {
        onEnquirySubmitted(data.enquiry);
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (createdEnquiry) {
      navigator.clipboard.writeText(createdEnquiry.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setCitizenName('');
    setMobileNumber('');
    setEmail('');
    setDescription('');
    setSubject('');
    setCreatedEnquiry(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-400/30">
              Direct Citizen Helpdesk
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              {t.enquiryHeading}
            </h3>
            <p className="text-xs text-slate-300">
              {t.enquirySubheading}
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {createdEnquiry ? (
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  Enquiry Successfully Registered
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your enquiry has been dispatched to the designated Panchayat desk for scrutiny and response.
                </p>
              </div>

              <div className="bg-slate-50 border-2 border-dashed border-blue-900/30 rounded-xl p-4 text-left space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">Enquiry Tracking ID</span>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xl font-black text-blue-950 font-mono">
                  {createdEnquiry.referenceNumber}
                </div>
                <p className="text-[11px] text-slate-600">
                  Keep this tracking code to check status on the home portal under &quot;Track Application&quot;.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2 bg-blue-900 text-white font-bold text-xs rounded-lg hover:bg-blue-800 transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Citizen Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Subject / Short Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Streetlight repair on Cross 3, Kumbalgodu Village"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Detailed Description & Landmark <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue or enquiry in detail, including specific street name or door number..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Civic Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
