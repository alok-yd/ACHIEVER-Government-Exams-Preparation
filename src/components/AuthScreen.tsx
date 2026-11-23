import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, RecaptchaVerifier,
  sendEmailVerification, signInWithEmailAndPassword, signInWithPhoneNumber,
  signInWithPopup, updateProfile, signOut, type ConfirmationResult
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { BookOpenCheck, Mail, Phone, ShieldCheck } from "lucide-react";

type AuthMode = "email" | "phone";

export default function AuthScreen() {
  const { configured } = useAuth();
  const [mode, setMode] = useState<AuthMode>("email");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const verifier = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => () => {
    verifier.current?.clear();
    verifier.current = null;
  }, []);

  const showError = (failure: unknown) => {
    const code = (failure as { code?: string })?.code ?? "";
    const messages: Record<string, string> = {
      "auth/invalid-credential": "The email/password combination is incorrect.",
      "auth/email-already-in-use": "An account already uses this email. Sign in or recover access.",
      "auth/weak-password": "Choose a password with at least 6 characters.",
      "auth/invalid-phone-number": "Enter a valid phone number with country code, for example +919876543210.",
      "auth/too-many-requests": "Too many attempts. Wait a while and try again.",
      "auth/popup-closed-by-user": "Google sign-in was closed before completion.",
      "auth/invalid-verification-code": "The OTP is incorrect. Check the latest SMS and try again.",
      "auth/account-exists-with-different-credential": "This email already uses another sign-in method. Sign in with that method first."
    };
    setError(messages[code] ?? (failure instanceof Error ? failure.message : "Authentication failed. Please try again."));
  };

  const withAuth = async (operation: () => Promise<void>) => {
    if (!auth || busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await operation();
    } catch (failure) {
      showError(failure);
    } finally {
      setBusy(false);
    }
  };

  const submitEmail = (event: FormEvent) => {
    event.preventDefault();
    void withAuth(async () => {
      if (!auth) return;
      if (creating) {
        if (!name.trim()) throw new Error("Enter your full name.");
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
        await sendEmailVerification(credential.user);
        await signOut(auth);
        setNotice("Verification email sent. Verify your email address, then return here to sign in.");
        setCreating(false);
      } else {
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
        await credential.user.reload();
        if (!credential.user.emailVerified) {
          await signOut(auth);
          throw new Error("Please verify your email before signing in. Check your inbox and spam folder.");
        }
      }
    });
  };

  const googleSignIn = () => void withAuth(async () => {
    if (!auth) return;
    await signInWithPopup(auth, new GoogleAuthProvider());
  });

  const sendOtp = () => void withAuth(async () => {
    if (!auth) return;
    const normalized = phone.replace(/[\\s()-]/g, "");
    if (!/^\\+[1-9]\\d{7,14}$/.test(normalized)) {
      throw new Error("Enter your phone number with country code, for example +919876543210.");
    }
    verifier.current?.clear();
    verifier.current = new RecaptchaVerifier(auth, "achiever-phone-recaptcha", { size: "invisible" });
    const result = await signInWithPhoneNumber(auth, normalized, verifier.current);
    setConfirmation(result);
    setNotice("OTP sent. Enter the six-digit code received on your phone.");
  });

  const verifyOtp = () => void withAuth(async () => {
    if (!confirmation) throw new Error("Request a new OTP first.");
    if (!/^\\d{6}$/.test(otp.trim())) throw new Error("Enter the 6-digit OTP.");
    await confirmation.confirm(otp.trim());
  });

  if (!configured) {
    return <main className="auth-screen"><section className="auth-card setup-card">
      <Brand />
      <div className="setup-icon"><ShieldCheck size={28} /></div>
      <h1>Connect your new Firebase project</h1>
      <p>Authentication is intentionally not simulated. Add the Web App values from the <strong>separate ACHIEVER Government Exams Firebase project</strong> to <code>.env.local</code>.</p>
      <ol><li>Copy .env.example to .env.local.</li><li>Fill in all six VITE_FIREBASE values.</li><li>Enable Google, Email/Password and Phone sign-in in Firebase Console.</li><li>Restart the Vite development server.</li></ol>
    </section></main>;
  }

  return <main className="auth-screen">
    <section className="auth-card">
      <Brand />
      <div className="auth-intro"><span className="eyebrow">YOUR PREPARATION, YOUR FUTURE</span><h1>Welcome to ACHIEVER</h1><p>Your personal workspace for government examination preparation.</p></div>
      <button className="google-button" type="button" disabled={busy} onClick={googleSignIn}><GoogleMark />Continue with Google</button>
      <div className="auth-divider"><span>or continue with</span></div>
      <div className="auth-tabs">
        <button className={mode === "email" ? "active" : ""} onClick={() => { setMode("email"); setError(""); setNotice(""); }}><Mail size={16}/> Email</button>
        <button className={mode === "phone" ? "active" : ""} onClick={() => { setMode("phone"); setError(""); setNotice(""); }}><Phone size={16}/> Mobile OTP</button>
      </div>
      {error && <div role="alert" className="alert alert-error">{error}</div>}
      {notice && <div role="status" className="alert alert-success">{notice}</div>}

      {mode === "email" ? <form onSubmit={submitEmail} className="form-stack">
        {creating && <label>Full name<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></label>}
        <label>Email address<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
        <label>Password<input type="password" autoComplete={creating ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="At least 6 characters" required /></label>
        <button className="primary-button full-width" type="submit" disabled={busy}>{busy ? "Please wait…" : creating ? "Create account" : "Sign in"}</button>
        <button className="text-button" type="button" onClick={() => { setCreating(!creating); setError(""); setNotice(""); }}>{creating ? "Already have an account? Sign in" : "New to ACHIEVER? Create an account"}</button>
      </form> : <div className="form-stack">
        <label>Mobile number<input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+919876543210" disabled={!!confirmation} /></label>
        <div id="achiever-phone-recaptcha" />
        {!confirmation ? <button className="primary-button full-width" type="button" onClick={sendOtp} disabled={busy}>{busy ? "Sending OTP…" : "Send verification code"}</button> : <>
          <label>6-digit OTP<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\\D/g, "").slice(0, 6))} placeholder="Enter OTP" /></label>
          <button className="primary-button full-width" type="button" onClick={verifyOtp} disabled={busy || otp.length !== 6}>{busy ? "Verifying…" : "Verify and continue"}</button>
          <button className="text-button" type="button" onClick={() => { setConfirmation(null); setOtp(""); verifier.current?.clear(); verifier.current = null; }}>Use a different number</button>
        </>}
      </div>}
      <p className="privacy-note"><ShieldCheck size={14}/> Your account and preparation records are stored separately from ACHIEVER GATE.</p>
    </section>
  </main>;
}

function Brand() {
  return <div className="brand-lockup"><div className="brand-mark"><BookOpenCheck size={26}/></div><div><strong>ACHIEVER</strong><span>AI LEARNING & INTELLIGENCE</span></div><small>LEARN • PRACTICE • ACHIEVE</small></div>;
}

function GoogleMark() {
  return <svg viewBox="0 0 48 48" width="19" height="19" aria-hidden="true"><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3A12 12 0 0 1 12 24a12 12 0 1 1 3.4 8.3l-5.7 5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5Z"/></svg>;
}
