# MCP Setup Guide

Step-by-step setup for the most useful MCP servers with Claude Code.

## What is MCP?

Model Context Protocol (MCP) lets Claude Code call tools from external servers — databases, APIs, file systems, and custom services. Tools appear in Claude's tool list just like built-in tools.

## Quick Setup

```bash
# Add via CLI
claude mcp add server-name -- npx -y @server/package

# Add with env vars
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres \
  --env POSTGRES_URL="$DATABASE_URL"

# List active servers
claude mcp list

# Remove a server
claude mcp remove server-name
```

---

## PostgreSQL

```bash
claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres \
  --env POSTGRES_URL="postgresql://user:pass@localhost:5432/mydb"
```

**Tools available**: query, describe tables, list schemas

**Usage**: "Query the users table for accounts created in the last 7 days"

---

## GitHub

```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github \
  --env GITHUB_TOKEN="$GITHUB_TOKEN"
```

**Tools available**: list PRs, read PR diff, create/comment on issues, search code

**Usage**: "Show me all open PRs that touch the auth module"

---

## Filesystem (scoped)

```bash
claude mcp add files -- npx -y @modelcontextprotocol/server-filesystem /workspace /docs
```

**Tools available**: read, write, list files within allowed directories

**Note**: More controlled than Claude Code's native file access — useful for scoped agent tasks

---

## Brave Search

```bash
claude mcp add search -- npx -y @modelcontextprotocol/server-brave-search \
  --env BRAVE_API_KEY="$BRAVE_API_KEY"
```

**Usage**: "Search for recent CVEs in express@4.18"

---

## Slack

```bash
claude mcp add slack -- npx -y @modelcontextprotocol/server-slack \
  --env SLACK_BOT_TOKEN="$SLACK_BOT_TOKEN" \
  --env SLACK_TEAM_ID="$SLACK_TEAM_ID"
```

**Tools available**: list channels, read messages, post messages

---

## Custom MCP Server

Create a custom server in any language. Minimal Node.js example:

```javascript
// server.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
const server = new Server({ name: "my-tools", version: "1.0.0" });

server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "my_tool",
    description: "Does something useful",
    inputSchema: { type: "object", properties: { input: { type: "string" } } }
  }]
}));

server.setRequestHandler("tools/call", async (req) => {
  if (req.params.name === "my_tool") {
    return { content: [{ type: "text", text: `Result: ${req.params.arguments.input}` }] };
  }
});
```

Register: `claude mcp add my-tools -- node /path/to/server.js`

## Scope Control

Control which MCP tools run without permission prompts in `.claude/settings.json`:
```json
{
  "permissions": {
    "allow": ["mcp__postgres__query", "mcp__github__list_pull_requests"]
  }
}
```
