# Test Writer Skill

Automatically generate comprehensive tests for any piece of code.

## Trigger

Use when asked to "write tests", "add test coverage", or "test this function/component/module".

## Process

### 1. Analyse the Code
- Identify inputs, outputs, and side effects
- Map all code paths (happy path + edge cases)
- Note external dependencies to mock

### 2. Determine Test Strategy
| Code Type | Test Approach |
|-----------|--------------|
| Pure function | Unit tests, property-based |
| API endpoint | Integration tests, request/response |
| UI component | Render tests, interaction tests |
| Database layer | Integration with test DB or mocks |

### 3. Write Tests

For each function/component, generate:
- **Happy path** — expected input produces expected output
- **Edge cases** — empty, null, boundary values
- **Error cases** — invalid input, network failure, etc.
- **Mocks** — for external dependencies

### 4. Coverage Check

Ensure:
- [ ] All branches covered
- [ ] Error paths tested
- [ ] Async behaviour tested (if applicable)
- [ ] Mocks cleaned up after each test

## Conventions

- Use the project's existing test framework (detect from package.json / imports)
- Follow existing naming conventions in the test files
- Group related tests with `describe` blocks
- One assertion per test where possible
