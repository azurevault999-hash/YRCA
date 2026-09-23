# Yoddha Rakshak — Project State

## Current checkpoint

`000 — repository foundation`

## Status

Planning / repository foundation.

## Last verified commit

Not yet created.

## Product direction

- Moodle is the core LMS and learning system of record.
- Do not fork Moodle.
- Configure native Moodle capabilities first.
- Use mature plugins where appropriate.
- Build thin YR-specific extensions only for genuine gaps.
- PWA/presentation layer is preferred over prematurely committing to Flutter.
- Docker/Portainer is deferred until after MVP validation.

## Immediate next checkpoint

`001 — Moodle capability validation`

### Required outcome

Deploy a clean supported Moodle 5.2.x development instance and create a miniature YRCCC course that exercises:
- content/PDF;
- video;
- quiz;
- skills/rubric;
- feedback;
- completion;
- certificate proof-of-concept.

Produce a capability matrix and record what is native, configurable, plugin-based or custom.

## Known decisions

- Initial development environment: GCP Compute Engine.
- Initial VM: Ubuntu LTS, sizing to be selected before provisioning.
- GitHub: private repository.
- AI coding agents: OpenCode and/or Antigravity.
- Initial runtime: native Linux services, no Docker.
- Production containerisation: later phase.
- Flutter: optional, not a requirement.

## Deferred

See BUILD_PLAN.md Phase 11.