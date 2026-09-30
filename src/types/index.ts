export type VendorStatus = 'Pending' | 'Approved' | 'Rejected';

export type VendorCategory =
  | 'Company - Client'
  | 'HR - Vendor'
  | 'Kelab Media Prima Berhad'
  | 'Fama';

export const VENDOR_CATEGORIES: VendorCategory[] = [
  'Company - Client',
  'HR - Vendor',
  'Kelab Media Prima Berhad',
  'Fama',
];

export type SalesCategory =
  | 'Food & Beverages (F&B)'
  | 'Apparel & Fashion'
  | 'Crafts & Accessories'
  | 'Services & Lifestyle'
  | 'Others';

export interface VendorApplication {
  id: string;
  referenceCode: string;
  applicantName: string;
  businessName: string;
  email: string;
  phone: string;
  vendorCategory: VendorCategory;
  preferredMonth: string;
  salesItemType: SalesCategory;
  specifiedItemDescription?: string;
  tableCount: number; // Always 1
  chairQuantity: string;
  additionalNotes?: string;
  isStaff: boolean;
  staffId?: string;
  icNumber?: string;
  department?: string;
  agreedToPdpa: boolean;
  submittedAt: string;
  status: VendorStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface OutboxEmail {
  id: string;
  applicationId: string;
  referenceCode: string;
  recipientEmail: string;
  recipientName: string;
  businessName: string;
  subject: string;
  type: 'Approval' | 'Rejection' | 'Acknowledgment';
  sentAt: string;
  status: 'Simulated' | 'Delivered';
  htmlBody: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
}
