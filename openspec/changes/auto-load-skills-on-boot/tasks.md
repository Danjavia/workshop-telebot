## 1. SkillManager Enhancements

- [x] 1.1 Implement `loadAllSkills()` in `src/skills/SkillManager.ts`.
- [x] 1.2 Add directory scanning logic using `fs.readdir` in `loadAllSkills()`.
- [x] 1.3 Ensure `loadAllSkills()` calls `learnSkill()` for each discovered subdirectory.

## 2. Startup Integration

- [x] 2.1 Update `src/index.ts` to call `skillManager.loadAllSkills()` during boot.
- [x] 2.2 Ensure skill loading happens before `setupBot()` but after `initDatabase()`.

## 3. Verification

- [x] 3.1 Restart the bot and verify that "firecrawl" and "web-browser" are loaded without manual commands.
- [x] 3.2 Check console logs for dynamic tool registration messages.
- [x] 3.3 Verify that the agent's system prompt contains all loaded skill instructions on the first message.
