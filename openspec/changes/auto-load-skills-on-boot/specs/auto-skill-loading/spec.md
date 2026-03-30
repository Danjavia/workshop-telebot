## ADDED Requirements

### Requirement: Automatic Skill Initialization
The application MUST discover and load all skills from the `.opencode/skills/` directory at startup before the bot starts processing messages.

#### Scenario: Persistent skills across restarts
- **WHEN** the bot process starts
- **THEN** all subdirectories in `.opencode/skills/` are scanned
- **THEN** all instructions and tools for those skills are registered in the agent's tool-calling logic

### Requirement: Global Registration Consistency
The system SHALL ensure that tools registered via the auto-load mechanism are identical in behavior to tools registered via the `learnSkill` command.

#### Scenario: Automatic tool availability
- **WHEN** the bot starts with a "firecrawl" skill directory present
- **THEN** the `firecrawl` tool is available to the agent in its first message without user interaction
