# Yoddha Rakshak v0.1 — Product Requirements

## 1. Product vision

The YRCCC Digital Companion should feel like a purpose-built institutional military training application rather than a generic LMS.

The underlying learning system should remain Moodle. The user experience should present Moodle-backed learning workflows through a coherent YRCCC identity and navigation model.

## 2. Primary users

### Student
A course participant who consumes learning material, completes assessments, submits feedback and receives results/certification.

### Faculty
A course instructor/evaluator who manages assigned learning activities, assesses skills, reviews relevant feedback and contributes to course outcomes.

### Administrator
An authorised course/institution administrator who manages users, cohorts, courses, content, reports, certificates and analytics.

## 3. MVP capability areas

### Authentication and controlled access
- Service number / institutional identifier.
- Mobile number associated with the learner record.
- OTP-based verification where technically appropriate.
- Terms and security acknowledgement.
- Controlled course/cohort enrolment.
- Role-aware access.
- Device registration is a candidate capability but is not a Phase 1 blocker unless required by the validated security design.

### Learning Hub
- YRCCC course overview.
- Manuals and PDF resources.
- SOPs and guidelines.
- Quick-reference resources.
- Case studies/additional resources.
- Download/offline capability where supported by the chosen Moodle/mobile approach.

### Video Library
- Short instructional videos.
- Categorisation by module/topic.
- Search/browse.
- Playback with progress where supported.
- Representative topics include tourniquet application, MARCH, needle decompression, casualty evacuation and simulation demonstrations.

### Assessments
- Pre-course test.
- Post-course test.
- MCQ/question-bank capability.
- Automated grading.
- Results and attempt history.
- Confidence/self-assessment where appropriate.

### Feedback
- Course/session feedback.
- Faculty evaluation.
- Suggestions.
- Anonymous response option where the validated privacy model permits it.
- Exportable results.

### Skills assessment
- Faculty scoring against defined criteria.
- Rubric/marking-guide approach preferred.
- Results recorded against the learner/course.

### Progress and completion
- Activity completion.
- Course completion.
- Conditional progression.
- Completion criteria linked to assessment/skills requirements.

### Certification
- Course-completion certificate.
- Institutional branding.
- Unique certificate identifier.
- Verification mechanism.
- QR verification is a target capability; use a mature Moodle certificate solution before writing custom certificate infrastructure.

### Notifications and schedule
- Course announcements.
- Calendar/schedule.
- Relevant Moodle notifications.
- Contact/help information.

## 4. Institutional/academic outputs

The MVP must preserve the data needed to support later YRCCC evaluation and research.

Candidate outputs:
- Knowledge Score.
- Operational Trauma Readiness Score.
- Faculty Rating Index.
- Overall TEI.
- Knowledge gain.
- Operational readiness score.
- Structured export suitable for later statistical analysis.

**Important:** the mathematical definitions and research methodology for these metrics are not to be invented by the software agent. They require an authoritative specification before implementation.

## 5. User experience reference

The supplied YRCCC 30-screen concept is the visual/product reference. It is not a requirement that every screen become a bespoke application screen.

The implementation should reproduce the intended user journeys and institutional feel using Moodle-native screens/configuration wherever possible, with the YRCCC presentation layer added only where it provides material UX value.

## 6. Explicit non-goals for MVP

Do not build:
- a replacement LMS;
- a bespoke course engine;
- a bespoke quiz engine;
- a bespoke gradebook;
- a bespoke file repository;
- a bespoke video platform;
- a bespoke cohort/user-management system;
- a bespoke notification engine;
- a bespoke generic reporting engine;
- a custom mobile framework before evaluating the PWA/Moodle web/mobile options.

## 7. Phase 2 / deferred capabilities

The following are deliberately deferred until MVP validation:
- sophisticated custom PWA shell;
- advanced device registration/trust;
- bespoke QR enrolment;
- advanced certificate verification;
- advanced institutional analytics dashboard;
- sophisticated custom TEI visualisation;
- specialised cohort-management workflows;
- custom offline synchronisation beyond Moodle-supported capability;
- containerisation/production packaging;
- native Flutter application unless later justified by requirements.

## 8. Acceptance philosophy

A feature is complete only when:
- implemented/configured;
- tested against the real Moodle development instance;
- user workflow verified;
- relevant data persistence verified;
- documented;
- committed to Git;
- project state updated.