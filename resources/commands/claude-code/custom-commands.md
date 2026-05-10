# Custom Slash Commands

Build your own `/commands` for repeatable workflows and team standards.

## How It Works

Create markdown files in `.claude/commands/` (project) or `~/.claude/commands/` (global). Each file becomes a `/command-name` you can invoke in any session.

```
.claude/
  commands/
    deploy.md       → /deploy
    check.md        → /check
    standup.md      → /standup
```

## Basic Command

`.claude/commands/check.md`:
```markdown
Run the full pre-commit checklist:
1. `npm run lint` — fix any errors found
2. `npm run typecheck` — fix any type errors
3. `npm test` — confirm all tests pass
4. `git diff` — show me a summary of what changed

If any step fails, fix it before moving on.
```

Invoke: `/check`

## Commands with Arguments (`$ARGUMENTS`)

Use `$ARGUMENTS` as a placeholder for text passed after the command name.

`.claude/commands/explain.md`:
```markdown
Explain the following code clearly, assuming the reader is a mid-level engineer
who is unfamiliar with this part of the codebase:

$ARGUMENTS
```

Invoke: `/explain src/lib/auth.ts:47-82`

`.claude/commands/pr.md`:
```markdown
Create a pull request for the current branch.

Context provided: $ARGUMENTS

Steps:
1. Run `git log main..HEAD --oneline` to see all commits
2. Run `git diff main...HEAD --stat` to see changed files
3. Write a PR title (under 70 chars) and body with summary + test plan
4. Run `gh pr create` with the title and body
```

Invoke: `/pr fixes the null pointer in auth middleware`

## Team Shared Commands

Commit `.claude/commands/` to your repo — everyone on the team gets the same commands:

```
.claude/
  commands/
    deploy.md         # /deploy — run the deploy checklist
    review.md         # /review — project-specific review rules
    migrate.md        # /migrate — DB migration workflow
    incident.md       # /incident — incident response steps
```

## Global Personal Commands

Store in `~/.claude/commands/` for commands you want everywhere:

```
~/.claude/commands/
  standup.md          # /standup — generate a standup from git log
  explain.md          # /explain — explain code
  commit.md           # /commit — write a good commit message
```

## Real-World Examples

### `/standup`
```markdown
Generate my standup update from today's work.

Run `git log --since="24 hours ago" --author="$(git config user.name)" --oneline`

Then write a standup in this format:
**Yesterday:** [what was completed]
**Today:** [what's in progress / next]
**Blockers:** [anything blocking, or "None"]
```

### `/security`
```markdown
Run a security check on the current branch changes:
1. `git diff main...HEAD` — get all changed files
2. Check each changed file for: hardcoded secrets, SQL injection, missing auth guards, XSS
3. Report findings by severity. If none found, say "No security issues found."
```

### `/release`
```markdown
Prepare the release for version $ARGUMENTS:
1. Check CHANGELOG.md is updated
2. Run the full test suite
3. Run `npm run build` — confirm it succeeds
4. Bump version in package.json to $ARGUMENTS
5. Create a git tag: `git tag -a v$ARGUMENTS -m "Release v$ARGUMENTS"`
6. Show the final checklist of what was done
```
