# Moodle Development Environment

## Purpose

Run a real Moodle instance from the start so YRCCC work is validated against Moodle rather than a mock. This is a development environment decision; it does not determine production packaging.

## Current host

- GCP Compute Engine VM: `yrca-dev`
- Zone: `asia-south2-b`
- OS: Ubuntu 26.04 LTS, x86_64
- Machine: `e2-standard-4` (4 vCPU, 16 GB RAM)
- Workstation access: Tabby SSH connection using a local SSH tunnel for Moodle's web port. Moodle is bound to `127.0.0.1:8000` on the VM; do not open port 8000 to the public internet.

## Directory layout on the VM

- `~/YRCA` — this product repository
- `~/moodle` — Moodle source checkout on `MOODLE_502_STABLE`
- `~/moodle-docker` — official `moodlehq/moodle-docker` development tooling

The Moodle source and `moodle-docker` tooling are separate checkouts; do not copy the entire Moodle source or runtime data into YRCA.

## Runtime observed

- Moodle CLI reports version 5.2.4 (Build: 20261005), with no pending upgrade.
- Containers observed running: `moodle-docker-webserver-1`, `moodle-docker-db-1` (PostgreSQL 17), `moodle-docker-selenium-1`, `moodle-docker-mailpit-1`, and `moodle-docker-exttests-1`.
- The Moodle webserver responds on the VM at `http://127.0.0.1:8000`; the browser reached the Moodle login page and administrator login was confirmed.
- Database table/schema verification remains a required follow-up. Do not mark the capability checkpoint complete until this is verified.

## Restore shell environment after SSH reconnect

The Moodle Docker helper needs these variables. They have been added to the VM user's `~/.bashrc`:

```bash
export MOODLE_DOCKER_WWWROOT="$HOME/moodle"
export MOODLE_DOCKER_DB=pgsql
```

If a shell reports that `MOODLE_DOCKER_WWWROOT` is missing, run `source ~/.bashrc` or export the variables above. From `~/moodle-docker`, use `bin/moodle-docker-compose ps` to inspect containers and `bin/moodle-docker-compose up -d` to start the stack.

## Reproducibility and security rules

- Record the exact `moodle-docker` commit/revision and any selected Compose/configuration files in this document before calling the environment reproducible.
- Keep passwords, private keys, runtime database data, Moodle's data directory, and other secrets outside Git.
- Never commit the generated Moodle `config.php` if it contains local environment-specific credentials.
- Do not expose Moodle port 8000 publicly; use SSH forwarding for development access.
- Do not modify Moodle tables directly for YRCCC application features; use Moodle's supported APIs/Web Services.

## Capability-validation course

Create a miniature YRCCC course exercising a PDF/manual, video, quiz, skills rubric, feedback, completion, and certificate proof-of-concept. Test persistence and permissions with the relevant roles, then record observed native/config/plugin/custom behaviour and evidence in `MOODLE_CAPABILITY_MATRIX.md`.

## Status

Environment is running and browser access is confirmed. Checkpoint 001 remains in progress until database verification, capability tests, and revision capture are complete.
