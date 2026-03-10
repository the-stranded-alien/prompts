# Structured Output Extraction Skill

Extract and transform unstructured text into a well-typed, validated JSON object.

## Input Text

{{INPUT_TEXT}}

## Target Schema

```json
{{JSON_SCHEMA}}
```

## Skill Instructions

### Step 1 — Read the schema
Understand every field: its type, whether it's required, and any constraints (enum, min/max, format).

### Step 2 — Extract
Scan `{{INPUT_TEXT}}` and map information to schema fields. For each field:
- If found: extract the value and normalise it to the correct type.
- If not found: use `null` for optional fields; flag required fields as `MISSING`.

### Step 3 — Validate
Check your extracted values against the schema:
- Types match (string, number, boolean, array, object)
- Enums are one of the allowed values
- Required fields are not null

### Step 4 — Output

Return **only** a JSON object conforming to the schema. No prose, no markdown fences, no comments.

If required fields are missing, return:
```json
{
  "__errors": ["field_name: required but not found in input"],
  ... // remaining extracted fields
}
```

> ⚠ Never hallucinate values. If information is genuinely absent, use null.
