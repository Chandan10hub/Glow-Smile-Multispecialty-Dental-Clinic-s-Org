import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Printer, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { ServiceItem, Language, AppointmentRecord } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  language: Language;
  onAppointmentCreated?: (appointment: AppointmentRecord) => void;
  onNavigateToTrack?: (referenceNumber: string) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  language,
  onAppointmentCreated,
  onNavigateToTrack
}) => {
  const t = TRANSLATIONS[language];

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdAppointment, setCreatedAppointment] = useState<AppointmentRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync preselected service
  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceId(preselectedService.id);
    } else if (SERVICES_DATA.length > 0 && !selectedServiceId) {
      setSelectedServiceId(SERVICES_DATA[0].id);
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  // Date constraints: from tomorrow up to 30 days, no Sundays
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    '10:30 AM – 11:15 AM',
    '11:15 AM – 12:00 PM',
    '12:00 PM – 12:45 PM',
    '02:30 PM – 03:15 PM',
    '03:15 PM – 04:00 PM',
    '04:00 PM – 04:45 PM'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!selectedServiceId) {
      newErrors.service = 'Please select a service.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    } else {
      const chosen = new Date(preferredDate);
      if (chosen.getDay() === 0) {
        newErrors.preferredDate = 'The Panchayat office is closed on Sundays. Please choose Monday through Saturday.';
      }
    }

    if (!preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time slot.';
    }

    if (!reasonForVisit.trim() || reasonForVisit.trim().length < 5) {
      newErrors.reasonForVisit = 'Please provide the reason for your visit (min 5 characters).';
    }

    if (!consentChecked) {
      newErrors.consent = 'You must acknowledge that this request is subject to administrative approval.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const serviceObj = SERVICES_DATA.find(s => s.id === selectedServiceId);
    const serviceName = serviceObj ? serviceObj.titleEn : 'General Civic Service';

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: mobileNumber.replace(/\D/g, ''),
          email: email.trim() || undefined,
          serviceId: selectedServiceId,
          serviceName,
          preferredDate,
          preferredTime,
          reasonForVisit: reasonForVisit.trim(),
          additionalInfo: additionalInfo.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit appointment request.');
      }

      setCreatedAppointment(data.appointment);
      if (onAppointmentCreated) {
        onAppointmentCreated(data.appointment);
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Error communicating with server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (createdAppointment) {
      navigator.clipboard.writeText(createdAppointment.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetAndClose = () => {
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setReasonForVisit('');
    setAdditionalInfo('');
    setConsentChecked(false);
    setErrors({});
    setCreatedAppointment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                Official Booking Facilitation
              </span>
              <span className="text-xs text-slate-300">
                Gram Panchayat Kumbalgodu
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              {t.appointmentHeading}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.appointmentSubheading}
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto">
          
          {/* SUCCESS SCREEN */}
          {createdAppointment ? (
            <div className="space-y-6 text-center py-2 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-2">
                  Request Status: Pending Administrative Review
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Appointment Request Successfully Registered
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Your request has been logged in the Kumbalgodu Panchayat portal. An authorized officer will review your request and verify counter availability.
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-slate-50 border-2 border-dashed border-blue-900/30 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">Unique Reference Number</span>
                  <button
                    onClick={handleCopyRef}
                    className="flex items-center space-x-1 text-xs font-bold text-blue-900 hover:text-blue-700 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="text-2xl font-black text-blue-950 font-mono tracking-wider">
                  {createdAppointment.referenceNumber}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Applicant Name</span>
                    <strong className="text-slate-900">{createdAppointment.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Mobile Number</span>
                    <strong className="text-slate-900">+91 {createdAppointment.mobileNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Service Requested</span>
                    <strong className="text-slate-900">{createdAppointment.serviceName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Requested Date & Slot</span>
                    <strong className="text-slate-900">{createdAppointment.preferredDate} ({createdAppointment.preferredTime})</strong>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                  <strong>Important:</strong> This is an initial request acknowledgment slip. Please wait for official approval status on this portal before visiting the office.
                </div>
              </div>

              {/* Action Buttons on Confirmation */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Acknowledgment Slip</span>
                </button>

                {onNavigateToTrack && (
                  <button
                    onClick={() => {
                      const ref = createdAppointment.referenceNumber;
                      handleResetAndClose();
                      onNavigateToTrack(ref);
                    }}
                    className="flex items-center space-x-2 px-5 py-2 text-xs font-bold rounded-lg bg-blue-900 hover:bg-blue-800 text-white shadow-sm transition"
                  >
                    <span>Track Status Now</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* APPOINTMENT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Mandatory Notice Banner */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Important Rule:</strong> An appointment request is not an officially confirmed appointment. Confirmation is issued only after the Panchayat administrator reviews schedule capacity and document eligibility.
                </p>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formFullName} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.formFullNamePlaceholder}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                        errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-600 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formMobile} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder={t.formMobilePlaceholder}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                        errors.mobileNumber ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && <p className="text-red-600 text-[11px] mt-1">{errors.mobileNumber}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formEmail}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.formEmailPlaceholder}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-[11px] mt-1">{errors.email}</p>}
                </div>

                {/* Service Required */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formServiceRequired} <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">{t.formSelectService}</option>
                    {SERVICES_DATA.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {language === 'en' ? svc.titleEn : svc.titleKn} ({svc.category})
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-600 text-[11px] mt-1">{errors.service}</p>}
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formPreferredDate} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      min={minDateStr}
                      max={maxDateStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                        errors.preferredDate ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Mon–Sat only. Sunday closed.</span>
                  {errors.preferredDate && <p className="text-red-600 text-[11px] mt-1">{errors.preferredDate}</p>}
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formPreferredTime} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                        errors.preferredTime ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                      }`}
                    >
                      <option value="">{t.formSelectTime}</option>
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Subject to counter availability.</span>
                  {errors.preferredTime && <p className="text-red-600 text-[11px] mt-1">{errors.preferredTime}</p>}
                </div>

                {/* Reason for Visit */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formReason} <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                    placeholder={t.formReasonPlaceholder}
                    className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                      errors.reasonForVisit ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {errors.reasonForVisit && <p className="text-red-600 text-[11px] mt-1">{errors.reasonForVisit}</p>}
                </div>

                {/* Additional Information */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-800 mb-1">
                    {t.formAdditionalInfo}
                  </label>
                  <input
                    type="text"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="e.g., Hospital discharge slip number, Tax receipt 2024-25, etc."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 rounded text-blue-900 focus:ring-blue-900"
                  />
                  <span>
                    {t.formConsent}
                  </span>
                </label>
                {errors.consent && <p className="text-red-600 text-[11px] mt-1">{errors.consent}</p>}
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 disabled:bg-blue-300 rounded-lg shadow-sm transition flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? t.submittingBtn : t.submitRequestBtn}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
