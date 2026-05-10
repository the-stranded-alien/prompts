# Codex File Editing

Best practices for directing Codex to make precise, minimal file edits.

## Core Principle

Codex produces better edits when you describe **what** to change, not **how** to rewrite.

## Patterns for Precise Edits

### Add a function
```
Add a function `formatCurrency(amount: number, currency: string): string` 
to `src/lib/format.ts` after the existing `formatDate` function.
It should use Intl.NumberFormat with the provided currency code.
```

### Modify a function
```
In `src/api/users.ts`, in the `createUser` function:
- Add validation: reject if `email` doesn't contain '@'
- If validation fails, throw a new Error with message "Invalid email"
- Don't change anything else in the file
```

### Fix a bug
```
In `src/hooks/useAuth.ts` line 47, `user` can be null but is accessed without 
a null check on line 52. Add a null guard before line 52.
```

### Refactor (bounded)
```
Extract lines 80–120 from `src/pages/dashboard.tsx` into a new component 
`src/components/StatsPanel.tsx`. Export it as default. Import and use it 
in dashboard.tsx at the same location.
```

## Diff-Friendly Instructions

Codex edits are shown as diffs. Make your instructions produce minimal diffs:
- Don't ask to reformat code that isn't being changed
- Don't ask to rename variables that aren't relevant to the task
- Don't ask to add comments to unchanged code

## Handling Multiple Files

If a change spans files, describe them in dependency order:
```
1. Add type `UserRole = 'admin' | 'user'` to `src/types.ts`
2. Add `role: UserRole` field to the User interface in `src/types.ts`
3. Update `createUser` in `src/api/users.ts` to accept and save the role
4. Update the `UserForm` component in `src/components/UserForm.tsx` to 
   include a role selector dropdown
```

## What to Do When Codex Gets It Wrong

1. Point to the specific incorrect part: "Line 47 should use `??` not `||`"
2. Show the expected output: "The function should return `{id, email}` not `{id, email, password}`"
3. Tighten the scope: "Only change `validateEmail` — don't touch `validatePassword`"
