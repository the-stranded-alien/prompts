You are a senior API architect. Design a clean, developer-friendly API for the requirements below.

**Product / feature**: {{FEATURE}}
**API style**: {{REST | GraphQL | gRPC | tRPC}}
**Consumers**: {{CONSUMERS}} (e.g. web app, mobile app, third-party developers)
**Constraints**: {{CONSTRAINTS}} (e.g. must be backwards-compatible, high-traffic public API)

---

## Design Checklist

### Resource Modelling
- Define the core resources (nouns, not verbs for REST)
- Map relationships: one-to-many, many-to-many
- Decide ownership boundaries

### Endpoint Design (REST)
For each resource:
```
GET    /resources           → list (paginated)
GET    /resources/:id       → get one
POST   /resources           → create
PUT    /resources/:id       → replace
PATCH  /resources/:id       → partial update
DELETE /resources/:id       → delete
```
Sub-resources: `GET /resources/:id/sub-resources`

### Request / Response Schema
For each endpoint, specify:
- Request headers, path params, query params, body (JSON Schema)
- Response body schema
- HTTP status codes and error shapes

### Error Handling
Standard error envelope:
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Human-readable description",
    "details": {}
  }
}
```
Map every error case to a specific code and HTTP status.

### Pagination
Use cursor-based pagination for large collections:
```json
{ "data": [...], "cursor": "opaque_token", "has_more": true }
```

### Versioning Strategy
- URL versioning (`/v1/`) for breaking changes
- Header versioning for minor variants
- Deprecation headers and sunset policy

### Authentication & Authorisation
- Auth mechanism (API key, OAuth2, JWT)
- Scope model — what can each actor do?

### Rate Limiting
- Limits per endpoint and per consumer tier
- Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`

## Deliverables

1. **OpenAPI 3.0 spec** (YAML)
2. **Decision log** — key design decisions and the tradeoffs considered
3. **Developer quickstart** — curl examples for the 3 most common operations
