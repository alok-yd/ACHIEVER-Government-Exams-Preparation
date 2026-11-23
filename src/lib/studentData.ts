import {
  addDoc, collection, doc, getDoc, getDocs, orderBy, query,
  serverTimestamp, setDoc, updateDoc
} from "firebase/firestore";
import type { ExamEnrollment, PlannerTask, RoadmapTask, StudentRoadmap } from "../types";
import { db } from "./firebase";

function requireDb() {
  if (!db) throw new Error("Firebase is not configured. Add the new project's values to .env.local.");
  return db;
}

export async function listEnrollments(uid: string): Promise<ExamEnrollment[]> {
  const firestore = requireDb();
  const snapshot = await getDocs(query(collection(firestore, "users", uid, "examEnrollments"), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ExamEnrollment);
}

export async function saveEnrollment(uid: string, enrollment: Omit<ExamEnrollment, "id" | "createdAt">): Promise<ExamEnrollment> {
  const firestore = requireDb();
  const reference = await addDoc(collection(firestore, "users", uid, "examEnrollments"), {
    ...enrollment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { ...enrollment, id: reference.id };
}

export async function getRoadmap(uid: string, enrollmentId: string): Promise<StudentRoadmap | null> {
  const firestore = requireDb();
  const snapshot = await getDoc(doc(firestore, "users", uid, "roadmaps", enrollmentId));
  if (!snapshot.exists()) return null;
  return snapshot.data() as StudentRoadmap;
}

export async function saveRoadmap(uid: string, roadmap: StudentRoadmap): Promise<void> {
  const firestore = requireDb();
  await setDoc(doc(firestore, "users", uid, "roadmaps", roadmap.enrollmentId), {
    ...roadmap,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function listPlannerTasks(uid: string): Promise<PlannerTask[]> {
  const firestore = requireDb();
  const snapshot = await getDocs(query(collection(firestore, "users", uid, "plannerTasks"), orderBy("date", "asc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as PlannerTask);
}

export async function addPlannerTask(uid: string, task: Omit<PlannerTask, "id" | "createdAt">): Promise<PlannerTask> {
  const firestore = requireDb();
  const reference = await addDoc(collection(firestore, "users", uid, "plannerTasks"), {
    ...task,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return { ...task, id: reference.id };
}

export async function updatePlannerTask(uid: string, taskId: string, changes: Partial<Pick<PlannerTask, "completed" | "title" | "date" | "durationMinutes">>): Promise<void> {
  const firestore = requireDb();
  await updateDoc(doc(firestore, "users", uid, "plannerTasks", taskId), {
    ...changes,
    updatedAt: serverTimestamp()
  });
}

export async function updateRoadmapTasks(uid: string, enrollmentId: string, tasks: RoadmapTask[], examId: string): Promise<void> {
  await saveRoadmap(uid, { enrollmentId, examId, tasks });
}
