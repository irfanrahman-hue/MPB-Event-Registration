# Bazar Seloka Vendor Portal
> **Media Prima Berhad • Powered by Group Human Resources**

An enterprise-grade vendor registration and administrative approval system designed for **Bazar Seloka**, hosted at Media Prima Berhad headquarters in Bangsar, Kuala Lumpur.

---

## 📌 Event Details

- **Event Name:** Bazar Seloka
- **Organizer:** Media Prima Berhad (Group Human Resources)
- **Location:** Balai Berita, Anjung Riong, 31, Jalan Riong, Bangsar, 59100 Kuala Lumpur, Malaysia
- **Operating Hours:** 10.00 am – 3.00 pm

---

## 🚀 Key Features

### 1. Multi-Step Vendor Registration Form
- **Step 1: Applicant & Business Information**
  - Full Name, IC Number (MyKad), Business/Brand Name, Email, and Phone.
  - **4 Official Vendor Categories:**
    1. `Company - Client`
    2. `HR - Vendor`
    3. `Kelab Media Prima Berhad`
    4. `Fama`
- **Step 2: Schedule & Product Offering**
  - Preferred carnival month selection.
  - Sales category selection (*Food & Beverages (F&B)*, *Apparel & Fashion*, *Crafts & Accessories*, *Services & Lifestyle*, *Others*).
  - Detailed product/service description.
- **Step 3: Logistics & Legal Compliance**
  - Standard table allocation (1 Standard Unit: 3' x 3').
  - Complimentary chair allocation options (2, 4, or 6 chairs free of charge).
  - Special requirements (e.g., 13A electrical socket point requests).
  - Personal Data Protection Act (PDPA 2010) compliance agreement.

### 2. Crew Registration
- Dedicated registration form for internal staff, event volunteers, and duty personnel under *Kelab Media Prima Berhad*.
- Generates official crew tracking codes.

### 3. Application Status Tracker
- Public inquiry portal allowing applicants to track their status using their **Reference Code** (e.g., `MPB-HR-2025-001`) or **IC Number**.
- Real-time status display: `Pending Review`, `Approved`, or `Rejected` with administrative remarks.

### 4. HR Admin Approval Center
- **Dossier & Review**: Comprehensive inspection modal for each applicant.
- **Decision Engine**: 1-click Approval or Rejection with customizable feedback reasons.
- **Multi-criteria Filtering**:
  - Filter by Vendor Category (`Company - Client`, `HR - Vendor`, `Kelab Media Prima Berhad`, `Fama`).
  - Filter by Status (`Pending`, `Approved`, `Rejected`).
  - Filter by Carnival Month.
- **Batch Processing**: Batch approve multiple applications simultaneously.
- **Data Export**: 1-click CSV export with full vendor information for event ground coordinators.

### 5. Outbox & Automated Notification Simulation
- Automatically generates official branded email confirmations upon HR decision.
- Ingress briefings, gate clearance guidelines, and logistics instructions included in approval notices.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State & Storage:** LocalStorage persistence with sample initial data

---

## 📦 Getting Started

### Prerequisites
- Node.js (version 18 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/bazar-seloka-portal.git
   cd bazar-seloka-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Linting and Type Checks:**
   ```bash
   npm run lint
   ```

---

## 📂 Project Structure

```text
├── src/
│   ├── assets/               # Brand assets & images
│   ├── components/           # UI components
│   │   ├── ApprovalCenter.tsx        # HR Admin management dashboard
│   │   ├── CrewStaffRegistration.tsx # Crew & staff registration form
│   │   ├── Header.tsx                # Corporate navigation bar
│   │   ├── MediaPrimaLogo.tsx        # Official Media Prima SVG branding
│   │   ├── OutboxModal.tsx           # Outbox email simulator
│   │   ├── StatusTracker.tsx         # Reference code / IC status search
│   │   └── VendorRegistrationForm.tsx# Multi-step vendor registration
│   ├── data/
│   │   └── initialData.ts            # Seed data & localStorage persistence
│   ├── types/
│   │   └── index.ts                  # TypeScript types & VendorCategory definitions
│   ├── App.tsx                       # Main application shell
│   ├── index.css                     # Global Tailwind CSS directives
│   └── main.tsx                      # Vite React entry point
├── public/                           # Static assets
├── index.html                        # HTML document template
├── metadata.json                     # AI Studio metadata
├── package.json                      # Project dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## 🏢 Organization & Credits

Developed for **Media Prima Berhad**  
Managed by **Group Human Resources & Employee Engagement**  
Balai Berita, Anjung Riong, 31 Jalan Riong, Bangsar, 59100 Kuala Lumpur
