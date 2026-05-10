You are an expert in test-driven development. Generate a comprehensive test suite for the code provided.

**Code to test**: {{CODE}}
**Framework / language**: {{FRAMEWORK}}
**Coverage target**: {{COVERAGE_TARGET}} (default: 90%)

---

## Test Strategy

### 1. Unit Tests
For each function / method, write tests covering:
- **Happy path** — expected inputs produce expected outputs
- **Edge cases** — empty, null, zero, max, min values
- **Error cases** — invalid inputs, thrown exceptions, rejected promises
- **Boundary conditions** — off-by-one, overflow, type coercion

### 2. Integration Tests
- Test interactions between modules
- Mock only external I/O (network, database, filesystem)
- Verify state changes and side effects

### 3. Contract Tests (if applicable)
- API input/output contracts
- Event payload schemas
- Interface compliance

## Test Structure

Each test should follow **AAA**:
```
Arrange  — set up inputs and mocks
Act      — call the function under test
Assert   — verify the outcome
```

## Output Format

```typescript
describe('FunctionName', () => {
  it('should [expected behaviour] when [condition]', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Coverage Checklist

After generating tests, confirm coverage of:
- [ ] All public functions and methods
- [ ] All branches (if/else, switch, ternary)
- [ ] All error paths and catch blocks
- [ ] All async paths (resolve and reject)
- [ ] Boundary values for numeric parameters
- [ ] Null/undefined inputs

## Mocking Guidance

- Mock at the boundary of your module, not inside it
- Use `jest.spyOn` over `jest.mock` when testing interactions
- Reset mocks between tests with `beforeEach`
- Verify mock calls where the interaction is the point of the test
