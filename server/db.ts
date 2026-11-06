import fs from 'fs';
import path from 'path';

export interface Appointment {
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

export interface Enquiry {
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

export interface Announcement {
  id: string;
  titleEn: string;
  titleKn: string;
  date: string;
  category: 'Notice' | 'Event' | 'Alert' | 'Tax';
  contentEn: string;
  contentKn: string;
  important?: boolean;
}

export interface OfficeConfig {
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
  announcements: Announcement[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portal_data.json');

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titleEn: 'Quarterly Gram Sabha Meeting on Nov 25, 2026',
    titleKn: 'ನವೆಂಬರ್ 25, 2026 ರಂದು ತ್ರೈಮಾಸಿಕ ಗ್ರಾಮ ಸಭೆ',
    date: '2026-11-04',
    category: 'Event',
    contentEn: 'All residents of Kumbalgodu Gram Panchayat jurisdiction are invited to attend the Gram Sabha at the Community Hall at 11:00 AM to discuss civic works and budget allocations.',
    contentKn: 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯ ಎಲ್ಲಾ ನಿವಾಸಿಗಳಿಗೆ ಸಮುದಾಯ ಭವನದಲ್ಲಿ ಬೆಳಿಗ್ಗೆ 11:00 ಗಂಟೆಗೆ ನಡೆಯುವ ಗ್ರಾಮ ಸಭೆಯಲ್ಲಿ ಭಾಗವಹಿಸಲು ಆಹ್ವಾನಿಸಲಾಗಿದೆ.',
    important: true
  },
  {
    id: 'ann-2',
    titleEn: 'Property Tax (Form 9 & 11) Early Rebate Available',
    titleKn: 'ಆಸ್ತಿ ತೆರಿಗೆ (ನಮೂನೆ 9 ಮತ್ತು 11) ಮುಂಚಿತ ಪಾವತಿ ರಿಯಾಯಿತಿ',
    date: '2026-11-01',
    category: 'Tax',
    contentEn: 'Property owners paying Gram Panchayat property tax for the current assessment cycle can avail assistance at the office counter on weekdays.',
    contentKn: 'ಹಾಲಿ ಮೌಲ್ಯಮಾಪನ ಚಕ್ರದ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿದಾರರು ಪಂಚಾಯಿತಿ ಕಚೇರಿಯಲ್ಲಿ ಕೌಂಟರ್ ನೆರವು ಪಡೆಯಬಹುದು.',
    important: false
  },
  {
    id: 'ann-3',
    titleEn: 'Door-to-Door Waste Segregation Awareness Drive',
    titleKn: 'ಮನೆ-ಮನೆ ತ್ಯಾಜ್ಯ ವಿಂಗಡಣೆ ಜಾಗೃತಿ ಅಭಿಯಾನ',
    date: '2026-10-28',
    category: 'Notice',
    contentEn: 'Segregation of wet, dry, and sanitary waste is compulsory for all residential layouts in Kumbalgodu.',
    contentKn: 'ಕುಂಬಳಗೋಡಿನ ಎಲ್ಲಾ ಬಡಾವಣೆಗಳಲ್ಲಿ ಹಸಿ ಮತ್ತು ಒಣ ತ್ಯಾಜ್ಯ ಪ್ರತ್ಯೇಕಿಸುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ.',
    important: false
  }
];

const INITIAL_OFFICE_CONFIG: OfficeConfig = {
  officeNameEn: 'Gram Panchayat Office Kumbalgodu',
  officeNameKn: 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಾರ್ಯಾಲಯ',
  taluk: 'Bengaluru South Taluk',
  district: 'Bengaluru Urban, Karnataka',
  pincode: '560074',
  workingHours: '10:00 AM – 05:00 PM (Monday to Saturday)',
  lunchBreak: '01:30 PM – 02:15 PM',
  workingDays: 'Monday to Saturday (Sundays & General Public Holidays Closed)',
  officialHelpline: '080-28437000 (Subject to official confirmation)',
  officialEmail: 'gp-kumbalgodu-bengaluru@kar.gov.in',
  specialNoticeEn: 'Notice: Appointment bookings are subject to physical verification of original documents and administrative approval at the Panchayat counter.',
  specialNoticeKn: 'ಸೂಚನೆ: ಭೇಟಿ ವಿನಂತಿಗಳು ಮೂಲ ದಾಖಲೆಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ಪಂಚಾಯಿತಿ ಆಡಳಿತಾತ್ಮಕ ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ.',
  announcements: INITIAL_ANNOUNCEMENTS
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-demo-1',
    referenceNumber: 'KP-2026-1042',
    fullName: 'Ramesh Kumar H.',
    mobileNumber: '9845012345',
    email: 'ramesh.kumar@example.com',
    serviceId: 'birth-cert',
    serviceName: 'Birth Certificate Assistance',
    preferredDate: '2026-11-12',
    preferredTime: '11:00 AM',
    reasonForVisit: 'Require certified copy of birth certificate registered in 2021.',
    additionalInfo: 'Hospital discharge slip and Parents Aadhaar cards available.',
    status: 'APPROVED',
    officialRemarks: 'Approved for Counter 2. Please bring original Hospital Birth Intimation and Parents Aadhaar.',
    approvedSlot: '2026-11-12 at 11:15 AM',
    assignedOfficer: 'Sri. M. Suresh (SDA)',
    createdAt: '2026-11-04T10:15:00.000Z',
    updatedAt: '2026-11-05T09:30:00.000Z',
    isDemo: true
  },
  {
    id: 'appt-demo-2',
    referenceNumber: 'KP-2026-1043',
    fullName: 'Lakshmi Devi B.N.',
    mobileNumber: '9448123456',
    email: 'lakshmi.bn@example.com',
    serviceId: 'local-admin',
    serviceName: 'Local Administrative Services',
    preferredDate: '2026-11-14',
    preferredTime: '02:30 PM',
    reasonForVisit: 'Guidance on E-Swathu Form 9 & 11A application for property transfer.',
    additionalInfo: 'Registered sale deed and tax receipt of previous owner attached.',
    status: 'PENDING_REVIEW',
    officialRemarks: 'Application queued for scrutiny by Village Accountant.',
    assignedOfficer: 'Revenue Inspector Desk',
    createdAt: '2026-11-05T14:20:00.000Z',
    updatedAt: '2026-11-05T14:20:00.000Z',
    isDemo: true
  },
  {
    id: 'appt-demo-3',
    referenceNumber: 'KP-2026-1044',
    fullName: 'Venkatesh Rao M.',
    mobileNumber: '9900234567',
    serviceId: 'death-cert',
    serviceName: 'Death Certificate Assistance',
    preferredDate: '2026-11-10',
    preferredTime: '10:30 AM',
    reasonForVisit: 'Submission of Form 2 for family member who passed away in village home.',
    status: 'COMPLETED',
    officialRemarks: 'Certificate processed and dispatched via registered post.',
    approvedSlot: '2026-11-10 at 10:30 AM',
    assignedOfficer: 'Registrar of Births & Deaths Desk',
    createdAt: '2026-10-30T11:00:00.000Z',
    updatedAt: '2026-11-02T16:00:00.000Z',
    isDemo: true
  }
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-demo-1',
    referenceNumber: 'ENQ-2026-8819',
    citizenName: 'Deepak Gowda',
    mobileNumber: '9731234567',
    email: 'deepak.gowda@example.com',
    category: 'Sanitation & Drainage',
    subject: 'Drainage blockage near 4th Cross, Kumbalgodu Village',
    description: 'Rainwater drain is choked with silt and needs clearance before monsoon showers.',
    status: 'IN_REVIEW',
    officialResponse: 'Panchayat sanitation supervisor inspected the site. Clearance scheduled for Nov 08, 2026.',
    respondedBy: 'Health & Sanitation Committee',
    createdAt: '2026-11-03T09:00:00.000Z',
    updatedAt: '2026-11-04T12:00:00.000Z',
    isDemo: true
  },
  {
    id: 'enq-demo-2',
    referenceNumber: 'ENQ-2026-8820',
    citizenName: 'Sunitha Manjunath',
    mobileNumber: '9880345678',
    category: 'Certificate Corrections',
    subject: 'Spelling correction in father name on birth certificate',
    description: 'Father name is spelled "Suresh" instead of "Suresha" in the 2018 record.',
    status: 'RESOLVED',
    officialResponse: 'Please visit Counter 3 with school marks card and notarized affidavit for name correction under Rule 11.',
    respondedBy: 'Sub-Registrar of Births & Deaths',
    createdAt: '2026-11-01T15:30:00.000Z',
    updatedAt: '2026-11-03T11:15:00.000Z',
    isDemo: true
  }
];

interface DatabaseData {
  appointments: Appointment[];
  enquiries: Enquiry[];
  officeConfig: OfficeConfig;
}

class Store {
  private data: DatabaseData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Error reading storage file, falling back to initial data:', e);
    }

    const initial: DatabaseData = {
      appointments: INITIAL_APPOINTMENTS,
      enquiries: INITIAL_ENQUIRIES,
      officeConfig: INITIAL_OFFICE_CONFIG
    };
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseData) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to write storage file:', e);
    }
  }

  // Appointments
  getAppointments(): Appointment[] {
    return this.data.appointments;
  }

  getAppointmentByRef(ref: string, mobile?: string): Appointment | undefined {
    const cleanRef = ref.trim().toUpperCase();
    return this.data.appointments.find(a => 
      a.referenceNumber.toUpperCase() === cleanRef || 
      (mobile && a.mobileNumber.replace(/\D/g, '').endsWith(mobile.slice(-10)))
    );
  }

  createAppointment(appt: Omit<Appointment, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>): Appointment {
    const seq = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const referenceNumber = `KP-${year}-${seq}`;
    const newRecord: Appointment = {
      ...appt,
      id: `appt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      referenceNumber,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemo: false
    };

    this.data.appointments.unshift(newRecord);
    this.saveData(this.data);
    return newRecord;
  }

  updateAppointment(id: string, updates: Partial<Appointment>): Appointment | null {
    const idx = this.data.appointments.findIndex(a => a.id === id || a.referenceNumber === id);
    if (idx === -1) return null;

    this.data.appointments[idx] = {
      ...this.data.appointments[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData(this.data);
    return this.data.appointments[idx];
  }

  // Enquiries
  getEnquiries(): Enquiry[] {
    return this.data.enquiries;
  }

  getEnquiryByRef(ref: string): Enquiry | undefined {
    const cleanRef = ref.trim().toUpperCase();
    return this.data.enquiries.find(e => e.referenceNumber.toUpperCase() === cleanRef);
  }

  createEnquiry(enq: Omit<Enquiry, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>): Enquiry {
    const seq = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const referenceNumber = `ENQ-${year}-${seq}`;
    const newRecord: Enquiry = {
      ...enq,
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      referenceNumber,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemo: false
    };

    this.data.enquiries.unshift(newRecord);
    this.saveData(this.data);
    return newRecord;
  }

  updateEnquiry(id: string, updates: Partial<Enquiry>): Enquiry | null {
    const idx = this.data.enquiries.findIndex(e => e.id === id || e.referenceNumber === id);
    if (idx === -1) return null;

    this.data.enquiries[idx] = {
      ...this.data.enquiries[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData(this.data);
    return this.data.enquiries[idx];
  }

  // Office Config
  getOfficeConfig(): OfficeConfig {
    return this.data.officeConfig;
  }

  updateOfficeConfig(updates: Partial<OfficeConfig>): OfficeConfig {
    this.data.officeConfig = {
      ...this.data.officeConfig,
      ...updates
    };
    this.saveData(this.data);
    return this.data.officeConfig;
  }
}

export const dbStore = new Store();
