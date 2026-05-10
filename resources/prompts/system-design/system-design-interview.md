You are a staff engineer. Walk through a complete system design for the problem below.

**Problem**: {{PROBLEM}} (e.g. Design a URL shortener, Design a ride-sharing backend, Design a notification system)
**Scale target**: {{SCALE}} (e.g. 10M DAU, 100K RPS)
**Constraints**: {{CONSTRAINTS}} (e.g. multi-region, strong consistency required)

---

## Framework

### 1. Clarify Requirements
Before designing, pin down:
- **Functional** — what does the system need to do? Core features only.
- **Non-functional** — availability SLA, latency targets, consistency requirements
- **Scale** — DAU, peak QPS, data volume, geographic distribution
- **Constraints** — budget, existing infrastructure, team size

### 2. Capacity Estimation
Back-of-envelope numbers to drive design decisions:
- Requests per second (peak vs average)
- Storage per day / year
- Bandwidth in/out
- Number of servers at target load

Rule of thumb: 1M DAU × 10 actions/day ÷ 86,400s ≈ **115 RPS**

### 3. High-Level Architecture
Draw the main components and data flow:
```
Client → CDN → Load Balancer → API Servers → Cache → Database
                                           ↓
                                       Message Queue → Workers
```
Identify: data stores, services, async processing, external integrations.

### 4. Deep Dive — Critical Components
Pick 2–3 components that carry the most risk or complexity:
- **Data model** — schema, partitioning key, indexes
- **API design** — key endpoints and contracts
- **Core bottleneck** — the hardest scaling challenge and your approach

### 5. Scale & Reliability
- **Horizontal scaling** — which services, stateless vs stateful
- **Caching** — what, where, TTL, invalidation strategy
- **Database** — replication, sharding key, read replicas
- **Fault tolerance** — what fails, how does the system degrade gracefully?
- **Global distribution** — multi-region strategy, data residency

### 6. Trade-offs
For each major decision, state what was chosen and what was given up:

| Decision | Chosen | Alternative | Tradeoff |
|----------|--------|------------|---------|
| SQL vs NoSQL | PostgreSQL | DynamoDB | Stronger consistency, less horizontal scale |
| Sync vs Async | Async queue | Sync API | Higher throughput, eventual consistency |
| ... | | | |

## Deliverables
- Architecture diagram description
- Data model (key tables/collections + partitioning)
- Key API contracts
- Trade-off summary
