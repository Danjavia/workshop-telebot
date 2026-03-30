## ADDED Requirements

### Requirement: Shared state
The agent core and the `learnSkill` tool MUST use the exact same instance of `SkillManager` to share learned skill state.

#### Scenario: Learning reflected in core
- **WHEN** the agent uses the `learnSkill` tool
- **THEN** the learned skill's instructions are immediately visible to the `runAgent` function in its next message.
