## ADDED Requirements

### Requirement: Skill discovery
The agent MUST be able to discover available skills by searching a pre-defined directory or repository of specialized instructions.

#### Scenario: Successful discovery
- **WHEN** the agent searches for "openspec-propose" skill
- **THEN** the agent finds the skill content and instructions

### Requirement: Skill loading
The agent SHALL load and internalize the instructions and toolsets of a discovered skill to execute specialized tasks.

#### Scenario: Learning a new skill
- **WHEN** the agent loads the "openspec-propose" skill
- **THEN** the agent's context is updated with the skill-specific rules and workflows
