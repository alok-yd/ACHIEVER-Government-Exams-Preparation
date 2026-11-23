# Architecture and setup

## Independence boundary

This repository is a separate product. The ACHIEVER GATE repository is inspected read-only for design and feature reference. This application must use its own Firebase project, Authentication configuration, Firestore database, Storage bucket, environment variables, and deployment target. Never copy GATE production user records or point this app at the GATE Firebase project.

## Current foundation

- React 19 + TypeScript + Vite.
- React Router for client-side routes.
- Firebase Authentication: Google popup, email/password verification, and phone OTP.
- Cloud Firestore: profiles, exam enrollments, roadmaps and planner tasks under users/{uid}.
- Firebase Storage rules reserve private per-user upload paths.
- Firebase Analytics initializes only in supported browser contexts.
- Lucide icons and responsive custom CSS.

## Firebase project configuration

The dedicated Firebase project is `achiever-9db94`. Its Hosting site and deploy target are both `achiever-9db94-e3f10`.

- Client config is loaded from `VITE_FIREBASE_*` variables in `src/lib/firebase.ts`.
- `.env.example` contains the supplied public web-app configuration; copy it to `.env.local` locally.
- `.firebaserc` maps the default alias to `achiever-9db94` and maps the named Hosting target to site `achiever-9db94-e3f10`.
- `firebase.json` publishes the Vite `dist` directory and rewrites client-side routes to `/index.html`.
- Analytics is optional and guarded with Firebase's browser support check so unsupported contexts do not prevent Auth, Firestore or Storage initialization.

## Firebase Console prerequisites

1. Enable Google, Email/Password and Phone sign-in providers.
2. Add the app's deployment domain(s) to Authentication Authorized domains.
3. Configure Phone Auth reCAPTCHA/SMS settings.
4. Create the Cloud Firestore database in Native mode.
5. Initialize the default Cloud Storage for Firebase bucket.
6. Confirm the Google Analytics Web stream is associated with the supplied measurement ID.

The client API key identifies the Firebase app; it does not authorize access to data. Firestore and Storage Security Rules enforce user access. Keep service-account credentials and server-only secrets out of the Vite client bundle.

## Firebase CLI setup and deployment

Install and authenticate Firebase CLI:

    npm install -g firebase-tools
    firebase login
    firebase projects:list

The checked-in `.firebaserc` already includes the project alias and deploy-target mapping. Confirm the Hosting site exists:

    firebase hosting:sites:list --project achiever-9db94

If the target association must be re-applied:

    firebase target:apply hosting achiever-9db94-e3f10 achiever-9db94-e3f10

Build and deploy Hosting:

    npm install
    npm run build
    firebase deploy --only hosting:achiever-9db94-e3f10

Equivalent npm script: `npm run firebase:deploy`.

Deploy Firestore and Storage rules only after the database and bucket have been initialized and the rules reviewed:

    firebase deploy --only firestore:rules,firestore:indexes,storage

Equivalent npm script: `npm run firebase:deploy:rules`.

For the Hosting rewrite to work, all application routes are served from the built `index.html`. Static assets are served from `dist`.

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
