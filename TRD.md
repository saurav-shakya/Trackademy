# Technical Requirements Document (TRD)

## 1. Tech Stack

### Frontend
- Framework: Next.js
- Deployment: Vercel
- Styling: Tailwind CSS
- State Management: React Query / Zustand

---

### Backend
- Platform: Firebase
- Services:
  - Firebase Authentication
  - Firebase Functions (API logic)
  - Firebase Firestore (optional real-time layer)

---

### Database
- Supabase (PostgreSQL)

---

### Storage
- Supabase Storage (documents, certificates)

---

## 2. Architecture

Frontend (Vercel - Next.js)
        ↓
Firebase (Auth + Functions)
        ↓
Supabase (DB + Storage)

---

## 3. Core Modules

### 3.1 Authentication
- Firebase Auth
- Email/password login
- Role-based access

---

### 3.2 Role-Based Access Control (RBAC)
Roles:
- Student
- Faculty
- HOD
- Admin

---

### 3.3 Activity Management
- Create activity
- Update status
- Fetch activity details

---

### 3.4 Approval Workflow Engine
State transitions:
- submitted
- faculty_approved
- hod_approved
- admin_approved
- rejected

---

### 3.5 Document Management
- Upload files to Supabase Storage
- Store file URLs in DB

---

### 3.6 Notification System
- Firebase Cloud Messaging (optional)
- Email integration (future)

---

### 3.7 Certificate Generation
- Generate PDF via Firebase Function
- Store in Supabase Storage
- Unique verification ID

---

## 4. Database Schema

### users
- id
- name
- email
- role

---

### activities
- id
- student_id
- event_name
- description
- status
- created_at

---

### approvals
- id
- activity_id
- approved_by
- role
- status
- timestamp

---

### documents
- id
- activity_id
- file_url

---

### certificates
- id
- activity_id
- certificate_url
- verification_id

---

## 5. APIs (Firebase Functions)

### Activity
- POST /createActivity
- GET /getActivity
- GET /listActivities

---

### Approval
- POST /approveActivity
- POST /rejectActivity

---

### Certificate
- POST /generateCertificate
- GET /verifyCertificate

---

## 6. Security

- Firebase Auth (JWT-based)
- Row Level Security (Supabase)
- Secure file access
- Role validation in backend

---

## 7. Deployment

Frontend:
- Vercel

Backend:
- Firebase Functions

Database:
- Supabase PostgreSQL

Storage:
- Supabase Storage

---

## 8. Scalability

- Use Firebase Functions for serverless scaling
- Optimize queries in Supabase
- CDN for file delivery
- Caching layer (future: Redis)

---

## 9. Monitoring

- Firebase logs
- Supabase logs
- Error tracking (Sentry - optional)

---

## 10. Future Enhancements

- AI-based workflow automation
- OCR for documents
- Blockchain certificate validation
- Analytics dashboard
