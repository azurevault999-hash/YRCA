# YRCCC Agent Handoff

Every agent is a serial worker. GitHub is the source of truth.

Before work:
- Read PROJECT_STATE.md.
- Read the relevant requirements and architecture.
- Inspect current Git state and recent commits.
- Inspect the real Moodle development environment.

Before commit:
- Test the changed workflow against real Moodle where applicable.
- Verify persistence and role permissions.
- Update documentation and PROJECT_STATE.md.
- Confirm no secrets/runtime data are staged.

Commit and push the checkpoint. State the exact work completed, tests run, limitations, and next action. Never depend on chat history for the baton.
