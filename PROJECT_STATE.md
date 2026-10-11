# Yoddha Rakshak — Project State

## Current checkpoint

`001 — Real Moodle environment bootstrapped` (in progress)

## Status

The GCP development VM is running the official Moodle `moodle-docker` development stack. Moodle 5.2.4 is serving its login page and an administrator login has been confirmed by the project owner. The CLI upgrade check reports no pending upgrade. Database inspection found 490 tables using Moodle's configured `m_` prefix. The full capability-validation course and role/feature tests are still outstanding.

## Last verified repository commit

The repository foundation is committed on `main`. The running Moodle environment is currently configured on the VM; the reproducible environment notes are being recorded in this checkpoint.

## Product direction

- Moodle is the core LMS and learning system of record.
- Do not fork Moodle.
- Configure native Moodle capabilities first.
- Use mature plugins where appropriate.
- Build thin YR-specific extensions only for genuine gaps.
- PWA/presentation layer is preferred over prematurely committing to Flutter.
- Use Moodle's official `moodle-docker` development stack from Phase 1; this does not decide production packaging.

## Current development environment

- GCP Compute Engine VM: `yrca-dev`
- Zone: `asia-south2-b`
- OS: Ubuntu 26.04 LTS, x86_64
- Machine type: `e2-standard-4` (4 vCPU, 16 GB RAM)
- YRCA repository: `~/YRCA`, branch `main`
- Moodle source: `~/moodle`, branch `MOODLE_502_STABLE`
- Official Moodle development tooling: `~/moodle-docker`
- `moodle-docker` Git revision: `f4c2324d32fb74d7753264381f0a9b418b6034b2` (working tree clean)
- Moodle version reported by CLI: 5.2.4 (Build: 20261005)
- Containers observed running: webserver, PostgreSQL 17, Selenium, Mailpit and Moodle extension tests
- Moodle webserver is bound to VM loopback at port 8000; access from the workstation is through Taby's local SSH port forwarding. Do not expose port 8000 publicly.
- Shell environment variables `MOODLE_DOCKER_WWWROOT` and `MOODLE_DOCKER_DB` are configured in the VM user's `~/.bashrc`.

No secrets, admin passwords, runtime database contents, or Moodle data directory should be committed.

## Immediate next checkpoint work

Finish `001 — Moodle capability validation`:

1. Verify remaining schema/persistence behaviour and record the container configuration.
3. Create a miniature YRCCC course exercising:
   - PDF/manual resource;
   - video;
   - quiz;
   - skills/rubric;
   - feedback;
   - completion;
   - certificate proof-of-concept.
4. Test with appropriate student/faculty/admin roles and record actual evidence in `docs/MOODLE_CAPABILITY_MATRIX.md`.
5. Commit and push the completed checkpoint before starting the YRCCC experience layer.

## Known decisions

- GitHub is the source of truth; agents/workspaces are disposable workers.
- Serial baton handoffs; avoid unnecessary parallel branches.
- GCP Compute Engine is the development host.
- AI Studio can be used for initial product/UI work; Antigravity can continue against the real VM and Moodle environment.
- Use Moodle APIs/Web Services for integration; do not manipulate Moodle's database directly for application features.
- TEI formulas must be formally specified before implementation.
- Flutter is optional, not a requirement.

## Deferred

See `BUILD_PLAN.md` Phase 11.
