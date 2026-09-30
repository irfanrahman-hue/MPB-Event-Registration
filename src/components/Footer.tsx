import React from 'react';
import { MediaPrimaLogo } from './MediaPrimaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] py-6 sm:py-8 mt-12 text-[#64748b] text-[13px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left flex-wrap">
            <MediaPrimaLogo className="h-7" />
            <div className="flex flex-col text-left">
              <span className="text-[#0f172a] font-bold text-xs sm:text-sm">
                Bazar Seloka Vendor Portal
              </span>
              <span className="text-[11px] text-[#64748b]">
                Powered by Group Human Resources • Media Prima Berhad © 2025
              </span>
            </div>
            <span className="hidden lg:inline text-[#cbd5e1]">|</span>
            <span className="hidden lg:inline text-[11px] text-[#64748b]">
              Balai Berita, 31 Jalan Riong, 59100 Kuala Lumpur, Malaysia
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-[13px]">
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#d61b22] transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-[#cbd5e1]">•</span>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#d61b22] transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-[#cbd5e1]">•</span>
            <a
              href="#integrity"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#d61b22] transition-colors"
            >
              Group HR Helpdesk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
