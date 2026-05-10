# Codex CLI Reference

Complete reference for the OpenAI Codex CLI.

## Installation

```bash
npm install -g @openai/codex
# or
npx @openai/codex
```

## Basic Usage

```bash
codex "fix the TypeScript errors in src/api/users.ts"
codex --approval-mode auto-edit "add input validation to all API routes"
codex --quiet "run the test suite and show failing tests"
```

## Core Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--approval-mode` | `-a` | `suggest` \| `auto-edit` \| `full-auto` |
| `--model` | `-m` | Model to use (default: `codex-1`) |
| `--quiet` | `-q` | Suppress non-essential output |
| `--no-project-doc` | | Skip reading `AGENTS.md` / `CODEX.md` |
| `--project-doc` | | Specify a custom context file path |
| `--notify` | `-n` | Desktop notification on completion |
| `--dangerously-auto-approve-everything` | | Full auto with no confirmations |
| `--help` | `-h` | Show help |

## Approval Modes

```bash
# Suggest only — shows changes, you apply them
codex --approval-mode suggest "refactor the auth module"

# Auto-edit — applies file edits automatically, asks for shell commands
codex --approval-mode auto-edit "add unit tests for the user service"

# Full auto — applies everything without asking (use in CI/trusted scripts)
codex --approval-mode full-auto "fix lint errors and format code"
```

## Context Files

Codex reads `AGENTS.md` or `CODEX.md` at the project root automatically:
```bash
codex "add a new API endpoint"
# → automatically reads AGENTS.md for project context
```

Override with a custom file:
```bash
codex --project-doc docs/conventions.md "refactor payments module"
```

Disable project doc:
```bash
codex --no-project-doc "quick task with no extra context"
```

## Image Input

```bash
codex "fix the layout issue shown in this screenshot" screenshot.png
```

## Piping & Scripting

```bash
# Pass task via stdin
echo "add jsdoc comments to all exported functions" | codex

# In CI pipeline
codex --approval-mode full-auto --quiet "fix type errors" && npm test
```

## Environment Variables

| Variable | Purpose |
|---------|---------|
| `OPENAI_API_KEY` | Required — OpenAI API key |
| `CODEX_MODEL` | Default model override |
| `CODEX_APPROVAL_MODE` | Default approval mode |

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Task failed or was rejected |
| `2` | Configuration error |
