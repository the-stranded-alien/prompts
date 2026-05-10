# Codex CI/CD Integration

Run Codex headlessly in GitHub Actions, GitLab CI, and automation scripts.

## Core Principle

In CI, Codex runs in `full-auto` mode — no human in the loop. This means:
- Tasks must be **precisely scoped** (vague tasks = broad changes)
- Always run in a **git branch** (never directly on main)
- Always run **tests after Codex finishes** to catch regressions
- The CI job should **fail loudly** if Codex introduces errors

## GitHub Actions: Auto-Fix Lint Errors

```yaml
name: Auto-fix lint

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  autofix:
    runs-on: ubuntu-latest
    if: contains(github.event.pull_request.labels.*.name, 'autofix')
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          ref: ${{ github.head_ref }}

      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }

      - run: npm ci

      - name: Run Codex to fix lint errors
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          npx @openai/codex --approval-mode full-auto --quiet \
            "Fix all ESLint errors reported by \`npm run lint\`. 
             Only fix what lint reports — do not refactor anything else."

      - name: Verify fixes don't break tests
        run: npm test

      - name: Commit fixes
        run: |
          git config user.name "Codex Bot"
          git config user.email "codex@ci"
          git diff --quiet || git commit -am "fix: auto-fix lint errors via Codex"
          git push
```

## GitHub Actions: Auto-Generate Tests

```yaml
- name: Generate missing tests with Codex
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  run: |
    npx @openai/codex --approval-mode full-auto \
      "Find all functions in src/lib/ that have no corresponding test file.
       For each, create a test file in src/lib/__tests__/ with unit tests 
       covering happy path and error cases. Use Jest."
```

## GitLab CI

```yaml
codex-autofix:
  image: node:20
  script:
    - npm ci
    - npx @openai/codex --approval-mode full-auto --quiet "$CODEX_TASK"
    - npm test
    - git diff --quiet || (git commit -am "fix: $CODEX_TASK" && git push)
  variables:
    OPENAI_API_KEY: $CI_OPENAI_API_KEY
  rules:
    - if: $CI_PIPELINE_SOURCE == "api"
```

## Safe CI Patterns

### Always gate with tests
```bash
npx @openai/codex --approval-mode full-auto "fix type errors" \
  && npm test \
  || (echo "Codex changes broke tests" && exit 1)
```

### Scope tightly with explicit file targets
```bash
npx @openai/codex --approval-mode full-auto \
  "Fix the TypeScript errors in src/api/users.ts only. Do not modify other files."
```

### Use a dedicated branch
```bash
git checkout -b codex/autofix-$(date +%Y%m%d)
npx @openai/codex --approval-mode full-auto "$TASK"
git push -u origin HEAD
gh pr create --title "Codex: $TASK" --body "Automated fix"
```

## Triggering via API (Remote Automation)

```bash
# Trigger a GitHub Actions workflow with a Codex task
gh workflow run codex-autofix.yml \
  -f task="Fix all TODO comments in src/ by implementing them or removing them"
```

## Security Considerations

- **Never pass user-supplied input** directly as the Codex task in CI — sanitise first
- **Limit OPENAI_API_KEY scope** — use a key with only the permissions needed
- **Review Codex PRs** before merging — full-auto + PR flow is safest for production codebases
- **Don't run full-auto on main** — always use a branch
