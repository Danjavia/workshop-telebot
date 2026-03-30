## 1. Setup & Refactoring

- [ ] 1.1 Refactor `SkillManager.ts` to export a singleton instance.
- [ ] 1.2 Update `src/core/agent.ts` to use the shared `SkillManager`.
- [ ] 1.3 Update `src/tools/learnSkill.ts` to use the shared `SkillManager`.

## 2. Dynamic Tool Loading

- [ ] 2.1 Update `SkillManager` to look for a `tools` directory in each skill's path.
- [ ] 2.2 Implement a method in `SkillManager` to dynamically load and register tool scripts found in that directory.
- [ ] 2.3 Bridge `SkillManager` with `src/tools/index.ts`'s `registerTool` function.

## 3. Verification

- [ ] 3.1 Verify `SkillManager` singleton state in a mock agent run.
- [ ] 3.2 Verify that learning a skill with a test tool script correctly registers that tool globally.
- [ ] 3.3 Verify the JSON schema generation includes dynamically registered tools.
