import React, { useState } from 'react';
import { OutboxEmail } from '../types';
import {
  Mail,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Trash2,
  Building2,
  Calendar,
  Shield,
  Send,
  UserCheck,
} from 'lucide-react';

interface SimulatedOutboxProps {
  emails: OutboxEmail[];
  onClearOutbox: () => void;
  onNavigateToApproval: () => void;
}

export const SimulatedOutbox: React.FC<SimulatedOutboxProps> = ({
  emails,
  onClearOutbox,
  onNavigateToApproval,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<OutboxEmail | null>(
    emails.length > 0 ? emails[0] : null
  );

  const filteredEmails = emails.filter((em) => {
    return (
      em.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Automated Dispatch Monitor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-display tracking-tight mt-1">
            Simulated Email Outbox
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748b]">
            Automated confirmation and approval notifications dispatched to vendors upon HR review. (SMTP simulated in frontend)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateToApproval}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#cbd5e1] text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors"
          >
            ← Back to Approval Center
          </button>

          {emails.length > 0 && (
            <button
              onClick={onClearOutbox}
              className="px-3.5 py-2 rounded-lg bg-white border border-[#fca5a5] text-xs font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Outbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Split: List on Left, Email Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Email List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#e2e8f0] shadow-2xs overflow-hidden flex flex-col">
          {/* Search Header */}
          <div className="p-3.5 border-b border-[#e2e8f0] bg-[#f8fafc]">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94a3b8]">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search outbox by recipient, ref code..."
                className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded-md focus:border-[#d61b22] focus:outline-none"
              />
            </div>
          </div>

          {/* List items */}
          <div className="divide-y divide-[#f1f5f9] max-h-[600px] overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center text-[#64748b] space-y-2">
                <Mail className="w-8 h-8 text-[#cbd5e1] mx-auto" />
                <p className="text-xs font-medium">No outbound emails logged yet.</p>
                <p className="text-[11px] text-[#94a3b8]">
                  Approve an application in the Approval Center to generate an automated confirmation email!
                </p>
                <button
                  onClick={onNavigateToApproval}
                  className="mt-2 text-xs text-[#d61b22] font-semibold hover:underline block mx-auto"
                >
                  Go to Approval Center →
                </button>
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isSelected = selectedEmail?.id === email.id;
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`p-4 cursor-pointer transition-colors text-left ${
                      isSelected
                        ? 'bg-[#fef2f2] border-l-4 border-l-[#d61b22]'
                        : 'hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#d61b22]">
                        {email.referenceCode}
                      </span>
                      <span className="text-[10.5px] text-[#64748b]">
                        {new Date(email.sentAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0f172a] truncate">
                      {email.businessName}
                    </h4>

                    <p className="text-[11.5px] text-[#475569] truncate mt-0.5">
                      To: {email.recipientName} &lt;{email.recipientEmail}&gt;
                    </p>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#f1f5f9] text-[10.5px]">
                      <span className="inline-flex items-center gap-1 text-[#10b981] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                        <span>Dispatched (Simulated)</span>
                      </span>
                      <span className="text-[#94a3b8]">
                        {new Date(email.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Email Content Preview (7 cols) */}
        <div className="lg:col-span-7">
          {selectedEmail ? (
            <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-2xs overflow-hidden">
              {/* Email Envelope Header */}
              <div className="bg-[#f8fafc] border-b border-[#e2e8f0] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">
                    <Send className="w-3 h-3" />
                    <span>Auto-Generated System Notification</span>
                  </div>
                  <span className="text-xs font-mono text-[#64748b]">
                    {new Date(selectedEmail.sentAt).toLocaleString()}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] font-display">
                  {selectedEmail.subject}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-[#475569] pt-1">
                  <div>
                    <span className="text-[#94a3b8]">From: </span>
                    <span className="font-semibold text-[#0f172a]">
                      Media Prima HR Events &lt;hrevents@mediaprima.com.my&gt;
                    </span>
                  </div>
                  <div>
                    <span className="text-[#94a3b8]">To: </span>
                    <span className="font-semibold text-[#0f172a]">
                      {selectedEmail.recipientName} &lt;{selectedEmail.recipientEmail}&gt;
                    </span>
                  </div>
                </div>
              </div>

              {/* Styled Email Letter Body */}
              <div className="p-6 sm:p-8 space-y-6 bg-white">
                {/* Email Header Banner */}
                <div className="border-b-2 border-[#d61b22] pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#d61b22] text-white flex items-center justify-center font-black text-sm">
                      M
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wider font-display">
                        Media Prima Berhad
                      </div>
                      <div className="text-[10px] text-[#64748b]">
                        Human Resources Division · Event Logistics Committee
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded">
                    {selectedEmail.referenceCode}
                  </span>
                </div>

                {/* Email Message Content */}
                <div className="text-xs sm:text-[13px] text-[#334155] leading-relaxed whitespace-pre-line font-sans space-y-4">
                  {selectedEmail.htmlBody}
                </div>

                {/* Email Footer Notice */}
                <div className="pt-6 border-t border-[#e2e8f0] text-[11px] text-[#64748b] space-y-1">
                  <p className="font-medium text-[#0f172a]">
                    Media Prima Berhad (Co. Reg. No. 200001024235)
                  </p>
                  <p>
                    Balai Berita, 31 Jalan Riong, 59100 Kuala Lumpur, Malaysia. Contact: +603-2724 8888 | www.mediaprima.com.my
                  </p>
                  <p className="text-[#94a3b8] pt-1">
                    This is an automated system confirmation generated via the MPB HR Vendor Portal. Please preserve your reference code for event check-in.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#e2e8f0] p-12 text-center text-[#64748b]">
              <Mail className="w-10 h-10 text-[#cbd5e1] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#0f172a]">Select an email from the left</p>
              <p className="text-xs text-[#64748b]">
                Click on any dispatched notification to preview the generated confirmation message.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
