# Frontend

## App Router structure

```
src/
  app/
    layout.tsx                  # root layout (no locale)
    [locale]/
      layout.tsx                # locale-aware layout, wraps providers
      page.tsx                  # marketing / landing
      matches/page.tsx
      chat/page.tsx
      chat/[id]/page.tsx
      user-detail/[id]/page.tsx
      my-profile/page.tsx
  components/
    layout/                     # header, bottom nav, wrappers
    matches/                    # swipe card, match modal
    chat/                       # chat input, message, AI suggestion overlay
    common/                     # reusable UI primitives
    user/                       # user card, user grid
    skeletons/                  # loading skeletons
    flags/                      # locale flag SVGs
  hooks/
    queries/                    # TanStack Query hooks (one hook per resource)
    useIsMobile.ts
    useSwipeCard.ts
    useHint.ts
    useFunnel.tsx
  stores/
    authStore.ts                # Zustand: current user session
    profileStore.ts             # Zustand: current user profile
  lib/
    supabase/                   # Supabase client helpers
    providers/                  # React context providers
    utils.ts
  types/                        # TypeScript type definitions
  constants/                    # shared constants (e.g. z-index scale)
  i18n/                         # next-intl config and navigation helpers
```

## Providers

Providers are composed in `src/app/[locale]/layout.tsx` in this order:

1. `QueryProvider` — TanStack Query client
2. `AuthProvider` — reads Supabase session, populates `authStore`
3. `HeaderProvider` — controls header visibility per page

## Components

- Client components use `"use client"` at the top.
- Server components are the default — avoid adding `"use client"` unless interactivity is needed.
- Shared UI primitives live in `src/components/common/`.
- Page-specific components live in their own subdirectory (e.g. `matches/`, `chat/`).
- Prefer composing small, focused components over large monolithic ones.

## Styling

- Tailwind CSS v4 — utility classes only, no custom CSS files except `globals.css`.
- Use `clsx` + `tailwind-merge` (via `src/lib/utils.ts`) for conditional class names.
- Z-index values are centralized in `src/constants/zIndex.ts` — do not use raw numbers.
- Animations use Motion (`motion/react`).

## State management

| Concern | Tool |
|---|---|
| Server / async data | TanStack Query v5 — hooks in `src/hooks/queries/` |
| Global client state (auth, profile) | Zustand stores in `src/stores/` |
| Local component state | `useState` / `useReducer` |

Query hooks follow the `use<Resource>` naming convention and live one-per-file under `src/hooks/queries/`.

## i18n

- Locales: `ko` (default), `ja`. Message files are in `messages/`.
- Use `next-intl` hooks (`useTranslations`, `useLocale`) inside client components.
- Use `getTranslations` / `getLocale` in server components and route handlers.
- Navigation helpers (typed `Link`, `useRouter`, `redirect`) come from `src/i18n/navigation.ts` — import from there, not from `next/navigation` directly.
- All user-visible strings must be in both locale files.

## Mobile

- `useIsMobile` hook detects viewport width for mobile-specific behavior.
- Bottom navigation (`BottomNav`) is shown on mobile only.
- Swipe gestures on the matches page are handled by `useSwipeCard`.
