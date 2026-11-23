export type ExamLevel = "Central" | "State";
export type PreparationLevel = "Beginner" | "Intermediate" | "Advanced";
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Exam {
  id: string;
  name: string;
  shortName: string;
  category: string;
  authority: string;
  level: ExamLevel;
  state?: string;
  qualification: string;
  description: string;
  officialWebsite?: string;
}

export interface ExamEnrollment {
  id: string;
  examId: string;
  examName: string;
  shortName: string;
  category: string;
  level: ExamLevel;
  cycle: string;
  targetDate: string;
  dailyHours: number;
  preparationLevel: PreparationLevel;
  isPrimary: boolean;
  createdAt?: unknown;
}

export interface RoadmapTask {
  id: string;
  title: string;
  phase: string;
  description: string;
  status: TaskStatus;
  priority: "High" | "Medium" | "Low";
}

export interface StudentRoadmap {
  enrollmentId: string;
  examId: string;
  tasks: RoadmapTask[];
}

export interface PlannerTask {
  id: string;
  title: string;
  date: string;
  durationMinutes: number;
  completed: boolean;
  examId?: string;
  createdAt?: unknown;
}
