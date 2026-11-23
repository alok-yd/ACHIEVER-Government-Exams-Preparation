import { useMemo, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import { EXAMS, createStarterRoadmap } from "../data/exams";
import { saveEnrollment, saveRoadmap } from "../lib/studentData";
import { useAuth } from "../context/AuthContext";
import type { PreparationLevel } from "../types";

export default function Onboarding({ onCreated, isFirstEnrollment }: { onCreated: () => Promise<void>; isFirstEnrollment: boolean }) {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [examId, setExamId] = useState(searchParams.get("exam") ?? "ssc-cgl");
  const [cycle, setCycle] = useState("2027");
  const [targetDate, setTargetDate] = useState("");
  const [dailyHours, setDailyHours] = useState(6);
  const [level, setLevel] = useState<PreparationLevel>("Beginner");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const exam = useMemo(() => EXAMS.find((item) => item.id === examId) ?? EXAMS[0], [examId]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || busy) return;
    setBusy(true);
    setError("");
    try {
      const enrollment = await saveEnrollment(user.uid, {
        examId: exam.id,
        examName: exam.name,
        shortName: exam.shortName,
        category: exam.category,
        level: exam.level,
        cycle: cycle.trim() || "To be decided",
        targetDate,
        dailyHours,
        preparationLevel: level,
        isPrimary: isFirstEnrollment
      });
      await saveRoadmap(user.uid, {
        enrollmentId: enrollment.id,
        examId: exam.id,
        tasks: createStarterRoadmap(exam.id)
      });
      await onCreated();
      navigate("/", { replace: true });
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Could not save your examination preferences.");
    } finally {
      setBusy(false);
    }
  };

  return <main className="onboarding-screen"><div className="onboarding-card">
    <div className="step-kicker">{isFirstEnrollment ? "STEP 1 OF 1 · PERSONALIZE YOUR PREPARATION" : "ADD AN EXAMINATION · PERSONALIZE THIS TARGET"}</div>
    <div className="onboarding-heading"><div className="icon-tile"><Target/></div><div><h1>{isFirstEnrollment ? "Choose your target examination" : "Add another examination"}</h1><p>Your roadmap starts with the exam you want to achieve.</p></div></div>
    <form onSubmit={submit} className="onboarding-form">
      <label>Target examination<select value={examId} onChange={(event) => setExamId(event.target.value)}>{EXAMS.map((item) => <option key={item.id} value={item.id}>{item.shortName} — {item.name}</option>)}</select></label>
      <div className="form-grid">
        <label>Target examination cycle<input value={cycle} onChange={(event) => setCycle(event.target.value)} placeholder="e.g. 2027" required /></label>
        <label>Personal target date<input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} /></label>
        <label>Daily study availability<select value={dailyHours} onChange={(event) => setDailyHours(Number(event.target.value))}>{[2,3,4,5,6,7,8,9,10,12].map((hours) => <option key={hours} value={hours}>{hours} hours</option>)}</select></label>
        <label>Current preparation level<select value={level} onChange={(event) => setLevel(event.target.value as PreparationLevel)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
      </div>
      <div className="exam-preview"><div><span className="eyebrow">SELECTED EXAM</span><h3>{exam.shortName}</h3><p>{exam.authority} · {exam.level}{exam.state ? " · " + exam.state : ""}</p></div><a href={exam.officialWebsite} target="_blank" rel="noreferrer">Official website ↗</a></div>
      <p className="helper-note"><BookOpen size={15}/> ACHIEVER creates an editable starter roadmap. Confirm the latest official notification and syllabus before setting final study milestones.</p>
      {error && <div role="alert" className="alert alert-error">{error}</div>}
      <div className="form-footer"><button type="button" className="text-button" onClick={() => navigate("/catalog")}>Browse all exams</button><button className="primary-button" type="submit" disabled={busy}>{busy ? "Saving your plan…" : "Create my roadmap"} <ArrowRight size={17}/></button></div>
    </form>
  </div></main>;
}
