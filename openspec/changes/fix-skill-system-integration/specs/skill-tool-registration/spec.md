## ADDED Requirements

### Requirement: Dynamic tool registration
The `SkillManager` MUST register any discovered executable tools from a skill's directory into the global agent toolset.

#### Scenario: Firecrawl tool availability
- **WHEN** the agent learns the "firecrawl" skill
- **THEN** any tools defined in `.opencode/skills/firecrawl/tools/` are registered and appear in the JSON schema for tool calls.
