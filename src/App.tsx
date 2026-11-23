import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { listEnrollments } from "./lib/studentData";
import AuthScreen from "./components/AuthScreen";
import AppShell from "./components/AppShell";
import JarvisButton from "./components/JarvisButton";
import { DashboardPage, ExamCatalogPage, FeaturePage, OnboardingRoute, PlannerPage, RoadmapPage } from "./pages/WorkspacePages";
import type { ExamEnrollment } from "./types";

const plannedModules: Record<string, { title: string; description: string; phase: string }> = {
  "/focus": { title: "AI Focus", description: "Focused study sessions, presence verification and timer workflows adapted from ACHIEVER GATE.", phase: "Phase 2 — Focus and study-session tracking" },
  "/tracker": { title: "Study Tracker", description: "A durable record of daily, weekly, monthly and subject-wise study time.", phase: "Phase 2 — Focus and study-session tracking" },
  "/pyq-tracker": { title: "PYQ Execution Tracker", description: "Previous-year question attempts organized by examination, year, subject and topic.", phase: "Phase 3 — Practice and question tracking" },
  "/tests": { title: "Test Performance", description: "Exam-pattern mock tests, scoring, accuracy, speed and performance analysis.", phase: "Phase 3 — Practice and mock tests" },
  "/revision": { title: "Revision", description: "Spaced revision, weak-topic queues and error-based review.", phase: "Phase 4 — Revision system" },
  "/health": { title: "Health Tracker", description: "Private health, hydration, sleep, activity and consistency tracking.", phase: "Phase 4 — Personal growth and health" },
  "/speaking": { title: "Speaking Coach", description: "Spoken communication, confidence-building and interview preparation.", phase: "Phase 4 — Personal growth and communication" },
  "/community": { title: "Community", description: "Student discussion spaces and shared learning resources.", phase: "Phase 5 — Community and resources" },
  "/mentor": { title: "AI Mentor", description: "An examination-aware AI mentor grounded in your preparation records.", phase: "Phase 6 — AI intelligence" },
  "/analytics": { title: "AI Analytics", description: "Evidence-based preparation insights and exam-specific progress trends.", phase: "Phase 6 — AI intelligence" },
  "/ai-native": { title: "AI Native", description: "The AI Native workflows from the ACHIEVER GATE reference application.", phase: "Phase 6 — AI intelligence" },
  "/strategy": { title: "Strategy & Tips", description: "Verified, examination-specific preparation strategies and tips.", phase: "Phase 6 — AI intelligence" }
};

function LoadingScreen() {
  return <main className="loading-screen"><div className="loading-mark"><ShieldCheck size={28}/></div><LoaderCircle className="spin" size={22}/><p>Restoring your secure ACHIEVER session…</p></main>;
}

function SignedInApp() {
  const { user } = useAuth();
  const location = useLocation();
  const [enrollments, setEnrollments] = useState<ExamEnrollment[]>([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [activeId, setActiveId] = useState("");
  const [loadError, setLoadError] = useState("");

  const reload = useCallback(async () => {
    if (!user) return;
    setLoadingEnrollments(true);
    setLoadError("");
    try {
      const saved = await listEnrollments(user.uid);
      setEnrollments(saved);
      setActiveId((current) => saved.some((item) => item.id === current)
        ? current
        : saved.find((item) => item.isPrimary)?.id ?? saved[0]?.id ?? "");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load saved examinations.");
    } finally {
      setLoadingEnrollments(false);
    }
  }, [user]);

  useEffect(() => { void reload(); }, [reload]);
  const activeEnrollment = useMemo(
    () => enrollments.find((item) => item.id === activeId) ?? enrollments[0] ?? null,
    [enrollments, activeId]
  );

  if (loadingEnrollments) return <LoadingScreen/>;

  const noEnrollment = enrollments.length === 0;
  if (noEnrollment && location.pathname !== "/catalog" && location.pathname !== "/onboarding") {
    return <OnboardingRoute onCreated={reload} isFirstEnrollment/>;
  }

  return <AppShell>
    {loadError && <div className="global-error" role="alert">{loadError}</div>}
    <Routes>
      <Route path="/" element={noEnrollment ? <Navigate to="/onboarding" replace/> : <DashboardPage enrollments={enrollments} activeEnrollment={activeEnrollment} onSelectEnrollment={setActiveId}/>}/>
      <Route path="/catalog" element={<ExamCatalogPage/>}/>
      <Route path="/onboarding" element={<OnboardingRoute onCreated={reload} isFirstEnrollment={noEnrollment}/>}/>
      <Route path="/roadmap" element={<RoadmapPage activeEnrollment={activeEnrollment}/>}/>
      <Route path="/planner" element={<PlannerPage activeEnrollment={activeEnrollment}/>}/>
      {Object.entries(plannedModules).map(([path, module]) => <Route key={path} path={path} element={<FeaturePage {...module}/>}/>)}
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
    <JarvisButton/>
  </AppShell>;
}

export default function App() {
  const { user, loading, configured } = useAuth();
  if (!configured) return <AuthScreen/>;
  if (loading) return <LoadingScreen/>;
  if (!user) return <AuthScreen/>;
  return <SignedInApp/>;
}
