# Hooks Configuration Skill (Claude Code)

Configure hooks to automate tasks that run before or after Claude Code's tool calls.

## What Hooks Do

Hooks are shell commands that fire automatically at specific lifecycle events. They run outside Claude — in your shell — so they execute even when the agent is in the middle of a task.

## Hook Events

| Event | Fires When | Common Use |
|-------|-----------|-----------|
| `PreToolUse` | Before any tool call | Block risky commands, validate inputs |
| `PostToolUse` | After any tool call | Run linter, log actions, notify |
| `Stop` | When Claude stops | Show summary, run tests, send alert |
| `Notification` | On agent notification | Desktop alert, Slack ping |

## Configuration

Add to `.claude/settings.json` (project) or `~/.claude/settings.json` (global):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint --silent"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

## Practical Hook Recipes

### Auto-lint on every file write
```json
{ "matcher": "Write|Edit", "command": "npx eslint --fix {{file}}" }
```

### Run tests after Bash commands
```json
{ "matcher": "Bash", "command": "npm test --passWithNoTests" }
```

### Block `rm -rf` in Bash calls
```json
{ "matcher": "Bash", "command": "echo $CLAUDE_TOOL_INPUT | grep -q 'rm -rf' && exit 1 || exit 0" }
```

### Slack notification when Claude stops
```json
{ "event": "Stop", "command": "curl -X POST $SLACK_WEBHOOK -d '{\"text\":\"Claude Code finished task\"}'" }
```

### Log all tool calls to a file
```json
{ "matcher": ".*", "command": "echo \"$(date) $CLAUDE_TOOL_NAME\" >> ~/.claude/tool-log.txt" }
```

## Environment Variables in Hooks

| Variable | Contains |
|---------|---------|
| `CLAUDE_TOOL_NAME` | Name of the tool being called |
| `CLAUDE_TOOL_INPUT` | JSON-encoded tool input |
| `CLAUDE_TOOL_OUTPUT` | JSON-encoded tool output (PostToolUse only) |
