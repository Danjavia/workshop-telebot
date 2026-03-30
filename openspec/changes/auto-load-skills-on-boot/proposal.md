## Why

Currently, learned skills and their tools are only available in the agent's memory for the duration of a single process run. When the bot restarts, it "forgets" all learned skills, leading to errors when it tries to use tools that are no longer registered. We need a way to make learned skills persistent across restarts.

## What Changes

- Implement an automatic skill discovery and loading mechanism on bot startup.
- Update `SkillManager` to support batch loading of all skills in the `.opencode/skills/` directory.
- Ensure all discovered tools are registered globally before the bot starts accepting messages.

## Capabilities

### New Capabilities
- `auto-skill-loading`: Automatically discovers and initializes all skills in the skills directory upon application startup.

### Modified Capabilities
- `skill-learning`: Updated to ensure that once a skill is created/downloaded to the disk, it's always available in future sessions.

## Impact

- `src/index.ts`: Will now include a skill initialization step.
- `src/skills/SkillManager.ts`: New method for bulk loading.
- System startup time: Negligible increase to scan the local directory.
