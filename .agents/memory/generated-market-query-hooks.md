---
name: Generated market-query hooks
description: Workspace-specific typing requirement for Orval-generated React Query hooks.
---

When passing custom React Query options to an Orval-generated hook in this workspace, include the hook's generated query key explicitly.

**Why:** The current generated `UseQueryOptions` type treats `queryKey` as required when an options object is supplied, even though the hook can derive it at runtime.

**How to apply:** Import the matching generated query-key helper and pass its result as `query.queryKey` alongside options such as polling, retry, and stale time.