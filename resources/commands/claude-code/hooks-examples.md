# Claude Code Hooks Examples

Ready-to-use hooks for common automation patterns.

## Setup

Add hooks to `.claude/settings.json` (project) or `~/.claude/settings.json` (global):

```json
{
  "hooks": {
    "PostToolUse": [...],
    "PreToolUse": [...],
    "Stop": [...]
  }
}
```

---

## Auto-Lint on File Write

Run ESLint after every file change:

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "npx eslint --fix \"$CLAUDE_TOOL_OUTPUT_PATH\" 2>/dev/null || true"
    }]
  }]
}
```

## Run Tests After Code Changes

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "npm test -- --passWithNoTests --bail 2>&1 | tail -5"
    }]
  }]
}
```

## Desktop Notification When Claude Finishes

macOS:
```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "osascript -e 'display notification \"Task complete\" with title \"Claude Code\" sound name \"Glass\"'"
    }]
  }]
}
```

Linux (notify-send):
```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "notify-send 'Claude Code' 'Task complete'"
    }]
  }]
}
```

## Block Dangerous Bash Commands

```json
{
  "PreToolUse": [{
    "matcher": "Bash",
    "hooks": [{
      "type": "command",
      "command": "echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; cmd=json.load(sys.stdin).get('command',''); exit(1 if any(p in cmd for p in ['rm -rf /', 'DROP TABLE', 'format C:']) else 0)\""
    }]
  }]
}
```

## Log All Tool Calls

```json
{
  "PostToolUse": [{
    "matcher": ".*",
    "hooks": [{
      "type": "command",
      "command": "echo \"$(date -u +%Y-%m-%dT%H:%M:%SZ) $CLAUDE_TOOL_NAME\" >> ~/.claude/tool-log.txt"
    }]
  }]
}
```

## Type-Check After TypeScript Edits

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "npx tsc --noEmit 2>&1 | grep 'error TS' | head -5"
    }]
  }]
}
```

## Slack Notification on Completion

```json
{
  "Stop": [{
    "hooks": [{
      "type": "command",
      "command": "curl -s -X POST $SLACK_WEBHOOK_URL -H 'Content-type: application/json' -d '{\"text\":\"Claude Code finished a task in '$(basename $PWD)'\"}'"
    }]
  }]
}
```

## Auto-Format Python with Black

```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; f=json.load(sys.stdin).get('file_path',''); exec(open('/dev/null').read()) if not f.endswith('.py') else __import__('subprocess').run(['black', f])\" 2>/dev/null || true"
    }]
  }]
}
```
