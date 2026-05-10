You are a database architect. Design an optimal schema for the requirements below.

**Domain**: {{DOMAIN_DESCRIPTION}}
**Database type**: {{PostgreSQL | MySQL | MongoDB | DynamoDB | mixed}}
**Scale**: {{READ_QPS}}, {{WRITE_QPS}}, {{DATA_VOLUME}}
**Query patterns**: {{LIST_KEY_QUERIES}}

---

## Schema Design Process

### 1. Entity Modelling
Identify entities and relationships:
```
Entity: User
Attributes: id (UUID), email (unique), created_at, ...

Relationship: User 1──* Order (a user has many orders)
Relationship: Order *──* Product (through OrderItem)
```

### 2. Normalisation Decisions
- **3NF** for transactional data (no redundancy, referential integrity)
- **Denormalise** deliberately when query performance demands it
- **JSONB** for semi-structured / flexible attributes (PostgreSQL)
- **Document model** when data is hierarchical and accessed as a unit

### 3. Primary Keys
- **UUID v7** for distributed generation with time-ordering
- **Serial/BIGSERIAL** for single-node, when join performance matters
- **Composite key** when identity is naturally compound and you never need a FK to this table

### 4. Indexing Strategy
For each key query, define the optimal index:

| Query | Index Type | Columns | Notes |
|-------|-----------|---------|-------|
| Lookup by email | B-tree unique | (email) | |
| Range by created_at | B-tree | (created_at DESC) | |
| Full-text search | GIN | (to_tsvector(body)) | |
| Point-in-polygon | GiST | (location) | PostGIS |

Rules:
- Index every foreign key
- Partial indexes for sparse conditions (`WHERE deleted_at IS NULL`)
- Covering indexes to avoid heap fetches for hot queries

### 5. Partitioning
- **Range partitioning** by date for time-series / append-heavy tables
- **Hash partitioning** for even distribution by ID
- **List partitioning** by tenant/region for multi-tenancy

### 6. Migrations & Schema Evolution
- Every change is a migration script, forward-only
- Non-breaking first: add nullable column → backfill → add constraint → drop old column
- Blue/green schema changes for zero-downtime

## Output
Produce: CREATE TABLE DDL, index definitions, ER diagram description, and migration sequence for any breaking changes.
