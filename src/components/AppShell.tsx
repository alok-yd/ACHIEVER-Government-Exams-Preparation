import { useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Activity, BarChart3, BookOpenCheck, CalendarDays, ChevronLeft, ClipboardList,
  HeartPulse, Home, Lightbulb, LogOut, Menu, MessageCircle, Mic2, NotebookTabs,
  Search, Target, Timer, Users, Bot
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { label: "Dashboard", path: "/", icon: Home, group: "PREPARATION" },
  { label: "Exam Catalog", path: "/catalog", icon: Search, group: "PREPARATION" },
  { label: "Roadmap", path: "/roadmap", icon: Target, group: "PREPARATION" },
  { label: "Study Planner", path: "/planner", icon: CalendarDays, group: "PREPARATION" },
  { label: "AI Focus", path: "/focus", icon: Activity, group: "TRACK & IMPROVE" },
  { label: "Study Tracker", path: "/tracker", icon: Timer, group: "TRACK & IMPROVE" },
  { label: "PYQ Tracker", path: "/pyq-tracker", icon: ClipboardList, group: "TRACK & IMPROVE" },
  { label: "Test Performance", path: "/tests", icon: BarChart3, group: "TRACK & IMPROVE" },
  { label: "Revision", path: "/revision", icon: NotebookTabs, group: "TRACK & IMPROVE" },
  { label: "Health Tracker", path: "/health", icon: HeartPulse, group: "PERSONAL GROWTH" },
  { label: "Speaking Coach", path: "/speaking", icon: Mic2, group: "PERSONAL GROWTH" },
  { label: "Community", path: "/community", icon: Users, group: "PERSONAL GROWTH" },
  { label: "AI Mentor", path: "/mentor", icon: MessageCircle, group: "INTELLIGENCE" },
  { label: "AI Analytics", path: "/analytics", icon: BarChart3, group: "INTELLIGENCE" },
  { label: "AI Native", path: "/ai-native", icon: Bot, group: "INTELLIGENCE" },
  { label: "Strategy & Tips", path: "/strategy", icon: Lightbulb, group: "INTELLIGENCE" }
];

const titles: Record<string, string> = Object.fromEntries(navigation.map((item) => [item.path, item.label]));

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOutUser } = useAuth();
  const location = useLocation();
  const title = titles[location.pathname] ?? "ACHIEVER";

  const sidebar = <aside className={"sidebar " + (sidebarOpen ? "sidebar-open" : "sidebar-collapsed") + (mobileOpen ? " mobile-open" : "")}>
    <div className="sidebar-brand"><div className="brand-mark"><BookOpenCheck size={24}/></div><div className="brand-name"><strong>ACHIEVER</strong><span>GOVERNMENT EXAMS</span></div></div>
    <div className="sidebar-scroll">
      {["PREPARATION", "TRACK & IMPROVE", "PERSONAL GROWTH", "INTELLIGENCE"].map((group) => <div className="nav-group" key={group}>
        <span className="nav-label">{group}</span>
        {navigation.filter((item) => item.group === group).map((item) => {
          const Icon = item.icon;
          return <NavLink key={item.path} to={item.path} end={item.path === "/"} onClick={() => setMobileOpen(false)} className={({ isActive }) => "nav-link " + (isActive ? "active" : "")} title={item.label}>
            <Icon size={18}/><span>{item.label}</span>
          </NavLink>;
        })}
      </div>)}
    </div>
    <div className="sidebar-footer">
      <div className="student-mini"><div className="avatar">{(user?.displayName || user?.email || "S").slice(0,1).toUpperCase()}</div><div className="student-mini-copy"><strong>{user?.displayName || "Student"}</strong><span>{user?.email || "Signed in"}</span></div></div>
      <button className="signout-link" onClick={() => void signOutUser()}><LogOut size={16}/> Sign out</button>
      <div className="sidebar-tagline">LEARN <i>•</i> PRACTICE <i>•</i> ACHIEVE</div>
    </div>
  </aside>;

  return <div className="app-frame">
    {sidebar}
    {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <div className="main-column">
      <header className="topbar">
        <div className="topbar-left"><button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21}/></button><button className="collapse-button" onClick={() => setSidebarOpen(!sidebarOpen)} title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}><ChevronLeft size={18} className={sidebarOpen ? "" : "flip-icon"}/></button><div><span className="topbar-kicker">ACHIEVER / GOVERNMENT EXAMS</span><h1>{title}</h1></div></div>
        <div className="topbar-right"><span className="secure-pill"><span/> Cloud account</span><div className="top-avatar">{(user?.displayName || user?.email || "S").slice(0,1).toUpperCase()}</div></div>
      </header>
      <main className="page-content">{children}</main>
    </div>
  </div>;
}
