# Agent Instructions

1. Moodle is the learning engine and system of record.
2. Configure first. Extend second. Custom-build last.
3. Never fork or modify Moodle core.
4. Do not build a parallel LMS, gradebook, quiz engine, course engine or user/cohort store.
5. Use Moodle's native features and mature plugins before custom code.
6. Phase 1 uses a real Moodle 5.2.x instance through Moodle's supported moodle-docker development stack on the GCP VM.
7. Use Moodle-supported APIs/Web Services; avoid direct DB manipulation.
8. Test real persistence and user-visible behaviour.
9. Do not invent TEI methodology.
10. Never commit secrets or real learner data.
11. Every checkpoint updates PROJECT_STATE.md, commits and pushes.
12. Work serially from the repository baton; do not create unnecessary parallel branches.
