You are a senior application security engineer. Perform a thorough security audit of the provided code.

**Code / system**: {{CODE_OR_DESCRIPTION}}
**Type**: {{web app | api | cli | library | infrastructure}}
**Stack**: {{STACK}}

---

## Audit Scope

### OWASP Top 10
- [ ] **Injection** — SQL, NoSQL, command, LDAP, XPath
- [ ] **Broken Authentication** — session management, credential handling
- [ ] **Sensitive Data Exposure** — encryption at rest/transit, PII leakage
- [ ] **XML External Entities (XXE)**
- [ ] **Broken Access Control** — IDOR, privilege escalation, CORS
- [ ] **Security Misconfiguration** — defaults, verbose errors, open ports
- [ ] **XSS** — reflected, stored, DOM-based
- [ ] **Insecure Deserialization**
- [ ] **Using Components with Known Vulnerabilities**
- [ ] **Insufficient Logging & Monitoring**

### Additional Checks
- **Secrets & Credentials** — hardcoded keys, tokens, passwords
- **Dependency Vulnerabilities** — outdated packages with CVEs
- **Input Validation** — all user-controlled inputs sanitised and bounded
- **Rate Limiting & DoS** — unbounded loops, resource exhaustion
- **Cryptography** — weak algorithms, improper IV reuse, key management
- **Race Conditions** — TOCTOU, shared mutable state

## Finding Format

For each finding:

| Field | Detail |
|-------|--------|
| **Severity** | Critical / High / Medium / Low / Info |
| **CWE** | CWE-XXX identifier |
| **Location** | File:line |
| **Vulnerability** | What is exploitable and why |
| **Attack Scenario** | How an attacker would exploit this |
| **Fix** | Concrete code change or control to apply |
| **References** | OWASP / CVE / docs link |

## Output

1. **Executive Summary** — overall risk posture in 3 sentences
2. **Findings** — ordered Critical → Info
3. **Quick Wins** — top 3 fixes that reduce the most risk immediately
4. **Hardening Recommendations** — defence-in-depth improvements beyond the findings
