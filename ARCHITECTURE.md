# Yoddha Rakshak — Architecture Map

## 1. Architectural intent

The architecture deliberately separates:
1. Moodle's learning-management capabilities;
2. YRCCC presentation/experience;
3. genuinely YR-specific domain logic.

Moodle remains unmodified core software. Custom behaviour is implemented through configuration, supported plugins, Moodle APIs and thin custom plugins/services.

## 2. Logical architecture

```text
                         YRCCC DIGITAL COMPANION
                                  |
                     +------------+------------+
                     |                         |
               Presentation              YR-specific
                  layer                    logic
                     |                         |
             PWA / responsive             TEI engine
             YRCCC theme                  research export
             dashboard                    special workflows
             navigation                   certificate UX
                     |                         |
                     +------------+------------+
                                  |
                           Moodle Web Services
                                  |
                    +-------------v-------------+
                    |          MOODLE           |
                    |                           |
                    | Users / Roles / Cohorts   |
                    | Courses / Enrolment       |
                    | Resources / Files         |
                    | Video / H5P               |
                    | Quiz / Question Bank      |
                    | Gradebook                  |
                    | Completion / Restriction  |
                    | Competencies              |
                    | Feedback                   |
                    | Calendar / Messaging       |
                    | Reports                    |
                    +-------------+-------------+
                                  |
                              Moodle DB
```

## 3. Capability ownership

### Moodle owns
- identity record;
- roles and capabilities;
- cohorts and course enrolment;
- courses and course structure;
- learning resources;
- files;
- video delivery;
- quizzes/question banks;
- grading;
- completion;
- competencies;
- feedback;
- messaging/notifications;
- calendar;
- core reporting/data.

### YRCCC layer owns
- institutional visual identity;
- application navigation/presentation;
- validated controlled-access workflow;
- YR-specific TEI calculations;
- research-oriented exports;
- genuinely unique institutional workflows;
- certificate presentation/verification only where Moodle/plugin capability needs supplementation.

## 4. Integration principle

Prefer Moodle-supported APIs and Web Services.

Do not directly manipulate Moodle database tables from the YR application unless a documented, exceptional migration/maintenance requirement makes this unavoidable.

If a Moodle capability is missing, first consider:
1. configuration;
2. existing supported plugin;
3. Moodle plugin;
4. Moodle Web Service/API;
5. thin YR-specific service/plugin.

## 5. PWA strategy

The PWA is the preferred initial companion strategy.

It should not become a second LMS.

Possible progression:

```text
Stage A
Moodle responsive web + YRCCC theme/configuration
        |
Stage B
Installable PWA / presentation improvements
        |
Stage C
Thin YRCCC PWA shell using Moodle Web Services
        |
Stage D (only if justified)
Native Android/iOS wrapper or Flutter/native application
```

The stage is selected based on actual UX gaps, not technology preference.

## 6. Development environment — Phase 1

```text
GCP Compute Engine VM
    Ubuntu LTS
       |
       +-- Git
       +-- PHP / required Moodle runtime
       +-- MariaDB or supported Moodle DB
       +-- Web server
       +-- Moodle
       +-- Node/toolchain as required by YRCCC PWA
       +-- OpenCode / Antigravity
       +-- test/browser tooling
```

Moodle's supported moodle-docker development stack is used on the GCP VM from Phase 1 so the application is tested against real Moodle. This is a development-environment decision, not a production containerisation commitment.

## 7. Production portability

The GCP VM is not the product.

The durable product consists of:
- Git repository;
- Moodle configuration documentation;
- Moodle plugins/custom plugins;
- YRCCC application source;
- database migration/bootstrap procedures;
- environment specification;
- backup/restore procedure;
- deployment documentation.

After MVP validation, containerisation can be created as a separate, tested deployment target.

## 8. Security principles

- Private GitHub repository.
- No secrets in Git.
- Least-privilege credentials.
- Moodle roles/capabilities remain the authorization authority for Moodle data.
- Application secrets supplied through environment/configuration outside source control.
- HTTPS for exposed services.
- Production data must not be used in development unless explicitly authorised and appropriately protected.
- Authentication design must be validated before being treated as production-grade.

## 9. Upgrade strategy

Never modify Moodle core for YRCCC requirements.

Custom functionality must live in:
- configuration;
- themes;
- supported plugins;
- YR-specific plugins;
- external services where justified.

This preserves the ability to upgrade supported Moodle releases.