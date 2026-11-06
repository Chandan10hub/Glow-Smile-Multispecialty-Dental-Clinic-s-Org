import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { dbStore, Appointment, Enquiry } from './server/db.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Simple secure session token store for admin
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kumbalgodu.kar.gov.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';
const activeTokens = new Set<string>();

// Pre-seed a known demo token
activeTokens.add('demo-admin-session-token-kumbalgodu');

const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin token required' });
  }
  const token = authHeader.substring(7).trim();
  if (!activeTokens.has(token)) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }
  next();
};

// ----------------------------------------------------
// Public APIs
// ----------------------------------------------------

// 1. Get Office Configuration & Announcements
app.get('/api/office-config', (_req: Request, res: Response) => {
  const config = dbStore.getOfficeConfig();
  res.json(config);
});

// 2. Submit Appointment Request
app.post('/api/appointments', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      serviceId,
      serviceName,
      preferredDate,
      preferredTime,
      reasonForVisit,
      additionalInfo
    } = req.body;

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 3) {
      return res.status(400).json({ error: 'Full name must be at least 3 characters long.' });
    }

    const cleanMobile = (mobileNumber || '').toString().replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
    }

    if (!serviceId || !serviceName) {
      return res.status(400).json({ error: 'Please select a valid service.' });
    }

    if (!preferredDate) {
      return res.status(400).json({ error: 'Preferred date is required.' });
    }

    const selectedDate = new Date(preferredDate);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }

    // Date check: No Sunday visits
    if (selectedDate.getDay() === 0) {
      return res.status(400).json({ error: 'Gram Panchayat Office is closed on Sundays. Please choose Monday to Saturday.' });
    }

    if (!preferredTime) {
      return res.status(400).json({ error: 'Preferred time slot is required.' });
    }

    if (!reasonForVisit || reasonForVisit.trim().length < 5) {
      return res.status(400).json({ error: 'Please describe the reason for your visit (min 5 characters).' });
    }

    const newAppointment = dbStore.createAppointment({
      fullName: fullName.trim(),
      mobileNumber: cleanMobile,
      email: email ? email.trim() : undefined,
      serviceId,
      serviceName,
      preferredDate,
      preferredTime,
      reasonForVisit: reasonForVisit.trim(),
      additionalInfo: additionalInfo ? additionalInfo.trim() : undefined
    });

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully. Please note reference number.',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error submitting appointment:', error);
    res.status(500).json({ error: 'Internal server error while processing appointment.' });
  }
});

// 3. Track Appointment
app.get('/api/appointments/track/:referenceNumber', (req: Request, res: Response) => {
  const { referenceNumber } = req.params;
  const mobile = req.query.mobile as string | undefined;

  const appt = dbStore.getAppointmentByRef(referenceNumber, mobile);
  if (!appt) {
    return res.status(404).json({ error: 'No appointment found matching this reference number or mobile.' });
  }

  // Return masked/sanitized view for privacy
  res.json({
    referenceNumber: appt.referenceNumber,
    fullName: appt.fullName,
    serviceName: appt.serviceName,
    preferredDate: appt.preferredDate,
    preferredTime: appt.preferredTime,
    status: appt.status,
    officialRemarks: appt.officialRemarks || 'Pending initial administrative scrutiny.',
    approvedSlot: appt.approvedSlot,
    assignedOfficer: appt.assignedOfficer,
    createdAt: appt.createdAt,
    updatedAt: appt.updatedAt,
    isDemo: appt.isDemo
  });
});

// 4. Submit Citizen Enquiry / Grievance
app.post('/api/enquiries', (req: Request, res: Response) => {
  try {
    const {
      citizenName,
      mobileNumber,
      email,
      category,
      subject,
      description
    } = req.body;

    if (!citizenName || citizenName.trim().length < 3) {
      return res.status(400).json({ error: 'Citizen name must be at least 3 characters long.' });
    }

    const cleanMobile = (mobileNumber || '').toString().replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit Indian mobile number.' });
    }

    if (!category || !subject || !description) {
      return res.status(400).json({ error: 'Please provide category, subject, and description.' });
    }

    const newEnquiry = dbStore.createEnquiry({
      citizenName: citizenName.trim(),
      mobileNumber: cleanMobile,
      email: email ? email.trim() : undefined,
      category: category.trim(),
      subject: subject.trim(),
      description: description.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. Please keep your enquiry reference ID.',
      enquiry: newEnquiry
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Internal server error while processing enquiry.' });
  }
});

// 5. Track Citizen Enquiry
app.get('/api/enquiries/track/:referenceNumber', (req: Request, res: Response) => {
  const { referenceNumber } = req.params;
  const enq = dbStore.getEnquiryByRef(referenceNumber);
  if (!enq) {
    return res.status(404).json({ error: 'No enquiry found with this reference number.' });
  }

  res.json({
    referenceNumber: enq.referenceNumber,
    citizenName: enq.citizenName,
    category: enq.category,
    subject: enq.subject,
    status: enq.status,
    officialResponse: enq.officialResponse || 'Awaiting review by respective committee/officer.',
    respondedBy: enq.respondedBy,
    createdAt: enq.createdAt,
    updatedAt: enq.updatedAt,
    isDemo: enq.isDemo
  });
});

// ----------------------------------------------------
// Admin Authentication
// ----------------------------------------------------

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    activeTokens.add(token);

    return res.json({
      success: true,
      token,
      user: {
        email: ADMIN_EMAIL,
        name: 'Kumbalgodu GP Administrator',
        role: 'SUPER_ADMIN'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid administrative credentials.' });
});

app.get('/api/auth/me', authenticateAdmin, (_req: Request, res: Response) => {
  res.json({
    email: ADMIN_EMAIL,
    name: 'Kumbalgodu GP Administrator',
    role: 'SUPER_ADMIN'
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ----------------------------------------------------
// Admin Protected APIs
// ----------------------------------------------------

// List all appointments with filters
app.get('/api/admin/appointments', authenticateAdmin, (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const search = (req.query.search as string || '').toLowerCase().trim();

  let list = dbStore.getAppointments();

  if (status && status !== 'ALL') {
    list = list.filter(a => a.status === status);
  }

  if (search) {
    list = list.filter(a => 
      a.fullName.toLowerCase().includes(search) ||
      a.mobileNumber.includes(search) ||
      a.referenceNumber.toLowerCase().includes(search) ||
      a.serviceName.toLowerCase().includes(search)
    );
  }

  res.json({
    total: list.length,
    appointments: list
  });
});

// Update appointment status / remarks / approved slot
app.patch('/api/admin/appointments/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, officialRemarks, approvedSlot, assignedOfficer } = req.body;

  const updated = dbStore.updateAppointment(id, {
    ...(status ? { status } : {}),
    ...(officialRemarks !== undefined ? { officialRemarks } : {}),
    ...(approvedSlot !== undefined ? { approvedSlot } : {}),
    ...(assignedOfficer !== undefined ? { assignedOfficer } : {})
  });

  if (!updated) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  res.json({ success: true, appointment: updated });
});

// List enquiries
app.get('/api/admin/enquiries', authenticateAdmin, (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  const search = (req.query.search as string || '').toLowerCase().trim();

  let list = dbStore.getEnquiries();

  if (status && status !== 'ALL') {
    list = list.filter(e => e.status === status);
  }

  if (search) {
    list = list.filter(e =>
      e.citizenName.toLowerCase().includes(search) ||
      e.mobileNumber.includes(search) ||
      e.referenceNumber.toLowerCase().includes(search) ||
      e.subject.toLowerCase().includes(search) ||
      e.category.toLowerCase().includes(search)
    );
  }

  res.json({
    total: list.length,
    enquiries: list
  });
});

// Update enquiry status & response
app.patch('/api/admin/enquiries/:id', authenticateAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, officialResponse, respondedBy } = req.body;

  const updated = dbStore.updateEnquiry(id, {
    ...(status ? { status } : {}),
    ...(officialResponse !== undefined ? { officialResponse } : {}),
    ...(respondedBy !== undefined ? { respondedBy } : {})
  });

  if (!updated) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  res.json({ success: true, enquiry: updated });
});

// Analytics Dashboard
app.get('/api/admin/analytics', authenticateAdmin, (_req: Request, res: Response) => {
  const appointments = dbStore.getAppointments();
  const enquiries = dbStore.getEnquiries();

  const apptStats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'PENDING_REVIEW').length,
    approved: appointments.filter(a => a.status === 'APPROVED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    rejected: appointments.filter(a => a.status === 'REJECTED').length
  };

  const enqStats = {
    total: enquiries.length,
    received: enquiries.filter(e => e.status === 'RECEIVED').length,
    inReview: enquiries.filter(e => e.status === 'IN_REVIEW').length,
    resolved: enquiries.filter(e => e.status === 'RESOLVED').length
  };

  res.json({
    appointments: apptStats,
    enquiries: enqStats,
    recentAppointments: appointments.slice(0, 5),
    recentEnquiries: enquiries.slice(0, 5)
  });
});

// Export CSV of Appointments
app.get('/api/admin/export/appointments', authenticateAdmin, (_req: Request, res: Response) => {
  const appts = dbStore.getAppointments();
  const headers = ['Reference Number', 'Full Name', 'Mobile Number', 'Email', 'Service Name', 'Preferred Date', 'Preferred Time', 'Status', 'Official Remarks', 'Approved Slot', 'Assigned Officer', 'Created At'];
  
  const csvRows = [
    headers.join(','),
    ...appts.map(a => [
      `"${a.referenceNumber}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.mobileNumber}"`,
      `"${a.email || ''}"`,
      `"${a.serviceName.replace(/"/g, '""')}"`,
      `"${a.preferredDate}"`,
      `"${a.preferredTime}"`,
      `"${a.status}"`,
      `"${(a.officialRemarks || '').replace(/"/g, '""')}"`,
      `"${(a.approvedSlot || '').replace(/"/g, '""')}"`,
      `"${(a.assignedOfficer || '').replace(/"/g, '""')}"`,
      `"${a.createdAt}"`
    ].join(','))
  ];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="kumbalgodu-appointments.csv"');
  res.send(csvRows.join('\n'));
});

// Update Office Config / Announcements
app.put('/api/admin/office-config', authenticateAdmin, (req: Request, res: Response) => {
  const updates = req.body;
  const updated = dbStore.updateOfficeConfig(updates);
  res.json({ success: true, config: updated });
});

// ----------------------------------------------------
// Dev / Prod Vite Integration
// ----------------------------------------------------

async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Gram Panchayat Kumbalgodu Portal] Server listening on port ${PORT}`);
  });
}

startServer();
