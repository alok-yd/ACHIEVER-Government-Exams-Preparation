# Architecture and setup

## Independence boundary

This repository is a separate product. The ACHIEVER GATE repository is inspected read-only for design and feature reference. This application must use its own Firebase project, Authentication configuration, Firestore database, Storage bucket, environment variables, and deployment target. Never copy GATE production user records or point this app at the GATE Firebase project.

## Current foundation

- React 19 + TypeScript + Vite.
- React Router for client-side routes.
- Firebase Authentication: Google popup, email/password verification, and phone OTP.
- Cloud Firestore: profiles, exam enrollments, roadmaps and planner tasks under users/{uid}.
- Firebase Storage rules reserve private per-user upload paths.
- Lucide icons and responsive custom CSS.

## Firebase setup

1. Create a new Firebase project solely for ACHIEVER Government Exams.
2. Register a new Web App in that project.
3. Enable Google, Email/Password and Phone sign-in providers.
4. Configure the app's authorized domains and Phone Auth reCAPTCHA/SMS settings.
5. Copy .env.example to .env.local and enter the new Web App's configuration.
6. Deploy firestore.rules and storage.rules before enabling real student accounts:
   - firebase deploy --only firestore:rules,firestore:indexes
   - firebase deploy --only storage
7. Never commit .env.local, service account JSON, admin credentials, or private API keys.

The web Firebase configuration is a client identifier, not an authorization boundary. Firestore and Storage rules enforce data access. Do not put service-account credentials in Vite variables.

## Local development

    npm install
    npm run dev

Type-check and production build:

    npm run typecheck
    npm run build

## Data model

- users/{uid}: minimal profile metadata.
- users/{uid}/examEnrollments/{enrollmentId}: exam choice and student-specific target/preferences.
- users/{uid}/roadmaps/{enrollmentId}: the student's editable roadmap.
- users/{uid}/plannerTasks/{taskId}: user-created and roadmap-linked tasks.
- Future feature collections remain under the same UID boundary.

The initial roadmap is an editable starter template, not an official syllabus. Before showing exam eligibility, dates, marks or complete syllabus claims, add verified content with official source URLs and revision dates.

## Implementation status

Phase 1 establishes the independent app, authentication, exam selection, Firestore persistence, dashboard, editable roadmap and planner. AI Focus, Study Tracker, PYQ, Health, Speaking Coach, Community, Tests, Revision, Mentor, Analytics, AI Native and J.A.R.V.I.S. integrations remain in the feature-parity backlog until each has its real data flow and tests.
