# Moodle Development Environment

## Phase 1 baseline

GCP Compute Engine Ubuntu LTS hosts Moodle's supported moodle-docker development environment.

This is deliberately a development choice: it gives YRCCC a real Moodle runtime from the beginning. It does not decide production packaging.

## Required setup

- Git
- Docker and Compose as required by the current Moodle development documentation
- Moodle 5.2.x supported patch release
- Moodle-docker revision documented in PROJECT_STATE.md
- Browser/test tooling
- Node/toolchain for the YRCCC presentation layer as needed

Keep Moodle runtime data and credentials outside Git.

## Validation course

Create a miniature YRCCC course with PDF/manual, video, pre/post quiz, skills rubric, feedback, completion and certificate proof-of-concept.

Record actual behaviour in MOODLE_CAPABILITY_MATRIX.md.
