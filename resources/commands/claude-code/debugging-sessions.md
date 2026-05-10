# Debugging Claude Code Sessions

How to recover from stuck agents, wrong directions, and unexpected edits.

## The Most Important Tool: Ctrl+C

If Claude is doing something wrong, **interrupt immediately**. Don't wait for it to finish — each additional tool call may compound the problem.

```
Ctrl+C   ← stop generation mid-stream
```

Then assess the damage with `git diff` before asking Claude to continue.

## Recovering from Wrong Edits

### Discard all uncommitted changes
```bash
git checkout .          # restore all tracked files
git clean -fd           # remove untracked files (ask first)
```

### Undo the last few commits (if already committed)
```bash
git log --oneline -5    # see what was committed
git revert HEAD         # undo the last commit, preserving history
git reset HEAD~1        # undo last commit, keep changes staged
```

### Cherry-pick the good parts
```bash
git stash               # stash current state
git checkout main       # back to known good state
git stash pop           # reapply, then selectively stage good changes
```

## When Claude Gets Stuck in a Loop

Signs: Claude keeps trying the same failing approach, or oscillates between two wrong states.

**Break the loop:**
```
Stop. Let's restart this approach entirely.

The problem we're trying to solve is: [restate clearly]
The constraints are: [list explicitly]
What's wrong with the current state: [describe]

Before touching any code, tell me your new plan.
```

**Force a fresh perspective:**
```
Pretend you're seeing this codebase for the first time.
Read the error message again carefully and describe exactly what it says.
```

## When Claude Misunderstands the Task

Don't patch — restart with better framing:

```
I need to back up. The task I actually need is:
[clear, specific description]

The approach from the last N messages was wrong because:
[explain the misunderstanding]

Please start from scratch with this understanding.
```

## When Tool Calls Keep Failing

If a specific tool (Bash, Edit) keeps erroring:

1. **Check permissions** — does Claude have access to that path?
2. **Check the working directory** — `! pwd` to confirm
3. **Run the command yourself** — `! <failing-command>` to see the real error
4. **Narrow the scope** — break the failing command into smaller pieces

## Diagnostic Commands

Run these yourself to give Claude better grounding:

```
! git status             # what's actually changed?
! git diff               # exact diff of all changes
! npm test 2>&1 | tail   # what's actually failing?
! node -e "require('./src/lib/auth')"  # does the module even load?
```

Then paste the output and ask Claude to reason from the actual state.

## The "Fresh Eyes" Reset

When a session has gone off the rails:

```
Let's do a full reset. I'll tell you the current state:

Files changed: [list from git diff]
Current error: [paste exact error]
What I actually need: [clear goal]

Forget everything from this session. Starting fresh, what's your plan?
```

## Prevention

- Run `git diff` after every significant set of changes
- Keep tasks small and verify before moving on
- Tell Claude explicitly: "Don't write any code yet — just tell me your plan first"
- Use `--dangerously-skip-permissions` only in known-safe, automated contexts
