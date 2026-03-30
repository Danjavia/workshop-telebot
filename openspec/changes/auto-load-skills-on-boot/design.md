## Context

Currently, skills and tools are stored in memory in a singleton `SkillManager`. When the bot process restarts, the memory is wiped, but the skill files remain on disk in `.opencode/skills/`. The bot currently waits for an explicit `learnSkill` command to load these files.

## Goals / Non-Goals

**Goals:**
- Load all subdirectories in `.opencode/skills/` at startup.
- Automatically register all instructions and tools found during scanning.
- Ensure tools are registered with the global `tools` Map before the bot is ready.

**Non-Goals:**
- Persistence of *learned* status in a database (we rely on the directory existence as the source of truth).
- Deletion of skills via command.

## Decisions

- **Initialization timing**: Skills will be loaded in `src/index.ts` immediately after database initialization and before bot setup.
- **Bulk scanning**: `SkillManager` will implement a `loadAllSkills()` method using `fs.readdir` on the base skills directory.
- **Error resilience**: If a single skill fails to load (e.g., malformed JS tool), it should be logged but not prevent other skills or the bot from starting.

## Risks / Trade-offs

- **[Risk] Startup delay** → **Mitigation**: Scans are local and happen once. The number of skills is expected to be manageable (under 100).
- **[Risk] Multiple registrations** → **Mitigation**: `SkillManager` already uses a Map for learned skills, preventing duplicates.
