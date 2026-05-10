# Security Review Skill (Claude Code)

Use `/security-review` to run a dedicated security audit on changed code.

## Trigger

```bash
/security-review                  # audit all changes on current branch
/security-review src/api/         # scope to a specific directory
```

## What It Audits

Claude Code performs a targeted security review focused on:

### Injection
- SQL / NoSQL injection via unsanitised user input
- Command injection in shell calls
- Template injection in server-rendered output
- XSS via unescaped output to HTML/JS

### Authentication & Authorisation
- Missing auth guards on new routes/endpoints
- Privilege escalation — can a lower-privilege user call this?
- Session fixation or insecure token handling
- CORS misconfiguration

### Secrets & Data Exposure
- Hardcoded API keys, passwords, or tokens
- PII logged or returned in error messages
- Sensitive data in URLs (query params, path params)
- Overly broad API responses exposing internal fields

### Dependency & Supply Chain
- New packages with known CVEs
- Packages with suspicious provenance
- Outdated dependencies with security patches available

### Cryptography
- Weak algorithms (MD5, SHA1 for security, ECB mode)
- Hardcoded IV or salt
- Client-side only validation

## Output

Each finding includes:
- **Severity**: Critical / High / Medium / Low
- **CWE**: common weakness identifier
- **Location**: file + line
- **Exploit scenario**: how an attacker could use this
- **Fix**: concrete code change

## Integration

Add to your pre-PR workflow:
```
1. git push branch
2. /security-review         ← catch security issues before review
3. /review                  ← full code quality review
4. Open PR
```
