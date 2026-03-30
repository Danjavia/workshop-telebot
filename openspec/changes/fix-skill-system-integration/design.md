## Context

We identified that `SkillManager` being instantiated in both `agent.ts` and `learnSkill.ts` leads to split states. Furthermore, the "learning" process only injects text but does not register tools into the global `tools` Map, leaving skills like Firecrawl unreachable.

## Goals / Non-Goals

**Goals:**
- Implement a singleton pattern for `SkillManager`.
- Bridge learned skills with the global tool registration system (`src/tools/index.ts`).
- Support loading executable tools from a skill's subdirectory (e.g., `.opencode/skills/firecrawl/tools/*.ts`).

**Non-Goals:**
- Refactoring the entire tool system (keeping it minimal).
- Persisting skill state across bot restarts (still memory-based).

## Decisions

- **Singleton Pattern**: Export a single instance of `SkillManager` instead of the class itself.
- **Dynamic Tool Discovery**: `SkillManager` will look for a `tools` directory within each skill and attempt to load and register any found tool definitions.
- **Global Bridge**: `SkillManager` will call `registerTool` from `src/tools/index.ts` for each tool it discovers.

## Risks / Trade-offs

- **[Risk] Path Sensitivity** → **Mitigation**: Use absolute paths for skill discovery and tool loading.
- **[Risk] Dynamic Import Complexity** → **Mitigation**: Use standard dynamic imports (`import()`) and handle errors gracefully if a tool script is malformed.
