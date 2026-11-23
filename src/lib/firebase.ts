import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const env = import.meta.env;

const config: FirebaseOptions = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined
};

const requiredConfigValues = [
  config.apiKey,
  config.authDomain,
  config.projectId,
  config.storageBucket,
  config.messagingSenderId,
  config.appId
];

export const firebaseConfigured = requiredConfigValues.every(
  (value) => typeof value === "string" && value.trim().length > 0
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

if (firebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Analytics is browser-only and may be unavailable in private or restricted contexts.
  // Auth, Firestore and Storage remain usable when Analytics is unsupported or blocked.
  if (typeof window !== "undefined" && config.measurementId) {
    void isSupported()
      .then((supported) => {
        if (supported && app) analytics = getAnalytics(app);
      })
      .catch((error: unknown) => {
        console.info("[ACHIEVER] Firebase Analytics is unavailable in this browser.", error);
      });
  }
}

export { app, auth, db, storage, analytics };
