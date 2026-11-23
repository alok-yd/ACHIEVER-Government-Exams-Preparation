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
- Firebase Analytics for supported browsers
- Firebase Hosting site: `achiever-9db94-e3f10`
- Lucide icons and responsive custom CSS

## Firebase project

This application is connected to its own Firebase project:

| Setting | Value |
|---|---|
| Firebase project ID | `achiever-9db94` |
| Web app auth domain | `achiever-9db94.firebaseapp.com` |
| Storage bucket | `achiever-9db94.firebasestorage.app` |
| Hosting site / deploy target | `achiever-9db94-e3f10` |
| Analytics measurement ID | `G-49L717CE41` |

The Firebase web configuration is supplied through Vite environment variables. The checked-in `.env.example` contains this app's public Firebase client configuration; create `.env.local` from it for local development. Do not add service-account JSON, admin credentials, or private third-party API keys to frontend files.

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Install dependencies: `npm install`.
4. Start the app: `npm run dev`.

The app initializes Firebase Authentication, Firestore and Storage when all required client configuration is present. Analytics initializes only when a browser reports Firebase Analytics support and a measurement ID is configured.

## Firebase Console checklist

Before using real student accounts, confirm the following in project `achiever-9db94`:

1. Authentication providers: enable Google, Email/Password and Phone.
2. Authentication settings: add the production Firebase Hosting domain and any development/preview domains to Authorized domains; configure Phone Auth reCAPTCHA and SMS settings.
3. Firestore: create the Cloud Firestore database in Native mode and the intended location.
4. Storage: initialize the default Cloud Storage for Firebase bucket.
5. Analytics: confirm the Web data stream associated with measurement ID `G-49L717CE41` is active.
6. Review the Firestore and Storage rules before opening registration to students.

The Firebase API key in this web configuration is a Firebase client identifier, not an authorization mechanism. Restrict its allowed APIs as appropriate. Firestore and Storage access must be protected by Security Rules; never make student records public.

## Firebase CLI and Hosting deployment

Install the Firebase CLI and authenticate with the Google account that has access to project `achiever-9db94`:

```bash
npm install -g firebase-tools
firebase login
firebase projects:list
```

The repository includes `.firebaserc` with the default project and the Hosting deploy-target mapping. The Hosting site `achiever-9db94-e3f10` must already exist in the project. Check it with:

```bash
firebase hosting:sites:list --project achiever-9db94
```

If the site exists but the local deploy-target mapping needs to be refreshed, run this from the repository root:

```bash
firebase target:apply hosting achiever-9db94-e3f10 achiever-9db94-e3f10
```

Build and deploy only the ACHIEVER Hosting site:

```bash
npm install
npm run build
firebase deploy --only hosting:achiever-9db94-e3f10
```

The equivalent npm script is `npm run firebase:deploy`. Vite outputs the deployable site to `dist`, and the Hosting rewrite routes client-side React Router paths to `index.html`.

To deploy the repository's Firestore and Storage rules separately after confirming the database and bucket are initialized:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

Or run `npm run firebase:deploy:rules`.

## Render / other hosting providers

For a non-Firebase Vite deployment, set the same `VITE_FIREBASE_*` values from `.env.example` in that provider's environment-variable settings. Use `npm install` and `npm run build`, with `dist` as the output directory. Firebase Hosting and Render are independent deployment targets; deploying to one does not deploy to the other.

## Data and security

- Use a separate Firebase project, database, Storage bucket, environment variables, and deployment target.
- All student records are scoped under `users/{uid}`.
- Never put service-account keys or private API keys in frontend environment variables.
- Deploy Firestore and Storage rules before enabling real student accounts.

## Project documents

- [Feature parity matrix](docs/FEATURE_PARITY_MATRIX.md)
- [Architecture and setup](docs/ARCHITECTURE.md)
