# CI/CD Pipeline Design

Design a complete CI/CD pipeline for the project described below.

**Project**: {{PROJECT_DESCRIPTION}}
**Stack**: {{STACK}}
**Target platform**: {{GitHub Actions | GitLab CI | CircleCI | Jenkins}}
**Environments**: {{dev | staging | production}}
**Team size**: {{TEAM_SIZE}}

---

## Pipeline Stages

### Stage 1 — CI (on every push / PR)

```yaml
ci:
  steps:
    - install: npm ci (cached)
    - lint: eslint + tsc --noEmit
    - unit-tests: jest --coverage
    - integration-tests: (against test DB)
    - security-scan: npm audit + SAST scan
    - build: production build artifact
```

**Quality gates** — pipeline fails if:
- Any lint error
- Test coverage drops below {{X}}%
- Any high/critical vulnerability in `npm audit`
- Build fails

### Stage 2 — Deploy to Staging (on merge to main)

```yaml
staging:
  needs: [ci]
  steps:
    - deploy: deploy artifact to staging environment
    - smoke-tests: hit key endpoints, assert 200s
    - e2e-tests: Playwright or Cypress critical paths
    - notify: Slack notification on success/failure
```

### Stage 3 — Deploy to Production (manual trigger or release tag)

```yaml
production:
  needs: [staging]
  environment: production
  steps:
    - approval: manual approval gate
    - deploy: blue/green or canary deploy
    - health-check: wait for healthy signal
    - smoke-tests: production smoke suite
    - rollback: auto-rollback if smoke fails
```

## GitHub Actions Template

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

  deploy-staging:
    needs: ci
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: ./scripts/deploy.sh staging
```

## Caching Strategy
- Cache `node_modules` by `package-lock.json` hash
- Cache Docker layers between builds
- Cache test results for unchanged files (Jest `--cache`)

## Secrets Management
- Store secrets in GitHub/GitLab secrets or a vault
- Never log secrets — set `::add-mask::` for dynamic secrets
- Rotate secrets regularly; use short-lived tokens where possible

## Observability
- Emit deploy events to your monitoring system
- Tag releases in your APM (Datadog, New Relic) on each deploy
- Keep a deployment log linked to the commit SHA
