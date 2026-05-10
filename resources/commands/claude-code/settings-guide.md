# Claude Code Settings & Permissions

Master reference for Claude Code configuration.

## Config File Locations

| File | Scope | Use For |
|------|-------|---------|
| `~/.claude/settings.json` | Global (all projects) | Personal preferences, global tools |
| `.claude/settings.json` | Project (shared) | Team-shared project config |
| `.claude/settings.local.json` | Project (local, gitignored) | Personal overrides per project |

Later files override earlier ones. `settings.local.json` always wins.

## Key Settings

```json
{
  "model": "claude-opus-4-7",
  "theme": "dark",
  "verbose": false,
  "autoUpdates": true,
  "permissions": {
    "allow": [],
    "deny": []
  },
  "hooks": {},
  "mcpServers": {},
  "env": {}
}
```

## Permission Modes

Run Claude Code with different trust levels:

| Flag | Mode | Behaviour |
|------|------|---------|
| (default) | Normal | Asks before tools with side effects |
| `--dangerously-skip-permissions` | Auto-approve | Never asks — use only in trusted automation |
| `--no-tools` | Read-only | No tool calls, pure chat |

## Allow / Deny Specific Tools

Avoid repetitive prompts for safe operations:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm test:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Read",
      "mcp__postgres__query"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

Pattern syntax:
- `Tool` — allow/deny the entire tool
- `Tool(command:*)` — Bash prefix match on command
- `mcp__server__tool` — specific MCP tool

## Environment Variables

Inject env vars into Claude Code's session:

```json
{
  "env": {
    "NODE_ENV": "development",
    "DATABASE_URL": "${DATABASE_URL}"
  }
}
```

`${VAR}` reads from your shell environment.

## Model Selection

```json
{ "model": "claude-opus-4-7" }
```

Or switch per-session: `/config model`

| Model | Best For |
|-------|---------|
| `claude-opus-4-7` | Complex reasoning, large codebases |
| `claude-sonnet-4-6` | Balanced — default for most tasks |
| `claude-haiku-4-5-20251001` | Fast iteration, simple tasks |

## CLAUDE.md

The most important config. Placed at project root (or any parent directory):
- Loaded into every session automatically
- Contains project conventions, architecture, commands
- Overrides anything in settings.json for natural language behaviour

Hierarchy: `~/.claude/CLAUDE.md` (global) → parent dirs → project root
