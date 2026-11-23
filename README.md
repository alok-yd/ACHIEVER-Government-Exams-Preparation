# ACHIEVER — Government Exams Preparation

**LEARN • PRACTICE • ACHIEVE**

A new, independent ACHIEVER application for Indian central and state government examination aspirants.

> ACHIEVER GATE is a read-only design and functionality reference. This repository is a separate application. It must never connect to, deploy over, or share production data with ACHIEVER GATE.

## Technology foundation

- React + TypeScript + Vite
- React Router
- Firebase Authentication (Google, email/password, phone OTP)
- Cloud Firestore for user-owned preparation data
- Firebase Storage for private student files
- Lucide icons and responsive custom CSS

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Create a **new Firebase project dedicated to this application** and fill in its web app configuration in `.env.local`.
4. Enable Google, Email/Password and Phone authentication in Firebase Authentication.
5. Configure authorized domains and Phone Auth reCAPTCHA in Firebase Console.
6. Install dependencies: `npm install`
7. Start the app: `npm run dev`

The frontend intentionally shows a configuration notice when Firebase credentials are absent. It does not simulate successful sign-in or pretend that data is cloud-persisted.

## Initial implementation scope

The first vertical slice establishes:
- Independent app shell and responsive navigation.
- Google, email/password and phone OTP sign-in.
- UID-scoped Firestore profiles and preparation records.
- Exam-first onboarding and a searchable examination catalog.
- A customizable exam roadmap and planner.
- Government exam dashboard foundation.
- Security rules, environment template, and deployment documentation.

Other ACHIEVER GATE modules are tracked in [the feature parity matrix](docs/FEATURE_PARITY_MATRIX.md) and will be implemented in subsequent phases.

## Data and security

- Use a separate Firebase project, database, Storage bucket, environment variables, and deployment target.
- All student records are scoped under `users/{uid}`.
- Never put service-account keys or private API keys in frontend environment variables.
- Deploy Firestore and Storage rules before enabling production student accounts.

## Project documents

- [Feature parity matrix](docs/FEATURE_PARITY_MATRIX.md)
- [Architecture and setup](docs/ARCHITECTURE.md)
