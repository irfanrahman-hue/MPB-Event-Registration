/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  VendorApplication,
  OutboxEmail,
  AdminUser,
  VendorStatus,
} from './types';
import {
  getStoredApplications,
  saveStoredApplications,
  getStoredOutbox,
  saveStoredOutbox,
  getStoredAuth,
  setStoredAuth,
  DEFAULT_ADMIN,
  INITIAL_APPLICATIONS,
  INITIAL_EMAILS,
} from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VendorRegistrationForm } from './components/VendorRegistrationForm';
import { AdminLogin } from './components/AdminLogin';
import { ApprovalCenter } from './components/ApprovalCenter';
import { SimulatedOutbox } from './components/SimulatedOutbox';
import { CrewStaffRegistration } from './components/CrewStaffRegistration';
import { StatusTracker } from './components/StatusTracker';

export default function App() {
  const [applications, setApplications] = useState<VendorApplication[]>(() =>
    getStoredApplications()
  );
  const [outboxEmails, setOutboxEmails] = useState<OutboxEmail[]>(() =>
    getStoredOutbox()
  );
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() =>
    getStoredAuth()
  );
  const [currentTab, setCurrentTab] = useState<string>('registration');

  // Sync state to LocalStorage
  useEffect(() => {
    saveStoredApplications(applications);
  }, [applications]);

  useEffect(() => {
    saveStoredOutbox(outboxEmails);
  }, [outboxEmails]);

  useEffect(() => {
    setStoredAuth(adminUser);
  }, [adminUser]);

  // Handle new vendor registration
  const handleNewApplication = (newApp: VendorApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  // Handle Admin status changes (Approve / Reject) with automated email generation
  const handleUpdateStatus = (
    applicationId: string,
    newStatus: VendorStatus,
    reason?: string
  ) => {
    const targetApp = applications.find((a) => a.id === applicationId);
    if (!targetApp) return;

    // Update application
    const updatedApps = applications.map((app) => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          reviewedAt: new Date().toISOString(),
          reviewedBy: adminUser?.name || 'Farah Yasmin (Super Admin)',
          rejectionReason: reason || undefined,
        };
      }
      return app;
    });
    setApplications(updatedApps);

    // If status is Approved or Rejected, generate email into Simulated Outbox as per PRD F03 & F04
    if (newStatus === 'Approved') {
      const approvalEmail: OutboxEmail = {
        id: `em-${Date.now()}`,
        applicationId: targetApp.id,
        referenceCode: targetApp.referenceCode,
        recipientEmail: targetApp.email,
        recipientName: targetApp.applicantName,
        businessName: targetApp.businessName,
        subject: `[APPROVED] Bazar Seloka 2025 Vendor Confirmation - ${targetApp.businessName} (Ref: ${targetApp.referenceCode})`,
        type: 'Approval',
        sentAt: new Date().toISOString(),
        status: 'Simulated',
        htmlBody: `
Dear ${targetApp.applicantName},

Tahniah! We are pleased to formally notify you that your vendor application for "${targetApp.businessName}" to participate in Bazar Seloka 2025 has been officially APPROVED by the Media Prima Berhad Group Human Resources Department.

Event & Allocation Summary:
• Reference Code: ${targetApp.referenceCode}
• Business / Stall: ${targetApp.businessName}
• Vendor Category: ${targetApp.vendorCategory}
• Sales Item Category: ${targetApp.salesItemType} ${targetApp.specifiedItemDescription ? `(${targetApp.specifiedItemDescription})` : ''}
• Bazar Cycle: ${targetApp.preferredMonth}
• Venue: Balai Berita Grounds, 31 Jalan Riong, Bangsar, Kuala Lumpur
• Standard Logistics: 1 Table (3' x 3') with ${targetApp.chairQuantity}

Mandatory Event Day Instructions:
1. Vendor Ingress: Ingress commences strictly at 07:30 AM. All booths must be fully set up by 08:30 AM before bazaar doors open at 09:00 AM.
2. Ingress Gate: Please enter via Gate 2, Balai Berita, Jalan Riong. Security will check your Reference Code (${targetApp.referenceCode}).
3. Vendor Access Passes: 2 official vendor tags will be issued at the Group HR Information Desk upon check-in.
4. Food & Safety Compliance: ${targetApp.salesItemType.includes('Food') ? 'All food handlers must maintain hairnets, gloves, and valid typhoid vaccine certificates.' : 'All goods must comply with MPB safety standards.'}

If you have any logistics inquiries or require additional electrical points, please reply directly or contact Group Human Resources at grouphr@mediaprima.com.my.

Warm regards,
Farah Yasmin
Head of Group Human Resources & Employee Engagement
Media Prima Berhad
        `.trim(),
      };

      setOutboxEmails((prev) => [approvalEmail, ...prev]);
    } else if (newStatus === 'Rejected') {
      const rejectionEmail: OutboxEmail = {
        id: `em-${Date.now()}`,
        applicationId: targetApp.id,
        referenceCode: targetApp.referenceCode,
        recipientEmail: targetApp.email,
        recipientName: targetApp.applicantName,
        businessName: targetApp.businessName,
        subject: `[UPDATE] Bazar Seloka 2025 Vendor Application Status - ${targetApp.businessName} (Ref: ${targetApp.referenceCode})`,
        type: 'Rejection',
        sentAt: new Date().toISOString(),
        status: 'Simulated',
        htmlBody: `
Dear ${targetApp.applicantName},

Thank you for your interest in participating as a vendor at Bazar Seloka 2025 with "${targetApp.businessName}".

Due to high demand and space capacity limitations at the Balai Berita Grounds for the selected event cycle (${targetApp.preferredMonth}), we regret to inform you that we are unable to allocate a booth slot for your business at this time.

Reason / Committee Note:
${reason || 'Category capacity reached for the requested bazaar cycle.'}

We have retained your company profile in our vendor repository and will prioritize your application for subsequent quarters and Media Prima events.

Warm regards,
Farah Yasmin
Media Prima Berhad Group Human Resources Committee
        `.trim(),
      };

      setOutboxEmails((prev) => [rejectionEmail, ...prev]);
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setCurrentTab('approval-center');
  };

  const handleLogout = () => {
    setAdminUser(null);
    setCurrentTab('registration');
  };

  const handleClearOutbox = () => {
    setOutboxEmails([]);
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (window.confirm('Reset all applications and outbox to the initial demo records?')) {
      setApplications(INITIAL_APPLICATIONS);
      setOutboxEmails(INITIAL_EMAILS);
      saveStoredApplications(INITIAL_APPLICATIONS);
      saveStoredOutbox(INITIAL_EMAILS);
    }
  };

  const pendingCount = applications.filter((a) => a.status === 'Pending').length;
  const outboxCount = outboxEmails.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (tab === 'approval-center' && !adminUser) {
            // Auto login as Farah Yasmin (Super Admin) or direct to login
            setAdminUser(DEFAULT_ADMIN);
          }
          setCurrentTab(tab);
        }}
        adminUser={adminUser}
        onLogout={handleLogout}
        pendingCount={pendingCount}
        outboxCount={outboxCount}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1">
        {currentTab === 'registration' && (
          <VendorRegistrationForm
            onSubmitSuccess={handleNewApplication}
            onNavigateToDashboard={() => {
              if (!adminUser) setAdminUser(DEFAULT_ADMIN);
              setCurrentTab('approval-center');
            }}
            onNavigateToStatus={() => setCurrentTab('status-tracker')}
          />
        )}

        {currentTab === 'status-tracker' && (
          <StatusTracker
            applications={applications}
            onNavigateToRegister={() => setCurrentTab('registration')}
          />
        )}

        {currentTab === 'crew-staff' && (
          <CrewStaffRegistration
            onSubmitSuccess={handleNewApplication}
            onNavigateToDashboard={() => {
              if (!adminUser) setAdminUser(DEFAULT_ADMIN);
              setCurrentTab('approval-center');
            }}
          />
        )}

        {currentTab === 'admin-login' && (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => setCurrentTab('registration')}
          />
        )}

        {currentTab === 'approval-center' && (
          <ApprovalCenter
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onViewOutbox={() => setCurrentTab('simulated-outbox')}
          />
        )}

        {currentTab === 'simulated-outbox' && (
          <SimulatedOutbox
            emails={outboxEmails}
            onClearOutbox={handleClearOutbox}
            onNavigateToApproval={() => setCurrentTab('approval-center')}
          />
        )}
      </main>

      {/* Floating Demo Reset Helper at bottom right */}
      <div className="fixed bottom-4 right-4 z-20">
        <button
          onClick={handleResetData}
          title="Reset back to initial 2 synthetic vendor records"
          className="text-[11px] font-medium bg-white/90 hover:bg-white text-[#64748b] hover:text-[#0f172a] px-3 py-1.5 rounded-full border border-[#cbd5e1] shadow-xs backdrop-blur-xs transition-colors cursor-pointer"
        >
          ↻ Reset Demo Data
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
