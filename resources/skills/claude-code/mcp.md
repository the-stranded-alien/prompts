# MCP Server Patterns (Claude Code)

Connect Model Context Protocol (MCP) servers to give Claude Code access to external tools and data.

## What MCP Does

MCP lets Claude Code call tools served by external processes — databases, APIs, file systems, and custom services. Claude discovers available tools at startup and can call them during any task.

## Adding an MCP Server

In `.claude/settings.json`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {
        "API_KEY": "${MY_API_KEY}"
      }
    }
  }
}
```

Or via CLI: `claude mcp add my-server npx -y @modelcontextprotocol/server-name`

## Commonly Used MCP Servers

### Databases
```json
"postgres": {
  "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres"],
  "env": { "POSTGRES_URL": "${DATABASE_URL}" }
}
```

### GitHub
```json
"github": {
  "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
}
```

### Filesystem (scoped)
```json
"files": {
  "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
}
```

### Brave Search
```json
"search": {
  "command": "npx", "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "env": { "BRAVE_API_KEY": "${BRAVE_API_KEY}" }
}
```

### Slack
```json
"slack": {
  "command": "npx", "args": ["-y", "@modelcontextprotocol/server-slack"],
  "env": { "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}" }
}
```

## Scope Control

Restrict which MCP tools Claude can use without asking:
```json
{
  "permissions": {
    "allow": ["mcp__postgres__query", "mcp__github__list_prs"],
    "deny": ["mcp__postgres__execute", "mcp__github__push"]
  }
}
```

## Debugging MCP

```bash
claude mcp list          # show all configured servers
claude mcp get my-server # show server config and status
/mcp                     # in-session: list all MCP tools available
```
