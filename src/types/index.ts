export type Language = 'en' | 'kn';

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleKn: string;
  shortDescEn: string;
  shortDescKn: string;
  category: 'Civil Registration' | 'Revenue & Land' | 'Licenses & NOC' | 'Civic Amenities';
  badgeEn: string;
  badgeKn: string;
  iconName: string;
  eligibilityEn: string[];
  eligibilityKn: string[];
  requiredDocsEn: {
    name: string;
    type: 'Original' | 'Photocopy' | 'Either';
    description: string;
  }[];
  requiredDocsKn: {
    name: string;
    type: 'Original' | 'Photocopy' | 'Either';
    description: string;
  }[];
  guidanceEn: string[];
  guidanceKn: string[];
  officialForms: string[];
  statutoryFeeEn: string;
  statutoryFeeKn: string;
  timeframeEn: string;
  timeframeKn: string;
  counterEn: string;
  counterKn: string;
}

export interface AppointmentRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  reasonForVisit: string;
  additionalInfo?: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  officialRemarks?: string;
  approvedSlot?: string;
  assignedOfficer?: string;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface EnquiryRecord {
  id: string;
  referenceNumber: string;
  citizenName: string;
  mobileNumber: string;
  email?: string;
  category: string;
  subject: string;
  description: string;
  status: 'RECEIVED' | 'IN_REVIEW' | 'RESOLVED' | 'CLOSED';
  officialResponse?: string;
  respondedBy?: string;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface AnnouncementItem {
  id: string;
  titleEn: string;
  titleKn: string;
  date: string;
  category: 'Notice' | 'Event' | 'Alert' | 'Tax';
  contentEn: string;
  contentKn: string;
  important?: boolean;
}

export interface OfficeConfigState {
  officeNameEn: string;
  officeNameKn: string;
  taluk: string;
  district: string;
  pincode: string;
  workingHours: string;
  lunchBreak: string;
  workingDays: string;
  officialHelpline: string;
  officialEmail: string;
  specialNoticeEn: string;
  specialNoticeKn: string;
  announcements: AnnouncementItem[];
}
