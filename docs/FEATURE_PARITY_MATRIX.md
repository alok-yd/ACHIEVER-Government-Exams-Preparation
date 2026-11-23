# ACHIEVER GATE → Government Exams feature parity

ACHIEVER GATE is a read-only reference. This project is an independent implementation. A route or visual shell alone does not count as a completed module.

| Reference area | Government Exams adaptation | Status |
|---|---|---|
| Layout, sidebar and responsive shell | Same navy/amber ACHIEVER visual language | Foundation |
| Authentication and profile | Google, verified email/password, phone OTP; UID-scoped profile | Foundation |
| Dashboard | Multi-exam overview and preparation metrics | Foundation |
| Exam catalog | Searchable central/state examination discovery | Foundation |
| Roadmap | Editable exam-specific phases and tasks | Foundation |
| Planner | Persistent student-owned tasks and due dates | Foundation |
| AI Focus | Presence-aware focus sessions and timers | Backlog |
| Lecture/Study Tracker | Verified/manual time, historical and subject/topic totals | Backlog |
| PYQ Execution Tracker | Exam/year/subject/topic question attempts | Backlog |
| Health Tracker | Private health goals and streaks | Backlog |
| Speaking Coach | Communication and interview practice | Backlog |
| Community | Student discussions with safe file attachments | Backlog |
| Test Performance | Configurable exam-specific mock/test analysis | Backlog |
| Revision | Spaced, weak-topic and error-based revision | Backlog |
| AI Mentor | Exam-aware mentor grounded in authorized student data | Backlog |
| AI Analytics | Evidence-based exam-specific preparation analytics | Backlog |
| AI Native | Preserve the reference module's actual workflows | Backlog |
| Strategy & Tips | Exam-specific strategies with verified references | Backlog |
| J.A.R.V.I.S. | Voice-first orb, controls and student-data context | Backlog |
| Notes and resources | UID-owned documents, images and notes | Backlog |
| Administration | Official-source catalog, versioning, role enforcement | Backlog |

## Phase 1 acceptance checks

- [ ] The new repo builds independently.
- [ ] No GATE Firebase project or production data is referenced.
- [ ] Auth methods use Firebase Authentication; no fake login success.
- [ ] Every student record is stored below the authenticated UID.
- [ ] A user can select an exam and save an enrollment.
- [ ] A user can edit roadmap tasks and save changes.
- [ ] A user can add/complete planner tasks and save changes.
- [ ] Missing Firebase configuration is shown honestly.
- [ ] Firestore and Storage rules restrict student data to its owner.

## Next feature-parity increments

1. Reference audit by module and detailed workflow matrix.
2. Study timer, focus engine and durable study-session records.
3. PYQ/question attempts and exam-specific test engine.
4. Revision, health and speaking.
5. AI Mentor, Analytics, AI Native and J.A.R.V.I.S.
6. Community, resources and administrator content management.
