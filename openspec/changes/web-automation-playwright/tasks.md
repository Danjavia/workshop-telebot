## 1. Setup

- [x] 1.1 Add `playwright` to `package.json` dependencies.
- [x] 1.2 Run `npx playwright install chromium` to install browser binaries.
- [x] 1.3 Create directory for the new skill at `.opencode/skills/web-browser/`.

## 2. Core Browser Implementation

- [x] 2.1 Implement `BrowserService.ts` to manage Chromium lifecycle (launch, close, page management).
- [x] 2.2 Add content extraction logic using a library like `turndown` for HTML to Markdown conversion.

## 3. Web Browser Skill & Tools

- [x] 3.1 Create `SKILL.md` for the `web-browser` skill.
- [x] 3.2 Implement `navigate` tool for opening URLs.
- [x] 3.3 Implement `interact` tool for clicking, typing, and other DOM actions.
- [x] 3.4 Implement `scrape_page` tool to extract current page content.

## 4. Integration & Verification

- [x] 4.1 Verify `SkillManager` dynamically loads the `web-browser` skill and its tools.
- [x] 4.2 Test a sample flow (e.g., search on Google and extract results).
- [x] 4.3 Ensure browser instances are closed correctly after execution and on timeouts.
