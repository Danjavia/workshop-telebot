## 1. Setup

- [x] 1.1 Add `@modelcontextprotocol/sdk` to `package.json`.
- [x] 1.2 Create the `.opencode/skills/` directory to store dynamic skill definitions.
- [x] 1.3 Update environment configuration to support MCP server URLs.

## 2. Skill Learning Mechanism

- [x] 2.1 Implement a `SkillManager` class to discover and load skill artifacts from `.opencode/skills/`.
- [x] 2.2 Update the agent's core context to incorporate newly learned skill instructions.
- [x] 2.3 Add a tool for the agent to explicitly "learn" a skill by name or path.

## 3. MCP Integration

- [x] 3.1 Implement a robust `MCPClient` to manage connections to multiple MCP servers.
- [x] 3.2 Implement dynamic tool discovery from connected MCP servers.
- [x] 3.3 Create a mapping layer to expose MCP tools as standard agent tools.

## 4. Web Search Skill

- [x] 4.1 Define the `web-search` skill artifact in `.opencode/skills/web-search/`.
- [x] 4.2 Configure the `web-search` skill to use a Google Search or DuckDuckGo MCP server.
- [x] 4.3 Verify the agent can fetch real-time information through the new search skill.

## 5. Verification and Polishing

- [x] 5.1 Write unit tests for `SkillManager` and `MCPClient`.
- [x] 5.2 Conduct end-to-end testing of the "learn skill" workflow.
- [x] 5.3 Verify that MCP tool execution handles errors and timeouts gracefully.
