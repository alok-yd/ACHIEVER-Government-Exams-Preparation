import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureProfile(user: User) {
  if (!db) return;
  const reference = doc(db, "users", user.uid);
  const snapshot = await getDoc(reference);
  const profile = {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    photoURL: user.photoURL ?? "",
    updatedAt: serverTimestamp(),
    lastSignInAt: serverTimestamp()
  };
  if (snapshot.exists()) {
    await setDoc(reference, profile, { merge: true });
  } else {
    await setDoc(reference, { ...profile, createdAt: serverTimestamp() });
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    const authInstance = auth;
    if (!authInstance) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(authInstance, async (nextUser) => {
      if (!nextUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const usesPassword = nextUser.providerData.some((provider) => provider.providerId === "password");
      if (usesPassword && !nextUser.emailVerified) {
        setUser(null);
        setLoading(false);
        await signOut(authInstance);
        return;
      }
      try {
        await ensureProfile(nextUser);
      } catch (error) {
        console.error("[ACHIEVER] Profile preparation failed.", error);
      } finally {
        setUser(nextUser);
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    configured: firebaseConfigured,
    signOutUser: async () => {
      if (auth) await signOut(auth);
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
