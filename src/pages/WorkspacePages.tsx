import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, Clock3, ExternalLink, Plus, Search, Target, TrendingUp } from "lucide-react";
import { EXAMS, EXAM_CATEGORIES, createStarterRoadmap } from "../data/exams";
import { addPlannerTask, getRoadmap, listPlannerTasks, saveRoadmap, updatePlannerTask, updateRoadmapTasks } from "../lib/studentData";
import { useAuth } from "../context/AuthContext";
import Onboarding from "../components/Onboarding";
import type { Exam, ExamEnrollment, PlannerTask, RoadmapTask, StudentRoadmap } from "../types";

export function DashboardPage({ enrollments, activeEnrollment, onSelectEnrollment }: { enrollments: ExamEnrollment[]; activeEnrollment: ExamEnrollment | null; onSelectEnrollment: (id: string) => void }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<RoadmapTask[]>([]);
  const [planner, setPlanner] = useState<PlannerTask[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user || !activeEnrollment) { setTasks([]); setPlanner([]); return; }
    let live = true;
    Promise.all([getRoadmap(user.uid, activeEnrollment.id), listPlannerTasks(user.uid)]).then(([roadmap, saved]) => {
      if (live) { setTasks(roadmap?.tasks ?? []); setPlanner(saved); setError(""); }
    }).catch((e) => { if (live) setError(e instanceof Error ? e.message : "Could not load preparation data."); });
    return () => { live = false; };
  }, [user, activeEnrollment]);
  const completed = tasks.filter((t) => t.status === "completed").length;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const today = new Date().toLocaleDateString("en-CA");
  const dueToday = planner.filter((t) => t.date === today && !t.completed);
  const firstName = user?.displayName?.split(" ")[0] || "Student";
  return <div className="page-stack">
    <section className="welcome-banner"><div><span className="eyebrow light">YOUR PREPARATION COMMAND CENTER</span><h2>Welcome back, {firstName}.</h2><p>Small, consistent steps make big achievements possible.</p></div><div className="welcome-icon"><BookOpen size={38}/></div></section>
    {error && <div className="alert alert-error">{error}</div>}
    <section className="section-heading"><div><span className="eyebrow">YOUR TARGETS</span><h2>Examination overview</h2></div><Link to="/onboarding" className="inline-link">Add examination <ArrowRight size={15}/></Link></section>
    {enrollments.length > 1 && <label className="active-exam-control">Active examination<select value={activeEnrollment?.id ?? ""} onChange={(e) => onSelectEnrollment(e.target.value)}>{enrollments.map((e) => <option key={e.id} value={e.id}>{e.shortName} · {e.cycle}</option>)}</select></label>}
    {activeEnrollment ? <div className="exam-hero-card"><div className="exam-symbol"><Target size={24}/></div><div className="exam-hero-copy"><span className="eyebrow">{activeEnrollment.isPrimary ? "PRIMARY TARGET" : "EXAMINATION TARGET"} · {activeEnrollment.level.toUpperCase()}</span><h3>{activeEnrollment.shortName}</h3><p>{activeEnrollment.examName} · Cycle {activeEnrollment.cycle}</p></div><span className="cycle-chip">{activeEnrollment.dailyHours}h / day target</span><Link to="/roadmap" className="hero-action">Open roadmap <ArrowRight size={16}/></Link></div> : <div className="empty-state"><h3>Choose your first examination</h3><p>Your roadmap and planner will be personalized around this choice.</p><Link to="/onboarding" className="primary-button">Select an examination</Link></div>}
    <div className="metric-grid">
      <Metric label="Roadmap progress" value={progress + "%"} hint={completed + " of " + tasks.length + " milestones completed"} icon={<Target size={19}/>}/>
      <Metric label="Enrolled examinations" value={String(enrollments.length)} hint="Primary and secondary targets" icon={<BookOpen size={19}/>}/>
      <Metric label="Tasks due today" value={String(dueToday.length)} hint="Open items in your planner" icon={<CalendarDays size={19}/>}/>
      <Metric label="Study target" value={activeEnrollment ? activeEnrollment.dailyHours + "h" : "—"} hint="Your selected daily availability" icon={<Clock3 size={19}/>}/>
    </div>
    <div className="dashboard-grid">
      <section className="content-card"><div className="card-heading"><div><span className="eyebrow">NEXT STEPS</span><h3>Roadmap milestones</h3></div><Link to="/roadmap" className="small-link">View all</Link></div>
        {tasks.slice(0,4).map((t) => <div className="milestone-row" key={t.id}><span className={"task-check " + (t.status === "completed" ? "checked" : "")}>{t.status === "completed" && <Check size={13}/>}</span><div><strong>{t.title}</strong><span>{t.phase} · {t.priority} priority</span></div></div>)}
        {!tasks.length && <p className="muted-copy">Create your exam roadmap to see your first milestones here.</p>}
      </section>
      <section className="content-card"><div className="card-heading"><div><span className="eyebrow">TODAY</span><h3>Planner tasks</h3></div><Link to="/planner" className="small-link">Open planner</Link></div>
        {dueToday.slice(0,4).map((t) => <div className="planner-mini-row" key={t.id}><CalendarDays size={16}/><div><strong>{t.title}</strong><span>{t.durationMinutes} min</span></div></div>)}
        {!dueToday.length && <div className="soft-empty"><CheckCircle2 size={19}/><span>No pending tasks due today.</span></div>}
      </section>
    </div>
    <section className="section-heading"><div><span className="eyebrow">YOUR EXAMS</span><h2>All enrolled examinations</h2></div></section>
    <div className="enrollment-grid">{enrollments.map((e) => <button key={e.id} className={"enrollment-card " + (activeEnrollment?.id === e.id ? "selected" : "")} onClick={() => onSelectEnrollment(e.id)}><span>{e.category}</span><strong>{e.shortName}</strong><small>Cycle {e.cycle} · {e.dailyHours}h/day</small></button>)}</div>
  </div>;
}

export function ExamCatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [level, setLevel] = useState("All levels");
  const filtered = useMemo(() => EXAMS.filter((exam) => {
    const query = (exam.name + " " + exam.shortName + " " + exam.authority + " " + (exam.state ?? "")).toLowerCase();
    return query.includes(search.toLowerCase()) && (category === "All categories" || exam.category === category) && (level === "All levels" || exam.level === level);
  }), [search, category, level]);
  return <div className="page-stack">
    <section className="page-intro"><span className="eyebrow">DISCOVER YOUR NEXT OPPORTUNITY</span><h2>Government examination catalog</h2><p>Explore central and state recruitment examinations. Select an exam to create a personal preparation plan.</p></section>
    <div className="catalog-toolbar"><div className="search-field"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exam, authority or state"/></div><select value={category} onChange={(e) => setCategory(e.target.value)}>{EXAM_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select><select value={level} onChange={(e) => setLevel(e.target.value)}><option>All levels</option><option>Central</option><option>State</option></select></div>
    <p className="result-count">Showing {filtered.length} examinations · Catalog is expandable</p>
    <div className="catalog-grid">{filtered.map((exam) => <ExamCard exam={exam} key={exam.id}/>)}</div>
    <p className="disclaimer-note">Catalog entries are discovery starting points, not an eligibility determination. Always check the current official recruitment notification for age, qualification, dates, stages and syllabus.</p>
  </div>;
}

function ExamCard({ exam }: { exam: Exam }) {
  return <article className="exam-card"><div className="exam-card-top"><span className={"level-pill " + (exam.level === "Central" ? "central" : "state")}>{exam.level}{exam.state ? " · " + exam.state : ""}</span><span className="category-label">{exam.category}</span></div><h3>{exam.shortName}</h3><p className="exam-full-name">{exam.name}</p><p className="exam-authority">{exam.authority}</p><div className="exam-card-footer"><span>{exam.qualification}</span><Link to={"/onboarding?exam=" + exam.id} className="small-link">Build roadmap <ArrowRight size={14}/></Link></div>{exam.officialWebsite && <a className="official-link" href={exam.officialWebsite} target="_blank" rel="noreferrer">Official website <ExternalLink size={13}/></a>}</article>;
}

export function OnboardingRoute({ onCreated, isFirstEnrollment }: { onCreated: () => Promise<void>; isFirstEnrollment: boolean }) {
  return <Onboarding onCreated={onCreated} isFirstEnrollment={isFirstEnrollment}/>;
}

export function RoadmapPage({ activeEnrollment }: { activeEnrollment: ExamEnrollment | null }) {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<StudentRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user || !activeEnrollment) { setLoading(false); return; }
    let live = true;
    setLoading(true);
    getRoadmap(user.uid, activeEnrollment.id).then(async (saved) => {
      if (saved) return saved;
      const starter = { enrollmentId: activeEnrollment.id, examId: activeEnrollment.examId, tasks: createStarterRoadmap(activeEnrollment.examId) };
      await saveRoadmap(user.uid, starter);
      return starter;
    }).then((value) => { if (live) setRoadmap(value); }).catch((e) => { if (live) setError(e instanceof Error ? e.message : "Could not load roadmap."); }).finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [user, activeEnrollment]);
  const persist = async (tasks: RoadmapTask[]) => {
    if (!user || !activeEnrollment || !roadmap) return;
    setRoadmap({ ...roadmap, tasks });
    try { await updateRoadmapTasks(user.uid, activeEnrollment.id, tasks, activeEnrollment.examId); }
    catch (e) { setError(e instanceof Error ? e.message : "Roadmap save failed."); }
  };
  const toggle = (id: string) => {
    if (!roadmap) return;
    void persist(roadmap.tasks.map((t) => t.id === id ? { ...t, status: t.status === "completed" ? "pending" as const : "completed" as const } : t));
  };
  const addTask = (event: FormEvent) => {
    event.preventDefault();
    if (!roadmap || !newTitle.trim()) return;
    const task: RoadmapTask = { id: crypto.randomUUID(), title: newTitle.trim(), phase: "Personal milestone", description: "Student-created roadmap milestone.", status: "pending", priority: "Medium" };
    setNewTitle("");
    void persist([...roadmap.tasks, task]);
  };
  if (!activeEnrollment) return <EmptyExamState/>;
  const completed = roadmap?.tasks.filter((t) => t.status === "completed").length ?? 0;
  const progress = roadmap?.tasks.length ? Math.round(completed / roadmap.tasks.length * 100) : 0;
  return <div className="page-stack">
    <section className="page-intro"><span className="eyebrow">PERSONALIZED PREPARATION</span><h2>{activeEnrollment.shortName} roadmap</h2><p>Customize the milestones around your preparation level and available study time.</p></section>
    <section className="content-card progress-card"><div className="progress-card-head"><div><span className="eyebrow">YOUR ROADMAP</span><h3>{progress}% complete</h3></div><strong>{completed}/{roadmap?.tasks.length ?? 0} milestones</strong></div><div className="progress-track"><span style={{ width: progress + "%"}}/></div></section>
    {error && <div className="alert alert-error">{error}</div>}
    {loading ? <div className="content-card">Loading your roadmap…</div> : <section className="content-card"><div className="card-heading"><div><span className="eyebrow">PHASES & MILESTONES</span><h3>Preparation roadmap</h3></div></div>
      {roadmap?.tasks.map((t, index) => <div className="roadmap-task" key={t.id}><button className={"task-check large " + (t.status === "completed" ? "checked" : "")} onClick={() => toggle(t.id)} aria-label={t.status === "completed" ? "Mark incomplete" : "Mark complete"}>{t.status === "completed" && <Check size={14}/>}</button><div className="roadmap-task-body"><div className="roadmap-task-top"><span className="eyebrow">{String(index + 1).padStart(2,"0")} · {t.phase}</span><span className={"priority-pill " + t.priority.toLowerCase()}>{t.priority}</span></div><h4 className={t.status === "completed" ? "completed-text" : ""}>{t.title}</h4><p>{t.description}</p></div></div>)}
      <form className="inline-add-form" onSubmit={addTask}><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add your own milestone…" aria-label="New milestone" required/><button className="primary-button" type="submit"><Plus size={16}/> Add milestone</button></form>
    </section>}
  </div>;
}

export function PlannerPage({ activeEnrollment }: { activeEnrollment: ExamEnrollment | null }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    try { setTasks(await listPlannerTasks(user.uid)); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not load planner."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); }, [user]);
  const add = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || !title.trim()) return;
    setError("");
    try {
      const saved = await addPlannerTask(user.uid, { title: title.trim(), date, durationMinutes: duration, completed: false, examId: activeEnrollment?.examId });
      setTasks((current) => [...current, saved].sort((a,b) => a.date.localeCompare(b.date)));
      setTitle("");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not save planner task."); }
  };
  const toggle = async (task: PlannerTask) => {
    if (!user) return;
    const completed = !task.completed;
    setTasks((current) => current.map((t) => t.id === task.id ? { ...t, completed } : t));
    try { await updatePlannerTask(user.uid, task.id, { completed }); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not update task."); void refresh(); }
  };
  const grouped = tasks.reduce<Record<string, PlannerTask[]>>((acc, t) => { (acc[t.date] ??= []).push(t); return acc; }, {});
  return <div className="page-stack">
    <section className="page-intro"><span className="eyebrow">YOUR TIME, YOUR PLAN</span><h2>Study planner</h2><p>Build a realistic schedule and move unfinished work without losing your history.</p></section>
    {error && <div className="alert alert-error">{error}</div>}
    <section className="content-card"><div className="card-heading"><div><span className="eyebrow">ADD A TASK</span><h3>Plan a study session</h3></div><span className="active-exam-chip">{activeEnrollment?.shortName ?? "Personal task"}</span></div>
      <form className="planner-form" onSubmit={add}><label>Task<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Quantitative aptitude — percentages" required/></label><label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/></label><label>Duration<select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>{[30,45,60,90,120,150,180].map((v) => <option key={v} value={v}>{v} minutes</option>)}</select></label><button className="primary-button" type="submit"><Plus size={16}/> Add to planner</button></form>
    </section>
    <section className="content-card"><div className="card-heading"><div><span className="eyebrow">SAVED SCHEDULE</span><h3>Your study tasks</h3></div><span className="result-count">{tasks.filter((t) => t.completed).length}/{tasks.length} completed</span></div>
      {loading ? <p className="muted-copy">Loading your tasks…</p> : Object.keys(grouped).length ? Object.entries(grouped).map(([day, items]) => <div className="planner-day" key={day}><h4>{new Date(day + "T00:00:00").toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"short"})}</h4>{items.map((t) => <div className="planner-task-row" key={t.id}><button className={"task-check " + (t.completed ? "checked" : "")} onClick={() => void toggle(t)} aria-label="Toggle task">{t.completed && <Check size={13}/>}</button><div><strong className={t.completed ? "completed-text" : ""}>{t.title}</strong><span>{t.durationMinutes} min · {activeEnrollment && t.examId === activeEnrollment.examId ? activeEnrollment.shortName : "Personal / other exam"}</span></div><span className={"task-state " + (t.completed ? "done" : "")}>{t.completed ? "Completed" : "Planned"}</span></div>)}</div>) : <div className="soft-empty"><CalendarDays size={22}/><span>Your planner is clear. Add a task to get started.</span></div>}
    </section>
  </div>;
}

export function FeaturePage({ title, description, phase }: { title: string; description: string; phase: string }) {
  return <div className="page-stack"><section className="page-intro"><span className="eyebrow">ACHIEVER FEATURE PARITY</span><h2>{title}</h2><p>{description}</p></section><section className="content-card feature-roadmap-card"><div className="feature-icon"><TrendingUp size={22}/></div><span className="status-label">PLANNED IMPLEMENTATION</span><h3>{title} is in the feature-parity backlog</h3><p>This module is included in the ACHIEVER GATE reference scope. It will be connected to the government-exam data model in {phase}. This route is shown for navigation continuity; it is not represented as a working feature yet.</p><Link className="inline-link" to="/catalog">Explore examinations <ArrowRight size={15}/></Link></section></div>;
}

function Metric({ label, value, hint, icon }: { label: string; value: string; hint: string; icon: ReactNode }) {
  return <section className="metric-card"><div className="metric-icon">{icon}</div><strong>{value}</strong><span>{label}</span><small>{hint}</small></section>;
}
function EmptyExamState() {
  return <section className="empty-state"><h3>No active examination</h3><p>Select a target examination to create your roadmap.</p><Link className="primary-button" to="/onboarding">Choose examination</Link></section>;
}
