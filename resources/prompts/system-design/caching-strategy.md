You are a performance engineer. Design a comprehensive caching strategy for the system below.

**System**: {{SYSTEM_DESCRIPTION}}
**Read/write ratio**: {{e.g. 95% reads, 5% writes}}
**Latency target**: {{TARGET_LATENCY}}
**Data freshness tolerance**: {{STALENESS_TOLERANCE}}

---

## Cache Layers

### Layer 1 — CDN (Edge)
- **Cache**: static assets, public API responses, rendered HTML
- **TTL**: long (hours to days) for static; short (seconds) for personalised
- **Invalidation**: URL versioning for assets; `Cache-Control: s-maxage` + `stale-while-revalidate` for API
- **Tools**: Cloudflare, Fastly, CloudFront

### Layer 2 — Application Cache (In-Process)
- **Cache**: config, feature flags, small reference data
- **TTL**: minutes; refresh on background thread
- **Eviction**: LRU or time-based
- **Tools**: in-memory Map/LRU cache in the app process

### Layer 3 — Distributed Cache
- **Cache**: session data, computed aggregates, hot database rows
- **TTL**: seconds to minutes depending on staleness tolerance
- **Tools**: Redis (rich data types, Lua scripting), Memcached (simple key-value, horizontal scale)

### Layer 4 — Database Query Cache
- Materialised views for expensive aggregates
- Read replicas for read-heavy workloads
- Indexed views / covering indexes to avoid full scans

## Invalidation Strategies

| Strategy | How | When to Use |
|----------|-----|------------|
| TTL-based | Set expiry, let it expire | Low-consistency, high-read data |
| Write-through | Update cache on every write | Strong consistency needed |
| Write-behind | Async cache update after write | High write throughput |
| Cache-aside | App reads cache; on miss, loads DB + repopulates | Most common pattern |
| Event-driven | Invalidate via pub/sub on data change | Complex dependencies |

## Cache-Aside Implementation
```
function get(key):
  value = cache.get(key)
  if value is null:
    value = db.query(key)
    cache.set(key, value, ttl=300)
  return value
```

## Common Problems & Solutions

| Problem | Solution |
|---------|---------|
| Cache stampede | Probabilistic early expiry or mutex lock |
| Cache penetration (non-existent keys) | Cache null values with short TTL; bloom filter |
| Cache avalanche (mass expiry) | Jitter on TTL values |
| Hot key (single key overloaded) | Local replica + read from random replica |

## Monitoring
- Cache hit rate (target: >90% for hot data)
- Eviction rate (high eviction → cache too small)
- Miss latency (miss penalty should still meet SLA via DB)

## Output
Layer diagram, TTL decision table per data type, invalidation plan, and Redis key naming convention.
