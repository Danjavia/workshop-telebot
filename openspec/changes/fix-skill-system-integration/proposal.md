## Why

The current skill system implementation has two major flaws:
1. `SkillManager` is instantiated multiple times, causing isolation between the `learnSkill` tool and the agent core.
2. Skill learning only updates instructions but doesn't register executable tools (like those from Firecrawl), making them unreachable for the agent even if it "learns" them.

## What Changes

- Refactor `SkillManager` into a singleton to ensure a shared state.
- Update `SkillManager` to support dynamic tool registration from skill definitions.
- Implement a mechanism to map skill-specific tools (from scripts or MCP) into the global agent toolset.

## Capabilities

### New Capabilities
- `skill-tool-registration`: Allows skills to dynamically register executable tools when learned.

### Modified Capabilities
- `skill-learning`: Updated to handle singleton state and tool population.

## Impact

- Core agent reasoning and tool management.
- Consistency across skill-related tools.
