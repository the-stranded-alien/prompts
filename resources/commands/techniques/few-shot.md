# Few-Shot Prompting

Design high-signal examples that guide model behaviour.

## What It Is

Provide 2–8 input/output examples before your actual request. The model infers the pattern and applies it to new inputs — without being explicitly told the rules.

## Basic Structure

```
Example 1:
Input: [example input 1]
Output: [desired output 1]

Example 2:
Input: [example input 2]
Output: [desired output 2]

---

Now:
Input: [your actual input]
Output:
```

## When Few-Shot Beats Zero-Shot

- Output format is hard to describe but easy to show
- Style or tone needs to be precise
- Classification with nuanced labels
- Extraction with specific schema
- When zero-shot gives inconsistent results

## Designing Good Examples

### Coverage
Include examples that cover the range of inputs, especially edge cases:
```
Example 1: normal case
Example 2: edge case (empty, null, unusual)
Example 3: common failure mode (what the model often gets wrong)
```

### Consistency
Every example must follow the exact same output format. One inconsistent example confuses the model more than having fewer examples.

### Relevance
Examples should be similar to the real task — don't use unrelated examples just to have more of them.

### Order
Put the most representative example last — the model gives more weight to recent context.

## Example: Sentiment Classification

```
Review: "This product changed my life, absolutely love it!"
Sentiment: positive

Review: "Arrived damaged and support never responded."
Sentiment: negative

Review: "It's okay. Does what it says, nothing more."
Sentiment: neutral

---

Review: "Fantastic build quality but the software is a disaster."
Sentiment:
```

## Example: JSON Extraction

```
Text: "John Smith, 42, joined the company on March 5th 2023."
JSON: {"name": "John Smith", "age": 42, "join_date": "2023-03-05"}

Text: "Sarah Connor (28) started her role as lead engineer last Monday."
JSON: {"name": "Sarah Connor", "age": 28, "join_date": null}

---

Text: "{{YOUR_TEXT}}"
JSON:
```

## Anti-Patterns

- **Too many examples**: 2–5 is usually enough; more causes distraction
- **Inconsistent format**: if example 1 uses `{"key": value}` and example 2 uses `key: value`, you'll get inconsistent output
- **Misleading examples**: examples that don't reflect the real input distribution cause the model to over-fit to the wrong pattern
