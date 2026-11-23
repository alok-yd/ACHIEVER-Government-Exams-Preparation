import type { Exam, RoadmapTask } from "../types";

export const EXAMS: Exam[] = [
  { id: "upsc-cse", name: "Civil Services Examination", shortName: "UPSC CSE (IAS/IPS/IFS)", category: "Civil Services", authority: "Union Public Service Commission", level: "Central", qualification: "Graduation", description: "Civil services recruitment with Preliminary, Main and Personality Test stages.", officialWebsite: "https://upsc.gov.in/" },
  { id: "upsc-ifs", name: "Indian Forest Service", shortName: "UPSC IFoS", category: "Civil Services", authority: "Union Public Service Commission", level: "Central", qualification: "Relevant bachelor's degree", description: "Forest service recruitment; verify subject-specific eligibility in the current notification.", officialWebsite: "https://upsc.gov.in/" },
  { id: "upsc-capf", name: "Central Armed Police Forces", shortName: "UPSC CAPF", category: "Defence & Police", authority: "Union Public Service Commission", level: "Central", qualification: "Graduation", description: "Assistant Commandant recruitment. Check the current notification for requirements.", officialWebsite: "https://upsc.gov.in/" },
  { id: "nda", name: "National Defence Academy", shortName: "NDA", category: "Defence", authority: "Union Public Service Commission", level: "Central", qualification: "12th (stream requirements vary)", description: "Entry to the National Defence Academy. Verify age and subject conditions in the notification.", officialWebsite: "https://upsc.gov.in/" },
  { id: "cds", name: "Combined Defence Services", shortName: "CDS", category: "Defence", authority: "Union Public Service Commission", level: "Central", qualification: "Graduation (academy-specific)", description: "Officer entry examination for eligible graduates.", officialWebsite: "https://upsc.gov.in/" },
  { id: "ssc-cgl", name: "Combined Graduate Level", shortName: "SSC CGL", category: "SSC", authority: "Staff Selection Commission", level: "Central", qualification: "Graduation", description: "Graduate-level recruitment for various Group B and Group C posts.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ssc-chsl", name: "Combined Higher Secondary Level", shortName: "SSC CHSL", category: "SSC", authority: "Staff Selection Commission", level: "Central", qualification: "12th", description: "Recruitment for posts such as LDC, JSA and DEO, subject to notification.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ssc-mts", name: "Multi-Tasking Staff", shortName: "SSC MTS", category: "SSC", authority: "Staff Selection Commission", level: "Central", qualification: "10th", description: "Non-technical staff recruitment.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ssc-gd", name: "Constable (General Duty)", shortName: "SSC GD", category: "SSC & Police", authority: "Staff Selection Commission", level: "Central", qualification: "10th", description: "Constable recruitment for participating forces, subject to notification.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ssc-cpo", name: "Sub-Inspector in Delhi Police and CAPFs", shortName: "SSC CPO", category: "SSC & Police", authority: "Staff Selection Commission", level: "Central", qualification: "Graduation", description: "Sub-Inspector recruitment with applicable physical standards and tests.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ssc-je", name: "Junior Engineer", shortName: "SSC JE", category: "SSC & Technical", authority: "Staff Selection Commission", level: "Central", qualification: "Engineering degree/diploma (discipline-specific)", description: "Technical recruitment in participating departments.", officialWebsite: "https://ssc.gov.in/" },
  { id: "ibps-po", name: "Probationary Officer", shortName: "IBPS PO", category: "Banking", authority: "Institute of Banking Personnel Selection", level: "Central", qualification: "Graduation", description: "Probationary officer recruitment for participating banks.", officialWebsite: "https://www.ibps.in/" },
  { id: "ibps-clerk", name: "Customer Service Associate", shortName: "IBPS CSA (Clerk)", category: "Banking", authority: "Institute of Banking Personnel Selection", level: "Central", qualification: "Graduation", description: "Clerical/customer service recruitment for participating banks.", officialWebsite: "https://www.ibps.in/" },
  { id: "ibps-rrb", name: "Regional Rural Banks Recruitment", shortName: "IBPS RRB", category: "Banking", authority: "Institute of Banking Personnel Selection", level: "Central", qualification: "Post-specific", description: "Officer and office-assistant recruitment for participating RRBs.", officialWebsite: "https://www.ibps.in/" },
  { id: "sbi-po", name: "Probationary Officer", shortName: "SBI PO", category: "Banking", authority: "State Bank of India", level: "Central", qualification: "Graduation", description: "Probationary officer recruitment by SBI.", officialWebsite: "https://sbi.co.in/web/careers" },
  { id: "sbi-clerk", name: "Junior Associate", shortName: "SBI Clerk", category: "Banking", authority: "State Bank of India", level: "Central", qualification: "Graduation", description: "Customer-facing clerical recruitment by SBI.", officialWebsite: "https://sbi.co.in/web/careers" },
  { id: "rbi-grade-b", name: "Officers Grade B", shortName: "RBI Grade B", category: "Banking & Regulatory", authority: "Reserve Bank of India", level: "Central", qualification: "Graduation (criteria vary)", description: "Officer recruitment by the Reserve Bank of India.", officialWebsite: "https://opportunities.rbi.org.in/" },
  { id: "rbi-assistant", name: "Assistant", shortName: "RBI Assistant", category: "Banking & Regulatory", authority: "Reserve Bank of India", level: "Central", qualification: "Graduation", description: "Assistant recruitment by the Reserve Bank of India.", officialWebsite: "https://opportunities.rbi.org.in/" },
  { id: "rrb-ntpc", name: "Non-Technical Popular Categories", shortName: "RRB NTPC", category: "Railways", authority: "Railway Recruitment Boards", level: "Central", qualification: "12th/Graduation (post-specific)", description: "Railway non-technical recruitment with post-specific levels.", officialWebsite: "https://www.rrbcdg.gov.in/" },
  { id: "rrb-group-d", name: "Level 1 Posts", shortName: "Railway Group D", category: "Railways", authority: "Railway Recruitment Boards", level: "Central", qualification: "10th/ITI (notification-specific)", description: "Level 1 railway recruitment.", officialWebsite: "https://www.rrbcdg.gov.in/" },
  { id: "rrb-alp", name: "Assistant Loco Pilot", shortName: "RRB ALP", category: "Railways & Technical", authority: "Railway Recruitment Boards", level: "Central", qualification: "ITI/diploma/degree (trade-specific)", description: "Technical railway recruitment.", officialWebsite: "https://www.rrbcdg.gov.in/" },
  { id: "afcat", name: "Air Force Common Admission Test", shortName: "AFCAT", category: "Defence", authority: "Indian Air Force", level: "Central", qualification: "Graduation (branch-specific)", description: "Officer entry selection for eligible branches.", officialWebsite: "https://afcat.cdac.in/" },
  { id: "ctet", name: "Central Teacher Eligibility Test", shortName: "CTET", category: "Teaching", authority: "Central Board of Secondary Education", level: "Central", qualification: "Teacher-training qualification (paper-specific)", description: "Teacher eligibility examination. Qualifying CTET is not itself a job appointment.", officialWebsite: "https://ctet.nic.in/" },
  { id: "kvs", name: "Kendriya Vidyalaya Recruitment", shortName: "KVS", category: "Teaching", authority: "Kendriya Vidyalaya Sangathan", level: "Central", qualification: "Post-specific", description: "Teaching and non-teaching recruitment when notified.", officialWebsite: "https://kvsangathan.nic.in/" },
  { id: "isro", name: "Scientist/Engineer Recruitment", shortName: "ISRO", category: "Technical & PSU", authority: "Indian Space Research Organisation", level: "Central", qualification: "Discipline-specific degree", description: "Technical recruitment; eligibility varies by advertised post.", officialWebsite: "https://www.isro.gov.in/Careers.html" },
  { id: "drdo", name: "Scientist and Technical Recruitment", shortName: "DRDO", category: "Technical & PSU", authority: "Defence Research and Development Organisation", level: "Central", qualification: "Post-specific", description: "Scientific and technical recruitment through advertised routes.", officialWebsite: "https://www.drdo.gov.in/" },
  { id: "uppsc-pcs", name: "Combined State/Upper Subordinate Services", shortName: "UPPSC PCS", category: "State PSC", authority: "Uttar Pradesh Public Service Commission", level: "State", state: "Uttar Pradesh", qualification: "Graduation", description: "Uttar Pradesh state civil services recruitment.", officialWebsite: "https://uppsc.up.nic.in/" },
  { id: "up-police", name: "Police Constable / Sub-Inspector", shortName: "UP Police", category: "State Police", authority: "Uttar Pradesh Police Recruitment and Promotion Board", level: "State", state: "Uttar Pradesh", qualification: "10th/12th/Graduation (post-specific)", description: "State police recruitment. Select the notified post and cycle.", officialWebsite: "https://uppbpb.gov.in/" },
  { id: "bpsc-cce", name: "Combined Competitive Examination", shortName: "BPSC CCE", category: "State PSC", authority: "Bihar Public Service Commission", level: "State", state: "Bihar", qualification: "Graduation", description: "Bihar state civil services recruitment.", officialWebsite: "https://bpsc.bih.nic.in/" },
  { id: "rpsc-ras", name: "State and Subordinate Services", shortName: "RPSC RAS", category: "State PSC", authority: "Rajasthan Public Service Commission", level: "State", state: "Rajasthan", qualification: "Graduation", description: "Rajasthan administrative and subordinate services recruitment.", officialWebsite: "https://rpsc.rajasthan.gov.in/" },
  { id: "mppsc-state-service", name: "State Service Examination", shortName: "MPPSC SSE", category: "State PSC", authority: "Madhya Pradesh Public Service Commission", level: "State", state: "Madhya Pradesh", qualification: "Graduation", description: "Madhya Pradesh state civil services recruitment.", officialWebsite: "https://mppsc.mp.gov.in/" },
  { id: "hpsc-hcs", name: "Civil Services Examination", shortName: "HPSC HCS", category: "State PSC", authority: "Haryana Public Service Commission", level: "State", state: "Haryana", qualification: "Graduation", description: "Haryana civil services recruitment.", officialWebsite: "https://hpsc.gov.in/" },
  { id: "tnpsc-group-1", name: "Combined Civil Services Examination I", shortName: "TNPSC Group 1", category: "State PSC", authority: "Tamil Nadu Public Service Commission", level: "State", state: "Tamil Nadu", qualification: "Graduation", description: "Tamil Nadu state services recruitment.", officialWebsite: "https://www.tnpsc.gov.in/" },
  { id: "wbpsc-wbcs", name: "West Bengal Civil Service", shortName: "WBPSC WBCS", category: "State PSC", authority: "West Bengal Public Service Commission", level: "State", state: "West Bengal", qualification: "Graduation", description: "West Bengal civil services recruitment.", officialWebsite: "https://psc.wb.gov.in/" }
];

export const EXAM_CATEGORIES = ["All categories", ...Array.from(new Set(EXAMS.map((exam) => exam.category))).sort()];

export function createStarterRoadmap(examId: string): RoadmapTask[] {
  const exam = EXAMS.find((item) => item.id === examId);
  const category = exam?.category ?? "General";
  let phases: Array<{ phase: string; title: string; description: string }>;

  const civilServices = category === "Civil Services" || examId === "uppsc-pcs" || examId === "bpsc-cce" || examId === "rpsc-ras" || examId === "mppsc-state-service" || examId === "hpsc-hcs" || examId === "tnpsc-group-1" || examId === "wbpsc-wbcs";
  if (civilServices) {
    phases = [
      { phase: "Foundation", title: "Understand the official syllabus and exam stages", description: "Read the latest official notification and map the relevant syllabus before scheduling detailed study." },
      { phase: "General Studies", title: "Build General Studies foundations", description: "Create subject-wise study blocks from the current official syllabus and your chosen resources." },
      { phase: "Practice", title: "Start previous-year question practice", description: "Classify questions by topic, record mistakes and revise weak areas." },
      { phase: "Written", title: "Develop descriptive answer-writing practice", description: "Use answer writing only where the selected examination includes a descriptive stage." },
      { phase: "Assessment", title: "Attempt exam-pattern mock tests", description: "Use mocks aligned to the applicable notification and analyse each attempt." },
      { phase: "Revision", title: "Complete revision and final consolidation", description: "Revise concise notes, errors and high-priority topics before the examination." }
    ];
  } else if (category === "SSC" || category === "SSC & Police" || category === "SSC & Technical") {
    phases = [
      { phase: "Foundation", title: "Map the notified tier-wise syllabus", description: "Confirm the current exam structure, sections, marking and time limits from the official SSC notice." },
      { phase: "Quantitative Aptitude", title: "Build quantitative aptitude", description: "Organize arithmetic and advanced mathematics topics according to the selected post and tier." },
      { phase: "Reasoning", title: "Build reasoning and general intelligence", description: "Practise topic-wise questions and maintain an error log." },
      { phase: "English & Awareness", title: "Prepare English and General Awareness", description: "Set language and awareness practice targets according to the notified pattern." },
      { phase: "Assessment", title: "Attempt sectional and full-length mocks", description: "Match test sections, duration and scoring rules to the current notification." },
      { phase: "Revision", title: "Revise errors and consolidate speed", description: "Reattempt incorrect questions and review accuracy, speed and time allocation." }
    ];
  } else if (category === "Banking" || category === "Banking & Regulatory") {
    phases = [
      { phase: "Foundation", title: "Confirm the post-wise examination pattern", description: "Check the latest official notice for stages, sections, language and scoring." },
      { phase: "Quantitative Aptitude", title: "Build quantitative aptitude and data interpretation", description: "Practise calculations, arithmetic and data sets relevant to the selected post." },
      { phase: "Reasoning", title: "Build reasoning and analytical ability", description: "Practise puzzles, seating, logic and other notified areas." },
      { phase: "English & Awareness", title: "Prepare English and banking awareness", description: "Plan language practice and current financial/banking awareness where applicable." },
      { phase: "Assessment", title: "Attempt timed sectional and full mocks", description: "Use the correct stage-wise structure and analyse accuracy, speed and omissions." },
      { phase: "Revision", title: "Revise concepts, current affairs and errors", description: "Review weak sections and the relevant current-affairs window." }
    ];
  } else {
    phases = [
      { phase: "Foundation", title: "Read the latest official notification", description: "Confirm eligibility, examination stages, syllabus and marking scheme from the recruiting authority." },
      { phase: "Syllabus", title: "Break the syllabus into subjects and topics", description: "Create a topic checklist from the verified syllabus for your exact post and cycle." },
      { phase: "Learning", title: "Complete subject-wise learning blocks", description: "Allocate study hours to the subjects and skills required by this examination." },
      { phase: "Practice", title: "Practise topic-wise and year-wise questions", description: "Use authorized question material and record performance by topic." },
      { phase: "Assessment", title: "Attempt examination-pattern tests", description: "Configure each test with the notified stages, duration and marking rules." },
      { phase: "Revision", title: "Revise and prepare for the examination", description: "Use error logs, short notes and mock analysis to guide final revision." }
    ];
  }

  return phases.map((item, index) => ({
    id: examId + "-phase-" + (index + 1),
    title: item.title,
    phase: item.phase,
    description: item.description,
    status: index === 0 ? "in-progress" : "pending",
    priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low"
  }));
}
