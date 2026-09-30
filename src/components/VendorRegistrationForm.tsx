import React, { useState } from 'react';
import {
  VendorApplication,
  SalesCategory,
  VendorCategory,
  VENDOR_CATEGORIES,
} from '../types';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  User,
  Store,
  Mail,
  Phone,
  Flag,
  CheckCircle2,
  Lock,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  ArrowLeft,
  IdCard,
  Search,
} from 'lucide-react';

interface VendorRegistrationFormProps {
  onSubmitSuccess: (newApp: VendorApplication) => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStatus?: () => void;
}

export const VendorRegistrationForm: React.FC<VendorRegistrationFormProps> = ({
  onSubmitSuccess,
  onNavigateToDashboard,
  onNavigateToStatus,
}) => {
  // Multi-step progress state (1: Profile, 2: Schedule & Items, 3: Logistics & Review)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [applicantName, setApplicantName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vendorCategory, setVendorCategory] = useState<VendorCategory>('Company - Client');
  const [preferredMonth, setPreferredMonth] = useState('July');
  const [salesItemType, setSalesItemType] = useState<SalesCategory>('Others');
  const [specifiedItemDescription, setSpecifiedItemDescription] = useState('Event Photobooth Rental & Instant Print Services');
  const [chairQuantity, setChairQuantity] = useState('2 Chairs');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [agreedToPdpa, setAgreedToPdpa] = useState(false);

  // Validation error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<VendorApplication | null>(null);

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!applicantName.trim()) newErrors.applicantName = 'Applicant full name is required.';
    if (!businessName.trim()) newErrors.businessName = 'Business or company name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required for logistics briefing.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!preferredMonth.trim()) newErrors.preferredMonth = 'Please select a preferred event month.';
    if (salesItemType === 'Others' && !specifiedItemDescription.trim()) {
      newErrors.specifiedItemDescription = 'Please specify your goods or service description.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!agreedToPdpa) {
      newErrors.agreedToPdpa = 'You must agree to the guidelines and PDPA compliance.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2() || !validateStep3()) return;

    // Generate reference code
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newRefCode = `MPB-HR-2025-${randomSuffix}`;

    const newApplication: VendorApplication = {
      id: `app-${Date.now()}`,
      referenceCode: newRefCode,
      applicantName: applicantName.trim(),
      businessName: businessName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      icNumber: icNumber.trim() || undefined,
      vendorCategory,
      preferredMonth,
      salesItemType,
      specifiedItemDescription: specifiedItemDescription.trim() || undefined,
      tableCount: 1,
      chairQuantity,
      additionalNotes: additionalNotes.trim() || undefined,
      isStaff: vendorCategory === 'Kelab Media Prima Berhad',
      agreedToPdpa: true,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    };

    onSubmitSuccess(newApplication);
    setSubmittedRecord(newApplication);
    setShowSuccessModal(true);

    // Reset form fields
    setApplicantName('');
    setBusinessName('');
    setIcNumber('');
    setEmail('');
    setPhone('');
    setAdditionalNotes('');
    setAgreedToPdpa(false);
    setCurrentStep(1);
    setErrors({});
  };

  const salesCategories: {
    key: SalesCategory;
    title: string;
    subtitle: string;
  }[] = [
    {
      key: 'Food & Beverages (F&B)',
      title: 'Food & Beverages (F&B)',
      subtitle: 'Cooked meals, cold drinks, pastries, packed food',
    },
    {
      key: 'Apparel & Fashion',
      title: 'Apparel & Fashion',
      subtitle: 'Clothing, traditional wear, hijabs, accessories',
    },
    {
      key: 'Crafts & Accessories',
      title: 'Crafts & Accessories',
      subtitle: 'Handmade items, jewelry, home decor, gifts',
    },
    {
      key: 'Services & Lifestyle',
      title: 'Services & Lifestyle',
      subtitle: 'Henna, face painting, massage, fitness',
    },
    {
      key: 'Others',
      title: 'Others',
      subtitle: 'Specialty services, electronics, digital goods, custom items',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Media Prima Notification Banner */}
      <div className="bg-[#eff6ff] rounded-xl border border-[#bfdbfe] p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-[#1d4ed8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1e40af] uppercase tracking-wider text-[11px]">
                Bazar Seloka • Group Human Resources
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#dbeafe] text-[#1e40af]">
                Active Cycle
              </span>
            </div>
            <p className="text-xs text-[#3b82f6] mt-0.5">
              Registration is open for Bazar Seloka 2025. Powered by Group Human Resources. Standard allocation: 1 Table and 2 complimentary chairs (up to 6 upon request, free of charge).
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Event Context Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Official Event Information */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                Event Information
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10b981]" title="Active"></span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0f172a] font-display">
                Bazar Seloka 2025
              </h3>
              <p className="text-xs text-[#64748b]">
                Media Prima vendor bazaar & entrepreneurial showcase • Powered by Group Human Resources.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[#334155]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#d61b22] shrink-0" />
                <span>Balai Berita Grounds, 31 Jalan Riong, Bangsar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#d61b22] shrink-0" />
                <span>09:00 AM – 06:00 PM (Ingress: 07:30 AM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#d61b22] shrink-0" />
                <span>Monthly Carnival Cycles (May – Dec 2025)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#d61b22] shrink-0" />
                <span>Target Audience: Est. 1,800+ MPB Staff & Attendees</span>
              </div>
            </div>

            {/* Important Notice Callout Box */}
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-3.5 space-y-1">
              <span className="font-bold text-[#b91c1c] text-[11px] tracking-wide uppercase block">
                Important Notice
              </span>
              <p className="text-xs text-[#991b1b] leading-normal">
                Booth approval is subject to lot availability and compliance with MPB health and safety standards.
              </p>
            </div>
          </div>

          {/* Card 2: Fast Approval Rate */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#0f172a]">Fast Approval Rate</span>
              <span className="font-bold text-[#d61b22] font-mono">94.8%</span>
            </div>
            <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#d61b22] h-full rounded-full transition-all duration-700"
                style={{ width: '94.8%' }}
              ></div>
            </div>
            <p className="text-[11.5px] text-[#64748b]">
              Based on MPB Carnival 2024 records • Immediate digital ingress pass upon approval
            </p>
          </div>
        </div>

        {/* Right Column: Multi-Step Vendor Registration Form (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Form Top Badge & Module Code */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b91c1c] uppercase tracking-wide">
                <Flag className="w-3.5 h-3.5 text-[#d61b22]" />
                <span>Bazar Seloka 2025 • Media Prima Berhad</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-[#64748b] bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e2e8f0]">
                Module Code: F01 • Step {currentStep} of 3
              </span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-1.5 pb-4 border-b border-[#f1f5f9]">
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] font-display tracking-tight">
                Bazar Seloka Vendor Registration
              </h1>
              <p className="text-[13.5px] text-[#475569] leading-relaxed">
                Please complete your business details below to participate in Bazar Seloka 2025. Powered by Group Human Resources.
              </p>
            </div>

            {/* Multi-Step Wizard Progress Bar */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {/* Step 1 Pill */}
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`p-2 rounded-lg transition-all text-left flex items-center gap-2 cursor-pointer ${
                    currentStep === 1
                      ? 'bg-white shadow-xs border border-[#cbd5e1] font-bold text-[#0f172a]'
                      : currentStep > 1
                      ? 'text-[#10b981] font-semibold'
                      : 'text-[#64748b]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      currentStep === 1
                        ? 'bg-[#d61b22] text-white'
                        : currentStep > 1
                        ? 'bg-[#ecfdf5] text-[#10b981] border border-[#a7f3d0]'
                        : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}
                  >
                    {currentStep > 1 ? '✓' : '1'}
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] leading-tight font-bold">Step 1</span>
                    <span className="block text-[10px] text-[#64748b] truncate hidden sm:inline">
                      Profile & Contact
                    </span>
                  </div>
                </button>

                {/* Step 2 Pill */}
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setCurrentStep(2);
                  }}
                  className={`p-2 rounded-lg transition-all text-left flex items-center gap-2 cursor-pointer ${
                    currentStep === 2
                      ? 'bg-white shadow-xs border border-[#cbd5e1] font-bold text-[#0f172a]'
                      : currentStep > 2
                      ? 'text-[#10b981] font-semibold'
                      : 'text-[#64748b]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      currentStep === 2
                        ? 'bg-[#d61b22] text-white'
                        : currentStep > 2
                        ? 'bg-[#ecfdf5] text-[#10b981] border border-[#a7f3d0]'
                        : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}
                  >
                    {currentStep > 2 ? '✓' : '2'}
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] leading-tight font-bold">Step 2</span>
                    <span className="block text-[10px] text-[#64748b] truncate hidden sm:inline">
                      Schedule & Items
                    </span>
                  </div>
                </button>

                {/* Step 3 Pill */}
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1() && validateStep2()) setCurrentStep(3);
                  }}
                  className={`p-2 rounded-lg transition-all text-left flex items-center gap-2 cursor-pointer ${
                    currentStep === 3
                      ? 'bg-white shadow-xs border border-[#cbd5e1] font-bold text-[#0f172a]'
                      : 'text-[#64748b]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      currentStep === 3
                        ? 'bg-[#d61b22] text-white'
                        : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}
                  >
                    3
                  </div>
                  <div className="truncate">
                    <span className="block text-[11px] leading-tight font-bold">Step 3</span>
                    <span className="block text-[10px] text-[#64748b] truncate hidden sm:inline">
                      Logistics & Review
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* STEP 1: Applicant & Business Info */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep1} className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#f1f5f9] pb-2">
                  <h3 className="text-base font-bold text-[#0f172a]">
                    1. Applicant & Business Profile
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Provide your primary contact and commercial registration details.
                  </p>
                </div>

                {/* Row 1: Full Name & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div id="applicantName" className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Applicant Full Name <span className="text-[#d61b22]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Ahmad Zulkifli bin Razak"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                          errors.applicantName
                            ? 'border-[#ef4444] bg-[#fef2f2] focus:ring-2 focus:ring-[#ef4444]/20'
                            : 'border-[#cbd5e1] focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15'
                        }`}
                      />
                    </div>
                    {errors.applicantName && (
                      <p className="text-xs text-[#dc2626] font-medium">{errors.applicantName}</p>
                    )}
                  </div>

                  <div id="businessName" className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Business / Company Name <span className="text-[#d61b22]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                        <Store className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Kopi Riong Enterprise / Rasa"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                          errors.businessName
                            ? 'border-[#ef4444] bg-[#fef2f2] focus:ring-2 focus:ring-[#ef4444]/20'
                            : 'border-[#cbd5e1] focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15'
                        }`}
                      />
                    </div>
                    {errors.businessName && (
                      <p className="text-xs text-[#dc2626] font-medium">{errors.businessName}</p>
                    )}
                  </div>
                </div>

                {/* IC Number & Affiliation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#0f172a]">
                        IC Number (MyKad / NRIC)
                      </label>
                      <span className="text-[11px] text-[#64748b]">Verification</span>
                    </div>
                    <input
                      type="text"
                      value={icNumber}
                      onChange={(e) => setIcNumber(e.target.value)}
                      placeholder="e.g. 920815-14-5542"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#0f172a]">
                        Vendor Category <span className="text-[#d61b22]">*</span>
                      </label>
                      <span className="text-[11px] text-[#64748b]">Affiliation</span>
                    </div>
                    <select
                      value={vendorCategory}
                      onChange={(e) => setVendorCategory(e.target.value as VendorCategory)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-colors font-medium text-[#0f172a]"
                    >
                      <option value="Company - Client">1. Company - Client</option>
                      <option value="HR - Vendor">2. HR - Vendor</option>
                      <option value="Kelab Media Prima Berhad">3. Kelab Media Prima Berhad</option>
                      <option value="Fama">4. Fama</option>
                    </select>
                  </div>
                </div>

                {/* Email Address & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div id="email" className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Email Address <span className="text-[#d61b22]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. contact@business.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-[#ef4444] bg-[#fef2f2] focus:ring-2 focus:ring-[#ef4444]/20'
                            : 'border-[#cbd5e1] focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-[#dc2626] font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div id="phone" className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Phone Number <span className="text-[#d61b22]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +6012-3456789"
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-[#ef4444] bg-[#fef2f2] focus:ring-2 focus:ring-[#ef4444]/20'
                            : 'border-[#cbd5e1] focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-[#dc2626] font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Proceed to Step 2: Schedule & Items</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Event Calendar & Category */}
            {currentStep === 2 && (
              <form onSubmit={handleNextStep2} className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-[#f1f5f9] pb-2">
                  <h3 className="text-base font-bold text-[#0f172a]">
                    2. Event Schedule & Sales Items
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Select your target carnival month and primary trade category.
                  </p>
                </div>

                {/* Preferred Carnival Month */}
                <div id="preferredMonth" className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Preferred Carnival Month / Month of Applying <span className="text-[#d61b22]">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748b]">Month Only</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      value={preferredMonth}
                      onChange={(e) => setPreferredMonth(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-colors"
                    >
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                  {errors.preferredMonth && (
                    <p className="text-xs text-[#dc2626] font-medium">{errors.preferredMonth}</p>
                  )}
                </div>

                {/* Sales Item Type Cards */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Sales Item Type <span className="text-[#d61b22]">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748b]">Select Primary Category</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {salesCategories.map((item) => {
                      const isSelected = salesItemType === item.key;
                      return (
                        <div
                          key={item.key}
                          onClick={() => {
                            setSalesItemType(item.key);
                            if (item.key === 'Others') {
                              setTimeout(() => {
                                const inputEl = document.querySelector('#specifiedItemDescription input') as HTMLInputElement;
                                inputEl?.focus();
                              }, 50);
                            }
                          }}
                          className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left relative ${
                            isSelected
                              ? 'border-[#d61b22] bg-white ring-2 ring-[#d61b22]/15 shadow-xs'
                              : 'border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1]'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? 'border-[#d61b22] bg-[#d61b22]'
                                  : 'border-[#cbd5e1] bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                            </div>

                            <div className="space-y-0.5 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-[13px] font-semibold ${
                                    isSelected ? 'text-[#0f172a]' : 'text-[#334155]'
                                  }`}
                                >
                                  {item.title}
                                </span>
                                {isSelected && item.key === 'Others' && (
                                  <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase bg-[#d61b22] text-white">
                                    Active / Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-[11.5px] text-[#64748b] leading-tight">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Free Text Specification Field */}
                <div id="specifiedItemDescription" className={`space-y-1.5 transition-all ${
                  salesItemType === 'Others' ? 'p-4 bg-[#fef2f2]/60 rounded-xl border border-[#fecaca]' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#0f172a] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#d61b22]" />
                      <span>
                        {salesItemType === 'Others' ? (
                          <>Specify Other Item / Service (Free Text) <span className="text-[#d61b22]">*</span></>
                        ) : (
                          <>Item / Product Description (Optional Specification)</>
                        )}
                      </span>
                    </label>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      salesItemType === 'Others'
                        ? 'bg-[#d61b22] text-white uppercase'
                        : 'bg-[#f1f5f9] text-[#64748b]'
                    }`}>
                      {salesItemType === 'Others' ? 'Required / Free Text' : 'Optional'}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                      <Store className={`w-4 h-4 ${salesItemType === 'Others' ? 'text-[#d61b22]' : ''}`} />
                    </div>
                    <input
                      type="text"
                      value={specifiedItemDescription}
                      onChange={(e) => {
                        setSpecifiedItemDescription(e.target.value);
                        if (errors.specifiedItemDescription) {
                          setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.specifiedItemDescription;
                            return copy;
                          });
                        }
                      }}
                      placeholder={
                        salesItemType === 'Others'
                          ? 'Enter custom item or service (e.g. Event Photobooth & Instant Print, Face Painting, Henna, Car Detailing)...'
                          : 'e.g. Hot coffee & traditional curry puffs, modern kurung apparel, handcrafted souvenirs...'
                      }
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border rounded-lg focus:outline-none transition-colors ${
                        errors.specifiedItemDescription
                          ? 'border-[#ef4444] bg-[#fef2f2] focus:ring-2 focus:ring-[#ef4444]/20'
                          : 'border-[#cbd5e1] focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15'
                      }`}
                    />
                  </div>
                  {errors.specifiedItemDescription && (
                    <p className="text-xs text-[#dc2626] font-medium">{errors.specifiedItemDescription}</p>
                  )}
                  <div className="flex items-start gap-1.5 text-[11px] text-[#64748b]">
                    <Info className="w-3.5 h-3.5 text-[#94a3b8] shrink-0 mt-0.5" />
                    <span>
                      {salesItemType === 'Others'
                        ? 'Free text field: Please describe the primary products or specialized services you wish to offer at the carnival.'
                        : 'Please enter a brief description of your main sales items for HR logistics review.'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#cbd5e1] text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Profile</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Proceed to Step 3: Logistics & Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Logistics, Review Summary & Final Submit */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-[#f1f5f9] pb-2">
                  <h3 className="text-base font-bold text-[#0f172a]">
                    3. Site Logistics & Pre-Submission Review
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    Confirm your table and chair allocations, review your details, and accept the PDPA declaration.
                  </p>
                </div>

                {/* Site Logistics Box */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left: Total Tables (Fixed) */}
                  <div className="bg-white border border-[#e2e8f0] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#475569]">Total Tables (Fixed)</span>
                      <span className="text-[10px] uppercase font-bold text-[#64748b] bg-[#f1f5f9] px-1.5 py-0.5 rounded">
                        Fixed Allocation
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-sm font-bold text-[#0f172a]">1 Unit Standard</span>
                      <span className="px-1.5 py-0.5 bg-[#fef2f2] text-[#d61b22] text-[10px] font-bold rounded">
                        MAX 1
                      </span>
                    </div>

                    <p className="text-[11px] text-[#64748b] pt-1">
                      Each vendor slot is allocated exactly 1 standard table (3' x 3').
                    </p>
                  </div>

                  {/* Right: Chair Quantity */}
                  <div className="bg-white border border-[#e2e8f0] rounded-lg p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#0f172a]">
                        Chair Quantity <span className="text-[#d61b22]">*</span>
                      </label>
                      <span className="text-[10px] text-[#059669] font-bold bg-[#ecfdf5] px-1.5 py-0.5 rounded border border-[#a7f3d0]">
                        No Fee Required
                      </span>
                    </div>

                    <select
                      value={chairQuantity}
                      onChange={(e) => setChairQuantity(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded-md focus:border-[#d61b22] focus:outline-none"
                    >
                      <option value="2 Chairs">2 Chairs (Default)</option>
                      <option value="4 Chairs">4 Chairs</option>
                      <option value="6 Chairs">6 Chairs</option>
                    </select>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#16a34a] pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                      <span>Complimentary: 2, 4, or 6 chairs provided free of charge.</span>
                    </div>
                  </div>
                </div>

                {/* Additional Remarks */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#0f172a]">
                    Special Requirements or Electrical Point Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Need 13A socket for warmer/printer, loading assistance, allergy declarations..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:outline-none transition-colors"
                  />
                </div>

                {/* Live Pre-Submission Summary Review */}
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                      Summary Review Before Final Submission
                    </span>
                    <span className="text-[10.5px] text-[#d61b22] font-semibold">
                      Please verify
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-[#e2e8f0]">
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Applicant:</span>
                      <span className="font-semibold text-[#0f172a]">{applicantName || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Business:</span>
                      <span className="font-semibold text-[#0f172a]">{businessName || '—'}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Month:</span>
                      <span className="font-semibold text-[#0f172a]">{preferredMonth}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Category:</span>
                      <span className="font-semibold text-[#0f172a]">{salesItemType}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Logistics:</span>
                      <span className="font-semibold text-[#0f172a]">1 Table, {chairQuantity}</span>
                    </div>
                    <div>
                      <span className="text-[#64748b] block text-[11px]">Affiliation:</span>
                      <span className="font-semibold text-[#0f172a] truncate block">{vendorCategory}</span>
                    </div>
                  </div>
                </div>

                {/* PDPA Agreement */}
                <div id="agreedToPdpa" className="space-y-1.5 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedToPdpa}
                      onChange={(e) => {
                        setAgreedToPdpa(e.target.checked);
                        if (errors.agreedToPdpa) {
                          setErrors((prev) => {
                            const copy = { ...prev };
                            delete copy.agreedToPdpa;
                            return copy;
                          });
                        }
                      }}
                      className="mt-0.5 w-4 h-4 rounded text-[#d61b22] border-[#cbd5e1] focus:ring-[#d61b22] cursor-pointer"
                    />
                    <span className="text-xs text-[#475569] leading-relaxed">
                      I agree to the <strong>Media Prima Berhad HR Carnival Rules</strong>, safety regulations, and consent to the processing of my personal data under the <strong>Personal Data Protection Act (PDPA) 2010</strong>.
                    </span>
                  </label>
                  {errors.agreedToPdpa && (
                    <p className="text-xs text-[#dc2626] font-medium pl-6">{errors.agreedToPdpa}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#cbd5e1] text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Schedule</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Submit Official Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && submittedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-[#e2e8f0] space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#10b981]" />
            </div>

            <div className="text-center space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">
                Application Successfully Submitted
              </span>
              <h3 className="text-xl font-bold text-[#0f172a] font-display">
                Thank You, {submittedRecord.applicantName}!
              </h3>
              <p className="text-xs text-[#64748b]">
                Your vendor registration has been recorded in the central Media Prima HR database.
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-[#f8fafc] rounded-xl p-4 border border-[#e2e8f0] text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
                <span className="text-[#64748b]">Reference Code:</span>
                <span className="font-mono font-bold text-[#d61b22] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                  {submittedRecord.referenceCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Business / Brand:</span>
                <span className="font-semibold text-[#0f172a]">{submittedRecord.businessName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Event Schedule:</span>
                <span className="text-[#0f172a]">{submittedRecord.preferredMonth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748b]">Sales Item:</span>
                <span className="text-[#0f172a]">{submittedRecord.salesItemType}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0]">
                <span className="text-[#64748b]">Initial Review Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#b45309]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                  Pending Review (1-3 working days)
                </span>
              </div>
            </div>

            <p className="text-[11.5px] text-[#64748b] text-center leading-relaxed">
              Once reviewed by the HR committee, an automated confirmation notice will be generated and dispatched to your email (<strong>{submittedRecord.email}</strong>).
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {onNavigateToStatus && (
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    onNavigateToStatus();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Application Status</span>
                </button>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 py-2 px-3 rounded-lg border border-[#cbd5e1] text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors"
                >
                  Submit Another
                </button>

                {onNavigateToDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowSuccessModal(false);
                      onNavigateToDashboard();
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-xs font-semibold text-white transition-colors"
                  >
                    Approval Center
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
