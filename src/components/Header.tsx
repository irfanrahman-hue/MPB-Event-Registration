import React from 'react';
import { AdminUser } from '../types';
import { LogOut } from 'lucide-react';
import { MediaPrimaLogo } from './MediaPrimaLogo';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  adminUser: AdminUser | null;
  onLogout: () => void;
  pendingCount: number;
  outboxCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  adminUser,
  onLogout,
  pendingCount,
  outboxCount,
}) => {
  return (
    <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          {/* Left: Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => onTabChange('registration')}
            title="Bazar Seloka Vendor Portal"
          >
            {/* Official Media Prima Logo */}
            <MediaPrimaLogo className="h-9 sm:h-10" />

            <div className="h-8 w-px bg-[#e2e8f0] hidden sm:block"></div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-[#0f172a] text-base sm:text-lg tracking-tight font-display">
                  Bazar Seloka
                </span>
                <span className="font-extrabold text-[#d61b22] text-base sm:text-lg font-display">
                  Vendor Portal
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-wide text-[#64748b] mt-1">
                Powered by Group Human Resources
              </span>
            </div>
          </div>

          {/* Center: Navigation Links matching screenshot */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onTabChange('registration')}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all ${
                currentTab === 'registration'
                  ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
              }`}
            >
              Registration Form
            </button>

            <button
              onClick={() => onTabChange('crew-staff')}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all ${
                currentTab === 'crew-staff'
                  ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
              }`}
            >
              Crew Registration
            </button>

            <button
              onClick={() => onTabChange('status-tracker')}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all ${
                currentTab === 'status-tracker'
                  ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
              }`}
            >
              Check Status
            </button>

            {!adminUser ? (
              <button
                onClick={() => onTabChange('admin-login')}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all ${
                  currentTab === 'admin-login'
                    ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                Admin Login
              </button>
            ) : null}

            <button
              onClick={() => onTabChange('approval-center')}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'approval-center'
                  ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
              }`}
            >
              <span>Approval Center</span>
              {pendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#fef2f2] text-[#d61b22] border border-[#fecaca] text-[11px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('simulated-outbox')}
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'simulated-outbox'
                  ? 'bg-[#eceef0] text-[#0f172a] font-semibold shadow-2xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
              }`}
            >
              <span>Simulated Outbox</span>
              {outboxCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] text-[11px] font-medium">
                  {outboxCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right: Farah Yasmin & Super Admin Pill */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5 pl-2 py-1 pr-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0]">
              <img
                src={adminUser?.avatar || '/src/assets/images/avatar_farah_yasmin_1790664312696.jpg'}
                alt="Farah Yasmin"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-[#cbd5e1]"
                onError={(e) => {
                  // Fallback avatar icon
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
                <span className="text-[13px] font-semibold text-[#0f172a]">
                  Farah Yasmin
                </span>
                <span className="text-[11px] text-[#64748b]">
                  HR Lead
                </span>
              </div>

              {/* Super Admin Tag Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8edfc] border border-[#d0dcfc]">
                <span className="w-2 h-2 rounded-full bg-[#d61b22] inline-block animate-pulse"></span>
                <span className="text-[11px] font-semibold text-[#3b4975]">
                  Super Admin
                </span>
              </div>
            </div>

            {adminUser && (
              <button
                onClick={onLogout}
                title="Sign out as Super Admin"
                className="p-2 text-[#64748b] hover:text-[#d61b22] hover:bg-[#fef2f2] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-[#f1f5f9] scrollbar-none">
          <button
            onClick={() => onTabChange('registration')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              currentTab === 'registration'
                ? 'bg-[#d61b22] text-white font-semibold'
                : 'bg-white text-[#475569] border border-[#e2e8f0]'
            }`}
          >
            Registration Form
          </button>
          <button
            onClick={() => onTabChange('crew-staff')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              currentTab === 'crew-staff'
                ? 'bg-[#d61b22] text-white font-semibold'
                : 'bg-white text-[#475569] border border-[#e2e8f0]'
            }`}
          >
            Crew Registration
          </button>
          <button
            onClick={() => onTabChange('status-tracker')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              currentTab === 'status-tracker'
                ? 'bg-[#d61b22] text-white font-semibold'
                : 'bg-white text-[#475569] border border-[#e2e8f0]'
            }`}
          >
            Check Status
          </button>
          {!adminUser && (
            <button
              onClick={() => onTabChange('admin-login')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                currentTab === 'admin-login'
                  ? 'bg-[#d61b22] text-white font-semibold'
                  : 'bg-white text-[#475569] border border-[#e2e8f0]'
              }`}
            >
              Admin Login
            </button>
          )}
          <button
            onClick={() => onTabChange('approval-center')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentTab === 'approval-center'
                ? 'bg-[#d61b22] text-white font-semibold'
                : 'bg-white text-[#475569] border border-[#e2e8f0]'
            }`}
          >
            <span>Approval ({pendingCount})</span>
          </button>
          <button
            onClick={() => onTabChange('simulated-outbox')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
              currentTab === 'simulated-outbox'
                ? 'bg-[#d61b22] text-white font-semibold'
                : 'bg-white text-[#475569] border border-[#e2e8f0]'
            }`}
          >
            Outbox ({outboxCount})
          </button>
        </div>
      </div>
    </header>
  );
};
