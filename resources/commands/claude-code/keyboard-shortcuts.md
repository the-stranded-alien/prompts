# Claude Code Keyboard Shortcuts

Full reference for keyboard shortcuts in the Claude Code CLI and IDE extensions.

## CLI Shortcuts

### Navigation & Control

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation / interrupt generation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+L` | Clear the screen |
| `↑` / `↓` | Navigate input history |
| `Tab` | Autocomplete file paths and slash commands |

### Input Editing

| Shortcut | Action |
|----------|--------|
| `Ctrl+A` | Move cursor to start of line |
| `Ctrl+E` | Move cursor to end of line |
| `Ctrl+K` | Delete from cursor to end of line |
| `Ctrl+U` | Delete entire current line |
| `Ctrl+W` | Delete previous word |
| `Opt+←` / `Opt+→` | Move by word (macOS) |

### Multi-line Input

| Shortcut | Action |
|----------|--------|
| `Shift+Enter` | New line (doesn't submit) |
| `Enter` | Submit message |
| `Escape` | Cancel current multi-line input |

### Generation Control

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Stop generation mid-stream |
| `Escape` | Reject the last tool call (when prompted) |

## VS Code Extension Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+C` | Open Claude Code panel |
| `Cmd+Shift+.` | Accept suggestion |
| `Escape` | Dismiss suggestion |
| `Tab` | Cycle through suggestions |

## JetBrains Extension Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+C` | Open Claude Code |
| `Alt+Enter` | Accept inline suggestion |
| `Escape` | Dismiss |

## Customising Shortcuts

Edit `~/.claude/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+enter",
    "command": "submit",
    "description": "Submit with Ctrl+Shift+Enter instead of Enter"
  },
  {
    "key": "ctrl+r",
    "command": "slash:review",
    "description": "Quick access to /review"
  }
]
```

## Tips

- Use `Tab` to autocomplete `#filename` references — faster than typing full paths
- `↑` in the prompt recalls the last message — useful for refining a request
- `Ctrl+C` twice exits cleanly if you're stuck in a tool loop
