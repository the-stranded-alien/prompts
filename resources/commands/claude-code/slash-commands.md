# Claude Code Slash Commands

Complete reference for every built-in slash command.

## Core Commands

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/clear` | Clear conversation history (keeps context, fresh start) |
| `/compact` | Compress conversation to save context space |
| `/exit` or `/quit` | End the session |
| `/status` | Show current model, token usage, and session info |

## Code Commands

| Command | What it does |
|---------|-------------|
| `/review` | Full code review of the current branch vs main |
| `/review PR#123` | Review a specific GitHub pull request |
| `/security-review` | Security-focused audit of changed code |
| `/init` | Generate a CLAUDE.md for the current project |

## Configuration

| Command | What it does |
|---------|-------------|
| `/config` | Open the interactive settings menu |
| `/config model` | Switch the active model |
| `/config theme` | Switch light/dark/system theme |
| `/mcp` | List all active MCP servers and their tools |

## Context Management

| Command | What it does |
|---------|-------------|
| `#filename` | Load a file into context: `#src/api/users.ts` |
| `#foldername` | Load a folder: `#src/components/` |
| `@docs` | Reference documentation |

## Permissions

| Command | What it does |
|---------|-------------|
| `/permissions` | Show current permission settings |
| `/allow tool-name` | Allow a specific tool without prompting |
| `/deny tool-name` | Block a specific tool |

## Power Patterns

### Load context before a task
```
#src/lib/auth.ts #src/types/index.ts Refactor the token validation logic
```

### Review then ask follow-up
```
/review
Are there any security issues in the auth changes specifically?
```

### Chain commands
```
/init
/review
Now implement the changes the review suggested
```

## Custom Slash Commands

Define your own in `.claude/commands/`:
```markdown
<!-- .claude/commands/deploy.md -->
Run the deployment checklist:
1. npm run test
2. npm run build
3. Check for console.log statements
4. Verify environment variables are set
```
Invoke with `/deploy`.
