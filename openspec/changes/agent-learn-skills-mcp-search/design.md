## Context

The current agent relies on a static set of tools and instructions. To improve its versatility and access to real-time information, it needs a way to discover new capabilities (skills) and interact with external tool-providing servers via the Model Context Protocol (MCP).

## Goals / Non-Goals

**Goals:**
- Implement a `SkillManager` to dynamically load specialized workflows and rules from a skill directory.
- Integrate an MCP client that can connect to various servers (stdio, SSE) and expose their tools to the agent.
- Create a standard `web-search-skill` that leverages MCP search tools.

**Non-Goals:**
- Building a full MCP server (out of scope, we are the client).
- Implementing a persistent database for learned skills (memory-only for now).

## Decisions

- **MCP Client SDK**: Use the official `@modelcontextprotocol/sdk` to handle protocol compliance and transport.
- **Skill Discovery**: Skills will be discovered in a local `.opencode/skills/` directory, following a standard structure (SKILL.md, scripts/).
- **Tool Mapping**: Tools discovered via MCP will be dynamically mapped to the agent's tool-calling interface.

## Risks / Trade-offs

- **[Risk] Security of Dynamic Skills** → **Mitigation**: Only load skills from trusted local directories.
- **[Risk] MCP Server Latency** → **Mitigation**: Implement timeouts and informative error messages if a server is slow or unreachable.
- **[Risk] Dependency Bloat** → **Mitigation**: Only add necessary MCP-related packages.
