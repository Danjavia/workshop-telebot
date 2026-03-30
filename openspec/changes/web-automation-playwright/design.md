## Context

The agent currently lacks the ability to interact with dynamic web content or perform multi-step flows on websites (e.g., logging in, navigating complex menus, interacting with JS-heavy elements). While Firecrawl is great for scraping, it doesn't allow for interactive "flows". We need a way to control a browser instance directly.

## Goals / Non-Goals

**Goals:**
- Provide a set of tools to control a Chromium instance via Playwright.
- Support navigation, clicking, typing, and waiting for elements.
- Allow the agent to extract the current page's content as Markdown.
- Ensure efficient resource management (auto-closing browser instances).

**Non-Goals:**
- Supporting multiple browser engines (sticking to Chromium).
- Complex session persistence across bot restarts.
- Implementing a full web-based UI for the browser.

## Decisions

- **Playwright Library**: Chosen for its robust auto-waiting, broad ecosystem, and reliable Chromium support.
- **Skill Integration**: Implement as a standard skill in `.opencode/skills/web-browser` with dynamic tool registration.
- **Stateless Execution**: Each request will typically launch/re-use a browser context, but the agent should handle closing it to prevent memory leaks.
- **Markdown Conversion**: Use an existing library or custom logic to convert the live DOM to Markdown for the agent's consumption.

## Risks / Trade-offs

- **[Risk] Resource Exhaustion** → **Mitigation**: Implement strict timeouts and ensure browser/context/page closing in a `finally` block.
- **[Risk] Bot Detection** → **Mitigation**: Use stealth-like headers/settings and focus on legitimate automation tasks.
- **[Risk] Dependency Size** → **Mitigation**: Chromium binaries are large; document the need for `npx playwright install chromium`.
