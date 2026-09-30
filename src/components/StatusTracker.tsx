import React, { useState } from 'react';
import { VendorApplication } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  Info,
  Mail,
} from 'lucide-react';

interface StatusTrackerProps {
  applications: VendorApplication[];
  onNavigateToRegister: () => void;
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({
  applications,
  onNavigateToRegister,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<VendorApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const match = applications.find(
      (app) =>
        app.referenceCode.toLowerCase() === query ||
        app.email.toLowerCase() === query ||
        (app.icNumber && app.icNumber.toLowerCase().replace(/[-\s]/g, '') === query.replace(/[-\s]/g, '')) ||
        (app.staffId && app.staffId.toLowerCase() === query)
    );

    setSearchedRecord(match || null);
    setHasSearched(true);
  };

  const handleQuickDemo = (ref: string) => {
    setSearchQuery(ref);
    const match = applications.find((app) => app.referenceCode === ref);
    setSearchedRecord(match || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Hero Banner */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fef2f2] text-[#d61b22] border border-[#fecaca] uppercase">
              Bazar Seloka • Self-Service Portal
            </span>
            <span className="text-xs text-[#64748b]">• Real-Time Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display">
            Check Application Status
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] mt-1">
            Track your Bazar Seloka 2025 vendor registration status. Powered by Group Human Resources, Media Prima Berhad.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-2xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Reference Code (e.g. MPB-HR-2025-001), IC Number, or Email..."
                className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-xl focus:bg-white focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#d61b22] hover:bg-[#b9141a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <span>Search Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Demo Links */}
          <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-[#64748b]">
            <span className="text-[11px] font-medium">Quick Demo Records:</span>
            {applications.slice(0, 3).map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleQuickDemo(app.referenceCode)}
                className="px-2 py-0.5 rounded-md bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] font-mono text-[11px] transition-colors cursor-pointer border border-[#e2e8f0]"
              >
                {app.referenceCode} ({app.status})
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Search Result View */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {searchedRecord ? (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              {/* Header Status Bar */}
              <div
                className={`p-5 sm:p-6 border-b flex flex-wrap items-center justify-between gap-4 ${
                  searchedRecord.status === 'Approved'
                    ? 'bg-[#ecfdf5] border-[#a7f3d0]'
                    : searchedRecord.status === 'Rejected'
                    ? 'bg-[#fef2f2] border-[#fecaca]'
                    : 'bg-[#fffbeb] border-[#fde68a]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-white border border-[#cbd5e1] text-[#0f172a]">
                      {searchedRecord.referenceCode}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        searchedRecord.status === 'Approved'
                          ? 'bg-[#10b981] text-white'
                          : searchedRecord.status === 'Rejected'
                          ? 'bg-[#ef4444] text-white'
                          : 'bg-[#f59e0b] text-white'
                      }`}
                    >
                      {searchedRecord.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a] font-display">
                    {searchedRecord.businessName}
                  </h2>
                  <p className="text-xs text-[#64748b]">
                    Applicant: {searchedRecord.applicantName} • {searchedRecord.email}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="flex flex-wrap items-center gap-2">
                  {searchedRecord.status === 'Approved' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-xs font-semibold shadow-2xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approved • Ingress Gate 2</span>
                    </div>
                  )}
                  {searchedRecord.status === 'Pending' && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f59e0b] text-white text-xs font-semibold shadow-2xs">
                      <Clock className="w-4 h-4" />
                      <span>Review in Progress (1-2 days)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-6 border-b border-[#e2e8f0] bg-[#f8fafc]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569] mb-4">
                  Review & Approval Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1 */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] space-y-1 relative">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>1. Application Received</span>
                    </div>
                    <p className="text-[11px] text-[#64748b]">
                      Submitted on {new Date(searchedRecord.submittedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10.5px] text-[#94a3b8]">Verified via online portal</p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] space-y-1 relative">
                    <div
                      className={`flex items-center gap-2 font-bold text-xs ${
                        searchedRecord.status !== 'Pending'
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {searchedRecord.status !== 'Pending' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4 animate-spin" />
                      )}
                      <span>2. HR Committee Review</span>
                    </div>
                    <p className="text-[11px] text-[#64748b]">
                      {searchedRecord.status !== 'Pending'
                        ? `Reviewed by ${searchedRecord.reviewedBy || 'Farah Yasmin'}`
                        : 'Currently under committee evaluation'}
                    </p>
                    <p className="text-[10.5px] text-[#94a3b8]">Category capacity check</p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] space-y-1 relative">
                    <div
                      className={`flex items-center gap-2 font-bold text-xs ${
                        searchedRecord.status === 'Approved'
                          ? 'text-emerald-600'
                          : searchedRecord.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {searchedRecord.status === 'Approved' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : searchedRecord.status === 'Rejected' ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      <span>3. Final Ingress Decision</span>
                    </div>
                    <p className="text-[11px] text-[#64748b]">
                      {searchedRecord.status === 'Approved'
                        ? 'Booth slot secured & pass issued'
                        : searchedRecord.status === 'Rejected'
                        ? 'Application declined (waitlisted)'
                        : 'Pending final sign-off'}
                    </p>
                    <p className="text-[10.5px] text-[#94a3b8]">Gate 2 Balai Berita</p>
                  </div>
                </div>
              </div>

              {/* Application Details Summary */}
              <div className="p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  Logistics & Allocation Details
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
                    <span className="text-[#64748b] block text-[11px]">Carnival Month</span>
                    <span className="font-bold text-[#0f172a]">{searchedRecord.preferredMonth}</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
                    <span className="text-[#64748b] block text-[11px]">Sales Category</span>
                    <span className="font-bold text-[#0f172a]">{searchedRecord.salesItemType}</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
                    <span className="text-[#64748b] block text-[11px]">Table Allocation</span>
                    <span className="font-bold text-[#0f172a]">1 Standard (3' x 3')</span>
                  </div>
                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0]">
                    <span className="text-[#64748b] block text-[11px]">Chair Allocation</span>
                    <span className="font-bold text-[#16a34a]">{searchedRecord.chairQuantity}</span>
                  </div>
                </div>

                {searchedRecord.specifiedItemDescription && (
                  <div className="bg-[#f8fafc] p-3.5 rounded-lg border border-[#e2e8f0] text-xs">
                    <span className="text-[#64748b] block text-[11px] font-semibold">
                      Specified Goods / Services Description:
                    </span>
                    <span className="font-medium text-[#0f172a]">
                      {searchedRecord.specifiedItemDescription}
                    </span>
                  </div>
                )}

                {searchedRecord.status === 'Rejected' && searchedRecord.rejectionReason && (
                  <div className="bg-[#fef2f2] p-4 rounded-xl border border-[#fecaca] text-xs space-y-1">
                    <span className="font-bold text-[#991b1b] block">
                      Reason for Application Decision:
                    </span>
                    <p className="text-[#b91c1c]">{searchedRecord.rejectionReason}</p>
                    <p className="text-[11px] text-[#7f1d1d] pt-1">
                      Note: Your profile remains active in Media Prima HR vendor repository for upcoming bazaar cycles.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#fef2f2] text-[#d61b22] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0f172a]">
                No Application Found for "{searchQuery}"
              </h3>
              <p className="text-xs text-[#64748b] max-w-md mx-auto">
                Please double check your Reference Code (e.g. MPB-HR-2025-001) or IC Number without dashes. If you have not submitted yet, register now.
              </p>
              <button
                onClick={onNavigateToRegister}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d61b22] text-white text-xs font-semibold cursor-pointer"
              >
                <span>Submit New Registration</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
