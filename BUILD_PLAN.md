# Yoddha Rakshak — Build Plan

## Governing rule

**Configure first. Extend second. Custom-build last.**

The AI agent must inspect Moodle's native capabilities before implementing a custom equivalent.

## Phase 0 — Repository foundation

### Checkpoint 000
Create:
- README.md
- PRODUCT_REQUIREMENTS.md
- ARCHITECTURE.md
- BUILD_PLAN.md
- PROJECT_STATE.md
- docs/ directory
- secure .gitignore

Verify:
- repository is clean;
- documentation is internally consistent;
- initial commit created and pushed.

Suggested commit:
`docs: establish Yoddha Rakshak v0.1 product and architecture`

## Phase 1 — Moodle capability validation

### Checkpoint 001
Deploy a clean supported Moodle 5.2.x development instance.

Configure a miniature YRCCC course containing:
- one manual/PDF;
- one video;
- one pre-course quiz;
- one skills/rubric activity;
- one feedback activity;
- completion criteria;
- certificate proof-of-concept.

Produce:
`docs/MOODLE_CAPABILITY_MATRIX.md`

For every YRCCC requirement record:
- native capability;
- configuration required;
- plugin candidate;
- custom development requirement, if any;
- evidence/test result.

Suggested commit:
`feat: establish Moodle YRCCC capability baseline`

## Phase 2 — YRCCC course model

### Checkpoint 002
Configure:
- YRCCC course category;
- cohort;
- Student role;
- Faculty role;
- Administrator role;
- course structure;
- completion rules;
- representative content.

Acceptance:
A test student can be enrolled and complete the basic learning path.

## Phase 3 — Institutional presentation

### Checkpoint 003
Create the YRCCC visual identity using Moodle configuration/theme capabilities.

Target:
- institutional branding;
- dashboard;
- navigation;
- course landing page;
- learning hub;
- resource presentation.

Do not build a bespoke PWA unless native Moodle presentation cannot meet the required UX.

## Phase 4 — Assessment

### Checkpoint 004
Configure:
- question bank;
- pre-course test;
- post-course test;
- grading;
- result display;
- required completion conditions.

Acceptance:
A test learner completes an assessment and the result is correctly persisted and reflected in progress/completion.

## Phase 5 — Faculty skills evaluation

### Checkpoint 005
Implement the smallest viable skills assessment using Moodle rubrics/marking guides or competencies.

Acceptance:
Faculty can score a defined skill set and the learner record contains the resulting data.

## Phase 6 — Feedback

### Checkpoint 006
Configure:
- session/course feedback;
- faculty evaluation;
- appropriate anonymity mode;
- export.

Acceptance:
A test learner can submit feedback and an authorised administrator can review/export it.

## Phase 7 — Certification

### Checkpoint 007
Evaluate and configure a mature Moodle certificate solution.

Acceptance:
A learner who meets completion criteria receives a branded certificate with a unique verification mechanism.

## Phase 8 — TEI foundation

### Checkpoint 008
Do not invent research methodology.

First create an authoritative TEI specification covering:
- input measures;
- formula;
- weighting;
- missing data;
- scoring ranges;
- interpretation;
- export schema.

Only after approval implement the TEI calculations using Moodle data.

## Phase 9 — YRCCC companion/PWA

### Checkpoint 009
Only now build the smallest custom PWA layer justified by observed Moodle UX gaps.

It should consume Moodle-supported APIs/Web Services rather than duplicating Moodle's data model.

Acceptance:
The PWA can deliver the validated core learner journey against the real Moodle instance.

## Phase 10 — MVP demonstration

### Checkpoint 010
Run a clean end-to-end demonstration:

```text
Provision learner
    ->
Controlled login
    ->
YRCCC course
    ->
Learning resource
    ->
Video
    ->
Assessment
    ->
Result
    ->
Feedback
    ->
Completion
    ->
Certificate
```

Record:
- test account;
- exact steps;
- expected outcomes;
- actual outcomes;
- known limitations.

Tag the release:
`v0.1.0-mvp`

## Phase 11 — Deferred / Phase 2

Only after MVP validation:
- advanced PWA;
- device registration;
- advanced QR onboarding;
- advanced analytics;
- specialised TEI dashboard;
- enhanced certificate verification;
- sophisticated offline workflows;
- native Flutter/other native app if justified;
- Docker/Compose/Portainer production packaging.

## Agent operating procedure

For every checkpoint:

1. Read PROJECT_STATE.md.
2. Read relevant requirements and architecture.
3. Inspect the existing Moodle capability before coding.
4. Make the smallest change needed.
5. Test against the real development instance.
6. Verify persistence and user-visible behaviour.
7. Update documentation.
8. Update PROJECT_STATE.md.
9. Commit with a descriptive message.
10. Push to GitHub.
11. Stop at the checkpoint unless the next task is explicitly requested.

Never combine multiple major checkpoints into one unreviewed change.