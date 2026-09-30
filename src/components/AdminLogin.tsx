import React, { useState } from 'react';
import { AdminUser } from '../types';
import { DEFAULT_ADMIN } from '../data/initialData';
import { Lock, Mail, KeyRound, AlertCircle, Shield, Check, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Valid credentials check as defined in PRD
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      const isValidUser =
        (cleanEmail === 'admin@mediaprima.com.my' || cleanEmail === 'farah.yasmin@mediaprima.com.my') &&
        (cleanPass === 'admin123' || cleanPass === 'password123' || cleanPass === 'Password123');

      if (isValidUser) {
        setIsLoading(false);
        onLoginSuccess(DEFAULT_ADMIN);
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Please verify your admin email and password.');
      }
    }, 300);
  };

  const handleQuickFill = () => {
    setEmail('admin@mediaprima.com.my');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header with Media Prima Emblem */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#d61b22] text-white flex items-center justify-center font-black text-xl mx-auto shadow-sm">
            <span>M</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-display">
              Super Admin Authentication
            </h2>
            <p className="text-xs text-[#64748b]">
              Media Prima Berhad Human Resources Portal Management
            </p>
          </div>
        </div>

        {/* Credentials Tip Callout */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0f172a] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#d61b22]" />
              Authorized Credentials
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] font-bold text-[#d61b22] hover:text-[#b9141a] hover:underline cursor-pointer"
            >
              1-Click Auto Fill
            </button>
          </div>
          <div className="text-[11px] text-[#475569] font-mono bg-white p-2 rounded border border-[#cbd5e1] space-y-0.5">
            <div>Email: <span className="font-semibold text-[#0f172a]">admin@mediaprima.com.my</span></div>
            <div>Password: <span className="font-semibold text-[#0f172a]">admin123</span></div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0f172a]">
              Admin Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mediaprima.com.my"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#0f172a]">
                Admin Password
              </label>
              <span className="text-[11px] text-[#64748b]">Case sensitive</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#cbd5e1] rounded-lg focus:border-[#d61b22] focus:ring-2 focus:ring-[#d61b22]/15 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#d61b22] hover:bg-[#b9141a] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Login to Admin Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            ← Return to Public Vendor Registration Form
          </button>
        </div>
      </div>
    </div>
  );
};
