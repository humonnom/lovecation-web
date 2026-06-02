# Supabase

## Clients

Three helpers in `src/lib/supabase/`:

| File | Usage |
|---|---|
| `client.ts` | Browser client — use in Client Components and event handlers |
| `server.ts` | Server client — use in Server Components, Route Handlers, Server Actions |
| `middleware.ts` | Session refresh helper called from `middleware.ts` at the root |

Always use the right client for the rendering context. Using the browser client in a Server Component will throw.

```ts
// Server Component
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();

// Client Component
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();
```

## Auth

- `AuthProvider` (`src/lib/providers/AuthProvider.tsx`) runs on mount, fetches the session, and writes it to `authStore`.
- `authStore` (`src/stores/authStore.ts`) is the single source of truth for the current user in client code.
- The root `middleware.ts` calls the Supabase middleware helper on every request to keep the session cookie fresh.
- Protected routes should check `authStore` on the client or read the session from the server client in a Server Component.

## Types

- Generated types are in `src/types/supabase.ts`. Regenerate when the schema changes:
  ```bash
  npx supabase gen types typescript --project-id <project-id> > src/types/supabase.ts
  ```
- Import database row types from `supabase.ts` and extend them in `src/types/index.ts` as needed.

## Query patterns

- Data fetching hooks live in `src/hooks/queries/` and use TanStack Query.
- Hooks call the Supabase browser client directly — no separate API layer.
- Mutations use `useMutation` from TanStack Query with `invalidateQueries` on success.
- Errors are handled via `src/lib/errorHandler.ts` — use it rather than ad-hoc `console.error`.

## Environment variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both are public (prefixed `NEXT_PUBLIC_`) and safe to expose to the browser. Never add a service-role key to client-side code.
