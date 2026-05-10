# Codex Scripting & Batch Tasks

Automate bulk code tasks by scripting Codex across files and repos.

## Core Pattern

Codex accepts tasks via CLI argument or stdin, making it easy to script:

```bash
# Single task
codex --approval-mode full-auto "add jsdoc to all exported functions in src/lib/"

# Task from variable
TASK="Convert all callback functions in src/ to async/await"
codex --approval-mode full-auto "$TASK"

# Task from stdin
echo "Fix the TODO on line 42 of src/api/users.ts" | codex --approval-mode full-auto
```

## Batch: Process Multiple Files

```bash
#!/bin/bash
# Add missing return types to TypeScript functions, file by file

FILES=$(find src -name "*.ts" -not -path "*/node_modules/*" -not -name "*.d.ts")

for FILE in $FILES; do
  echo "Processing $FILE..."
  codex --approval-mode full-auto --quiet \
    "Add explicit TypeScript return types to all functions in $FILE that are missing them.
     Do not change any logic — only add type annotations."
  
  # Verify file still type-checks
  npx tsc --noEmit "$FILE" 2>&1 | grep -q "error" && \
    echo "Type error introduced in $FILE — reverting" && \
    git checkout "$FILE"
done

echo "Done. Review changes with: git diff"
```

## Batch: Across Multiple Repos

```bash
#!/bin/bash
# Apply the same change to a list of repos

REPOS=(
  "~/projects/api-service"
  "~/projects/worker-service"
  "~/projects/frontend"
)

TASK="Update all fetch() calls to include error handling — 
      wrap in try/catch and log errors via the existing logger"

for REPO in "${REPOS[@]}"; do
  echo "--- Processing $REPO ---"
  cd "$REPO" || continue
  
  git checkout -b "codex/error-handling-$(date +%Y%m%d)"
  codex --approval-mode full-auto --quiet "$TASK"
  npm test && git commit -am "feat: add error handling to fetch calls" || \
    echo "Tests failed in $REPO — skipping commit"
  
  cd - > /dev/null
done
```

## Batch: Generate Tests for New Files

```bash
#!/bin/bash
# Find files without test coverage and generate tests

UNTESTED=$(comm -23 \
  <(find src -name "*.ts" -not -name "*.test.ts" | sed 's|src/||;s|\.ts$||' | sort) \
  <(find src -name "*.test.ts" | sed 's|src/||;s|\.test\.ts$||' | sort))

for MODULE in $UNTESTED; do
  SOURCE="src/${MODULE}.ts"
  TEST="src/${MODULE}.test.ts"
  
  echo "Generating tests for $SOURCE..."
  codex --approval-mode full-auto \
    "Write a Jest test file for $SOURCE.
     Save it to $TEST.
     Cover: happy path for each exported function, error cases, and edge cases.
     Use Testing Library patterns consistent with the existing test files."
done
```

## Scripting with jq (JSON output)

For programmatic processing, capture Codex output:

```bash
# Audit: ask Codex to output structured JSON
codex --approval-mode suggest \
  "Audit src/api/ for missing input validation. 
   Output ONLY a JSON array: [{file, line, issue, severity}]" \
  | tee audit.json

# Process with jq
jq '.[] | select(.severity == "high")' audit.json
```

## Safety Checklist for Scripts

- [ ] Working in a git branch, not main
- [ ] Tests run after each Codex call
- [ ] Failures revert the file (`git checkout <file>`)
- [ ] Script is idempotent — safe to run twice
- [ ] `--quiet` flag used to suppress unnecessary output in CI
- [ ] OPENAI_API_KEY set in environment, not hardcoded
- [ ] Task strings are hardcoded or sanitised — never from untrusted input
