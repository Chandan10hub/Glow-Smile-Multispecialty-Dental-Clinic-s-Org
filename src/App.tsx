/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ServiceItem, AnnouncementItem, AppointmentRecord } from './types/index.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ServiceGrid } from './components/ServiceGrid.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { AppointmentModal } from './components/AppointmentModal.tsx';
import { TrackingSection } from './components/TrackingSection.tsx';
import { CitizenEnquiryModal } from './components/CitizenEnquiryModal.tsx';
import { DocumentChecklistSection } from './components/DocumentChecklistSection.tsx';
import { DownloadFormsSection } from './components/DownloadFormsSection.tsx';
import { AnnouncementsSection } from './components/AnnouncementsSection.tsx';
import { AboutUsSection } from './components/AboutUsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [fontScale, setFontScale] = useState<number>(1.0);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals & Context States
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentService, setAppointmentService] = useState<ServiceItem | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryService, setEnquiryService] = useState<ServiceItem | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // Admin Session State
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('kumbalgodu_admin_token') || null;
  });
  const [adminUser, setAdminUser] = useState<any | null>(() => {
    const saved = localStorage.getItem('kumbalgodu_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Tracking query state
  const [trackingInitialQuery, setTrackingInitialQuery] = useState('');

  // Office Config & Announcements from backend
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [officeNotice, setOfficeNotice] = useState<string>('');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/office-config');
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data.announcements || []);
          setOfficeNotice(language === 'en' ? data.specialNoticeEn : data.specialNoticeKn);
        }
      } catch (err) {
        console.warn('Could not load office config from server:', err);
      }
    };
    fetchConfig();
  }, [language]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenAppointmentForService = (service: ServiceItem) => {
    setAppointmentService(service);
    setIsAppointmentModalOpen(true);
  };

  const handleOpenEnquiryForService = (service: ServiceItem) => {
    setEnquiryService(service);
    setIsEnquiryModalOpen(true);
  };

  const handleAppointmentCreated = (appointment: AppointmentRecord) => {
    showToast(`Appointment Request ${appointment.referenceNumber} submitted successfully!`);
  };

  const handleNavigateToTrack = (referenceNumber: string) => {
    setTrackingInitialQuery(referenceNumber);
    handleNavigate('track');
  };

  const handleAdminLoginSuccess = (token: string, user: any) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('kumbalgodu_admin_token', token);
    localStorage.setItem('kumbalgodu_admin_user', JSON.stringify(user));
    showToast(`Welcome, ${user.name}`);
  };

  const handleAdminLogout = () => {
    if (adminToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      }).catch(() => {});
    }
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('kumbalgodu_admin_token');
    localStorage.removeItem('kumbalgodu_admin_user');
    showToast('Logged out of officer dashboard.');
  };

  return (
    <div 
      style={{ fontSize: `${fontScale}rem` }} 
      className="min-h-screen flex flex-col bg-slate-50 text-slate-800 transition-all duration-200"
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 text-xs animate-bounce border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ADMIN CONSOLE VIEW (when officer is logged in) */}
      {adminToken && adminUser ? (
        <AdminDashboard
          token={adminToken}
          adminUser={adminUser}
          onLogout={handleAdminLogout}
          language={language}
        />
      ) : (
        /* PUBLIC CITIZEN PORTAL VIEW */
        <>
          <Header
            language={language}
            onLanguageChange={setLanguage}
            fontScale={fontScale}
            onFontScaleChange={setFontScale}
            onOpenAppointmentModal={() => {
              setAppointmentService(null);
              setIsAppointmentModalOpen(true);
            }}
            onOpenAdminModal={() => setIsAdminModalOpen(true)}
            onOpenEnquiryModal={() => {
              setEnquiryService(null);
              setIsEnquiryModalOpen(true);
            }}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />

          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero
              language={language}
              onOpenAppointmentModal={() => {
                setAppointmentService(null);
                setIsAppointmentModalOpen(true);
              }}
              onNavigateToServices={() => handleNavigate('services')}
              onNavigateToTrack={() => handleNavigate('track')}
              announcements={announcements}
            />

            {/* 2. Services Grid */}
            <ServiceGrid
              language={language}
              onSelectService={(svc) => setSelectedDetailService(svc)}
              onRequestAppointment={handleOpenAppointmentForService}
              onOpenEnquiry={handleOpenEnquiryForService}
            />

            {/* 3. Application & Appointment Tracking Section */}
            <TrackingSection
              language={language}
              initialQuery={trackingInitialQuery}
            />

            {/* 4. Document Guidance Section */}
            <DocumentChecklistSection
              language={language}
              onSelectService={(svc) => setSelectedDetailService(svc)}
              onRequestAppointment={handleOpenAppointmentForService}
            />

            {/* 5. Downloadable Official Forms Section */}
            <DownloadFormsSection
              language={language}
            />

            {/* 6. Announcements & Notice Board */}
            <AnnouncementsSection
              language={language}
              announcements={announcements}
            />

            {/* 7. About Us Section */}
            <AboutUsSection
              language={language}
            />

            {/* 8. Contact & Map Section */}
            <ContactSection
              language={language}
              onOpenEnquiryModal={() => {
                setEnquiryService(null);
                setIsEnquiryModalOpen(true);
              }}
              onOpenAppointmentModal={() => {
                setAppointmentService(null);
                setIsAppointmentModalOpen(true);
              }}
            />
          </main>

          <Footer
            language={language}
            onLanguageChange={setLanguage}
            onOpenAdminModal={() => setIsAdminModalOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* Service Detail Modal */}
          <ServiceDetailModal
            service={selectedDetailService}
            language={language}
            onClose={() => setSelectedDetailService(null)}
            onBookAppointment={handleOpenAppointmentForService}
            onOpenEnquiry={handleOpenEnquiryForService}
          />

          {/* Appointment Request Modal */}
          <AppointmentModal
            isOpen={isAppointmentModalOpen}
            onClose={() => setIsAppointmentModalOpen(false)}
            preselectedService={appointmentService}
            language={language}
            onAppointmentCreated={handleAppointmentCreated}
            onNavigateToTrack={handleNavigateToTrack}
          />

          {/* Citizen Enquiry Modal */}
          <CitizenEnquiryModal
            isOpen={isEnquiryModalOpen}
            onClose={() => setIsEnquiryModalOpen(false)}
            service={enquiryService}
            language={language}
            onEnquirySubmitted={(enq) => {
              showToast(`Enquiry ${enq.referenceNumber} submitted!`);
            }}
          />

          {/* Officer Login Modal */}
          <AdminModal
            isOpen={isAdminModalOpen}
            onClose={() => setIsAdminModalOpen(false)}
            onLoginSuccess={handleAdminLoginSuccess}
            language={language}
          />
        </>
      )}
    </div>
  );
}
