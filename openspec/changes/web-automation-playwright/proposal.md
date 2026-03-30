## Why

To empower the agent with browser automation capabilities, allowing it to navigate complex websites, perform interactive flows (like filling forms or clicking buttons), and extract data from single-page applications (SPAs) that require JavaScript execution.

## What Changes

- Integrate Playwright as a new automation toolset.
- Create a dedicated skill for web browser interaction.
- Implement tools for navigation, interaction (click, type), and content extraction.
- Handle browser lifecycle management (launch, close) within the agent's context.

## Capabilities

### New Capabilities
- `web-browser-automation`: Ability to control a headless browser to perform sequences of actions on websites.

### Modified Capabilities
<!-- No requirement changes for existing capabilities. -->

## Impact

- Core agent reasoning and toolset.
- New dependencies: `playwright`.
- Potential impact on memory/resource usage due to browser execution.
