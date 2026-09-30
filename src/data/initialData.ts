import { VendorApplication, OutboxEmail, AdminUser } from '../types';

export const DEFAULT_ADMIN: AdminUser = {
  email: 'admin@mediaprima.com.my',
  name: 'Farah Yasmin',
  role: 'Super Admin',
  department: 'Media Prima HR Events',
  avatar: '/src/assets/images/avatar_farah_yasmin_1790664312696.jpg',
};

export const INITIAL_APPLICATIONS: VendorApplication[] = [
  {
    id: 'app-001',
    referenceCode: 'MPB-HR-2025-001',
    applicantName: 'Ahmad Zulkifli bin Razak',
    businessName: 'Kopi Riong Enterprise',
    email: 'ahmad.zulkifli@kopiriong.my',
    phone: '+6012-3456789',
    vendorCategory: 'Company - Client',
    preferredMonth: 'July',
    salesItemType: 'Others',
    specifiedItemDescription: 'Event Photobooth Rental & Instant Print Services',
    tableCount: 1,
    chairQuantity: '2 Chairs (Recommended - Complimentary)',
    additionalNotes: 'Requires 13A electrical socket (plug point) for dye-sublimation photobooth printers.',
    isStaff: false,
    agreedToPdpa: true,
    submittedAt: '2025-05-12T09:42:00.000Z',
    status: 'Pending',
  },
  {
    id: 'app-002',
    referenceCode: 'MPB-HR-2025-002',
    applicantName: 'Siti Nurhaliza binti Kamaruddin',
    businessName: 'Dapur Sri Pentas Nasi Lemak Royale',
    email: 'siti.kamaruddin@dapursripentas.com',
    phone: '+6019-8765432',
    vendorCategory: 'HR - Vendor',
    preferredMonth: 'July',
    salesItemType: 'Food & Beverages (F&B)',
    specifiedItemDescription: 'Traditional Sambal Sotong Nasi Lemak & Hot Teh Tarik',
    tableCount: 1,
    chairQuantity: '2 Chairs (Recommended - Complimentary)',
    additionalNotes: 'Food warmer will be utilized. Complying with food safety and hygiene guidelines.',
    isStaff: true,
    staffId: 'MPB-8831',
    department: 'Digital Media Prima',
    agreedToPdpa: true,
    submittedAt: '2025-05-10T14:15:00.000Z',
    status: 'Approved',
    reviewedAt: '2025-05-11T10:30:00.000Z',
    reviewedBy: 'Farah Yasmin (Super Admin)',
  },
];

export const INITIAL_EMAILS: OutboxEmail[] = [
  {
    id: 'em-001',
    applicationId: 'app-002',
    referenceCode: 'MPB-HR-2025-002',
    recipientEmail: 'siti.kamaruddin@dapursripentas.com',
    recipientName: 'Siti Nurhaliza binti Kamaruddin',
    businessName: 'Dapur Sri Pentas Nasi Lemak Royale',
    subject: '[APPROVED] MPB HR Carnival 2025 Vendor Participation Confirmation (Ref: MPB-HR-2025-002)',
    type: 'Approval',
    sentAt: '2025-05-11T10:30:00.000Z',
    status: 'Simulated',
    htmlBody: `
Dear Siti Nurhaliza binti Kamaruddin,

Tahniah! We are pleased to inform you that your application for Dapur Sri Pentas Nasi Lemak Royale to operate as a vendor at the HR Carnival 2025 (July 2025) has been officially APPROVED by Media Prima Berhad Human Resources.

Application Summary:
• Reference Code: MPB-HR-2025-002
• Vendor: Siti Nurhaliza binti Kamaruddin
• Business Name: Dapur Sri Pentas Nasi Lemak Royale
• Category: Food & Beverages (F&B)
• Location: Balai Berita Grounds, Jalan Riong KL
• Allocated Space: 1 Standard Table (3' x 3') with 2 Chairs

Logistics & Ingress Briefing:
1. Vendor Ingress: Starts promptly at 07:30 AM on event day.
2. Unloading Bay: Entry via Gate 2, Balai Berita Bangsar.
3. Access Passes: 2 Crew Badges will be provided at the HR Registration Counter.

For any logistics inquiries or changes, please contact the HR Events Committee at hrevents@mediaprima.com.my.

Warm regards,
Farah Yasmin
Head of Human Resources & Employee Engagement
Media Prima Berhad
    `.trim(),
  },
];

const STORAGE_KEYS = {
  APPLICATIONS: 'mpb_vendor_applications_v1',
  OUTBOX: 'mpb_vendor_outbox_v1',
  AUTH: 'mpb_vendor_auth_v1',
};

export const getStoredApplications = (): VendorApplication[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read applications from localStorage', e);
    return INITIAL_APPLICATIONS;
  }
};

export const saveStoredApplications = (apps: VendorApplication[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  } catch (e) {
    console.error('Failed to write applications to localStorage', e);
  }
};

export const getStoredOutbox = (): OutboxEmail[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OUTBOX);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.OUTBOX, JSON.stringify(INITIAL_EMAILS));
      return INITIAL_EMAILS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read outbox from localStorage', e);
    return INITIAL_EMAILS;
  }
};

export const saveStoredOutbox = (emails: OutboxEmail[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.OUTBOX, JSON.stringify(emails));
  } catch (e) {
    console.error('Failed to write outbox to localStorage', e);
  }
};

export const getStoredAuth = (): AdminUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setStoredAuth = (user: AdminUser | null): void => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  } catch (e) {
    console.error('Failed to update auth in localStorage', e);
  }
};
