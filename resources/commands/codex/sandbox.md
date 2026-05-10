# Codex Sandbox & Environment

How the Codex execution sandbox works — what it can and can't access.

## The Sandbox Model

When Codex runs, it executes in a sandboxed environment with controlled access to your filesystem and network. The goal: let Codex do real work while preventing accidental or malicious damage to your system or external services.

## What Codex Can Access

### Filesystem
- **Read**: any file in the working directory and below
- **Write/Edit**: files in the working directory (with your approval in suggest/auto-edit modes)
- **Create**: new files in the working directory
- **Does NOT access**: files outside the project directory without explicit permission

### Shell Commands
Codex can run shell commands to:
- Run tests (`npm test`, `pytest`, etc.)
- Run linters (`eslint`, `ruff`, etc.)
- Run build tools (`npm run build`, `cargo build`, etc.)
- Query git status, log, diff
- Read system info (`node --version`, `uname`, etc.)

### Network Access

By default, Codex has **no outbound network access**. This prevents:
- Accidental API calls to production services
- Package downloads during a task (unless explicitly approved)
- Exfiltration of code or credentials

**To enable network access** (full-auto mode only):
```bash
codex --approval-mode full-auto --allow-network "add the stripe payment integration"
```

Use sparingly. Prefer to have Codex write the code and run `npm install` yourself.

## Approval Mode × Sandbox Interaction

| Mode | File edits | Shell commands | Network |
|------|-----------|----------------|---------|
| `suggest` | You apply | You approve each | No |
| `auto-edit` | Auto-applied | You approve each | No |
| `full-auto` | Auto-applied | Auto-executed | No (unless --allow-network) |

## Working Directory Scoping

Codex always operates relative to the directory where you launched it:

```bash
cd ~/projects/my-app && codex "fix the API routes"
# Codex sees: ~/projects/my-app/**
# Does NOT see: ~/projects/other-app/** or ~/secrets/
```

For monorepos, launch from the package subdirectory to scope Codex to that package:

```bash
cd packages/payments && codex "add webhook validation"
```

## Sensitive Files

Codex will read `.env` and `.env.local` if they're in the working directory — because it needs to understand environment variables to give accurate advice.

**Recommendations:**
- Use `.env.example` with dummy values for committed reference
- Keep real secrets in `.env.local` (gitignored)
- Be aware that Codex may suggest using env var names it reads from these files

## Resource Limits

| Resource | Limit |
|---------|-------|
| Execution time per command | ~30 seconds (default) |
| Output per command | Truncated after ~10,000 chars |
| Total session length | Limited by context window |

Long-running commands (e.g., a full test suite) may time out. Break them into smaller commands or run them yourself with `! command`.
