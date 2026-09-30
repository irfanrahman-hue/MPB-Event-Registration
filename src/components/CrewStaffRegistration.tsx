import React, { useState } from 'react';
import { VendorApplication, SalesCategory } from '../types';
import {
  BadgeCheck,
  UserCheck,
  Building,
  Mail,
  Phone,
  Calendar,
  Lock,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface CrewStaffRegistrationProps {
  onSubmitSuccess: (newApp: VendorApplication) => void;
  onNavigateToDashboard?: () => void;
}

export const CrewStaffRegistration: React.FC<CrewStaffRegistrationProps> = ({
  onSubmitSuccess,
  onNavigateToDashboard,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [chairQuantity, setChairQuantity] = useState('2 Chairs');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [agreedToPdpa, setAgreedToPdpa] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<VendorApplication | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!applicantName.trim()) newErrors.applicantName = 'Staff member name is required.';
    if (!icNumber.trim()) newErrors.icNumber = 'IC Number (MyKad / NRIC) is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid corporate/personal email is required.';
    if (!phone.trim()) newErrors.phone = 'Contact number is required.';
    if (!agreedToPdpa) newErrors.agreedToPdpa = 'Agreement with MPB HR guidelines is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newRefCode = `MPB-CREW-2025-${randomSuffix}`;

    const newApplication: VendorApplication = {
      id: `app-crew-${Date.now()}`,
      referenceCode: newRefCode,
      applicantName: applicantName.trim(),
      businessName: `${applicantName.trim()} (Staff Crew)`,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      vendorCategory: 'Kelab Media Prima Berhad',
      preferredMonth: 'Bazar Seloka (Official Event Crew)',
      salesItemType: 'Services & Lifestyle',
      tableCount: 0,
      chairQuantity,
      additionalNotes: additionalNotes.trim() || undefined,
      isStaff: true,
      staffId: icNumber.trim(),
      icNumber: icNumber.trim(),
      department: 'MPB Staff Operations',
      agreedToPdpa: true,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };

    onSubmitSuccess(newApplication);
    setSubmittedRecord(newApplication);
    setShowSuccessModal(true);

    // Reset fields
    setApplicantName('');
    setIcNumber('');
    setEmail('');
    setPhone('');
    setAdditionalNotes('');
    setAgreedToPdpa(false);
    setErrors({});
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Banner for Internal Staff */}
      <div className="bg-[#eff6ff] rounded-xl border border-[#bfdbfe] p-4.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0">
            <BadgeCheck className="w-5 h-5 text-[#1d4ed8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1e40af] uppercase tracking-wider">
                Internal MPB Staff Venture & Crew Registration
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#dbeafe] text-[#1e40af]">
                Priority HR Track
              </span>
            </div>
            <p className="text-xs text-[#3b82f6] mt-0.5">
              Open exclusively to active Media Prima Berhad employees across TV3, 8TV, TV9, NSTP, Rev Media, Big Tree, Fly FM, and Hot FM.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="border-b border-[#f1f5f9] pb-4">
          <h1 className="text-2xl font-bold text-[#0f172a] font-display">
            Staff & Crew Registration Form
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748b] mt-1">
            Register your participation as official event crew or duty staff for Bazar Seloka • Media Prima Berhad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Staff ID & Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0f172a]">
                Staff Full Name <span className="text-[#d61b22]">*</span>
              </label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Nurul Huda binti Othman"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                  errors.applicantName ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#cbd5e1] focus:border-[#d61b22]'
                }`}
              />
              {errors.applicantName && (
                <p className="text-xs text-[#dc2626]">{errors.applicantName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0f172a]">
                IC Number <span className="text-[#d61b22]">*</span>
              </label>
              <input
                type="text"
                value={icNumber}
                onChange={(e) => setIcNumber(e.target.value)}
                placeholder="e.g. 950812-14-5678"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                  errors.icNumber ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#cbd5e1] focus:border-[#d61b22]'
                }`}
              />
              {errors.icNumber && (
                <p className="text-xs text-[#dc2626]">{errors.icNumber}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0f172a]">
                Email Address <span className="text-[#d61b22]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. nurulhuda@mediaprima.com.my"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                  errors.email ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#cbd5e1] focus:border-[#d61b22]'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-[#dc2626]">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0f172a]">
                Contact Number <span className="text-[#d61b22]">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +6013-9876543"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                  errors.phone ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#cbd5e1] focus:border-[#d61b22]'
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-[#dc2626]">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Chair Requirements */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0f172a]">
              Chairs Required
            </label>
            <select
              value={chairQuantity}
              onChange={(e) => setChairQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:outline-none"
            >
              <option value="None / Not Required">None / Not Required</option>
              <option value="2 Chairs">2 Chairs (Default)</option>
              <option value="4 Chairs">4 Chairs</option>
              <option value="6 Chairs">6 Chairs</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0f172a]">
              Additional Remarks / Special Requirements (Optional)
            </label>
            <textarea
              rows={3}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Shift availability, logistics support, dietary needs, or special requirements..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:outline-none transition-colors"
            ></textarea>
          </div>

          {/* PDPA agreement */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPdpa}
                onChange={(e) => setAgreedToPdpa(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#cbd5e1] text-[#d61b22] focus:ring-[#d61b22]"
              />
              <span className="text-xs text-[#475569]">
                I confirm that I am an active Media Prima employee and agree to adhere to company HR code of conduct and safety regulations during the carnival.
              </span>
            </label>
            {errors.agreedToPdpa && (
              <p className="text-xs text-[#dc2626] pl-7">{errors.agreedToPdpa}</p>
            )}
          </div>

          <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
            <span className="text-xs text-[#64748b]">
              Media Prima Staff & Crew Verification
            </span>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>Submit Crew Registration</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      {showSuccessModal && submittedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#e2e8f0] space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#2563eb]" />
            </div>

            <h3 className="text-lg font-bold text-[#0f172a]">
              Crew Registration Submitted!
            </h3>
            <p className="text-xs text-[#64748b]">
              Your registration as official MPB Carnival Crew has been received for IC Number <strong>{submittedRecord.icNumber || submittedRecord.staffId}</strong>.
            </p>

            <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] font-mono text-xs font-bold text-[#2563eb]">
              Ref: {submittedRecord.referenceCode}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2 rounded-lg border border-[#cbd5e1] text-xs font-semibold text-[#334155]"
              >
                Close
              </button>
              {onNavigateToDashboard && (
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigateToDashboard();
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#d61b22] text-white text-xs font-semibold"
                >
                  View in Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
