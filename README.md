# Yoddha Rakshak — YRCCC Digital Companion

## Project purpose

Yoddha Rakshak (YRCCC Digital Companion) is an institutional, controlled-access digital learning companion for the Yoddha Rakshak Combat Casualty Care Course.

The product vision is a polished YRCCC experience covering authentication, learning resources, video, assessments, feedback, progress, certification and institutional reporting.

## Governing architectural principle

**Configure first. Extend second. Custom-build last.**

Moodle is the learning-management engine and system of record for the majority of learning workflows. We will use Moodle's native capabilities wherever practical, use mature Moodle plugins where necessary, and create thin YRCCC-specific extensions only where the requirement is genuinely specific to the programme.

We will **not fork Moodle**.

The YRCCC companion/PWA layer exists primarily to provide the institutional experience, navigation, branding and selected YR-specific workflows around Moodle.

## Current development baseline

- Moodle: 5.2.x, starting with the current supported 5.2 patch release available at implementation time.
- Development host: Google Cloud Compute Engine, Ubuntu LTS.
- Initial development: native Linux services; **Docker is deliberately deferred**.
- Source of truth: private GitHub repository.
- AI development: agent-operated development environment (OpenCode and/or Antigravity).
- Production containerisation: deferred until the MVP is proven.

## MVP north-star acceptance test

A provisioned YRCCC learner must be able to:

1. authenticate through the controlled YRCCC access flow;
2. enter the assigned YRCCC course;
3. access manuals/resources and video learning;
4. complete a defined assessment;
5. have results/progress recorded in Moodle;
6. submit course/faculty feedback;
7. satisfy configured completion criteria; and
8. receive a digitally verifiable certificate when eligible.

## Project rules

1. Never fork Moodle for a YR-specific requirement.
2. Before writing custom functionality, verify Moodle native capability.
3. Prefer configuration over code.
4. Prefer mature Moodle plugins over bespoke equivalents.
5. Keep YR-specific code thin, isolated and upgrade-safe.
6. Every meaningful milestone is tested and committed to Git.
7. No secrets, credentials or production data in Git.
8. The GCP VM is disposable; the Git repository is the durable product.
9. Phase 2 features remain explicitly deferred until the MVP demonstrates a real gap.