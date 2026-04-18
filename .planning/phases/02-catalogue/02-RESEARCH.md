# Phase 2: Catalogue - Research

**Researched:** 2026-04-18
**Domain:** Next.js 15 App Router static routes, next/image, Tailwind v4 grids, Motion stagger animations, manufacturer image strategy
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CAT-01 | Visitor can see all 8 families on a catalogue index page | `/catalogue/page.tsx` server component importing `machineFamilies`; family cards with slug-based links |
| CAT-02 | Visitor can browse machines of a specific family | `/catalogue/[slug]/page.tsx` with `generateStaticParams` over 8 slugs; `getMachinesByFamily` helper already exists |
| CAT-03 | Each machine shown with name, family, capacity summary, image | `MachineCard` component consuming `Machine` type; variants as badge list; `next/image` for image |
| CAT-04 | Machine images from manufacturers (Cat, Liebherr, etc.) | See Image Strategy section — hotlinking is unreliable; use Unsplash/Pexels free stock as phase placeholder with `imageUrl` field |
| NAV-02 | Fully responsive on mobile, tablet, desktop | Tailwind v4 responsive grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| UX-03 | Smooth transitions and animations (Framer Motion) | `whileInView` + `staggerChildren` via Motion variants; `"use client"` wrapper pattern (established in Hero.tsx) |
| UX-04 | Interactive and expressive hover states on machine cards | Tailwind hover utilities + `motion.div` with `whileHover={{ scale: 1.02 }}` |
</phase_requirements>

---

## Summary

Phase 2 requires two new routes (`/catalogue` index and `/catalogue/[slug]` family pages) built as Next.js App Router static pages using `generateStaticParams`. The full data layer is already in place: 8 families in `families.ts`, 72 machines in `machines.ts`, and a `getMachinesByFamily` helper — all typed TypeScript with no CMS dependency.

The critical unresolved question is machine image sourcing. Hotlinking directly from manufacturer sites (caterpillar.com, liebherr.com) is unreliable and likely blocked: these corporate sites actively prevent hotlinking and image URLs change without notice. The pragmatic Phase 2 approach is to populate `imageUrl` fields with freely licensed stock images from Unsplash (construction/equipment search) and configure `next/image` `remotePatterns` for `images.unsplash.com`. Phase 4/5 can revisit real manufacturer assets if needed.

Animation work follows the pattern established in `Hero.tsx`: import from `"motion/react"`, add `"use client"` directive, use `motion.div` with variants. For card grids, `whileInView` on the container with `staggerChildren` cascades the reveal across cards without a custom JS scroll handler.

**Primary recommendation:** Two-route catalogue (index + family slug) with static generation, Unsplash placeholder images, and `whileInView` stagger on card grids using the existing Motion setup.

---

## Standard Stack

### Core (already installed — verified in package.json)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.15 | App Router, SSG, next/image | Project foundation [VERIFIED: package.json] |
| motion | 12.38.0 | Animations (whileInView, stagger, hover) | Already installed, used in Hero [VERIFIED: package.json] |
| tailwindcss | ^4 | Responsive grid, spacing, typography tokens | Already configured with brand tokens [VERIFIED: globals.css] |
| typescript | ^5 | Type safety across data + components | Project-wide, families/machines types defined [VERIFIED: package.json] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | (bundled with next) | Optimized images with remote src | Every `MachineCard` with an imageUrl |
| next/link | (bundled with next) | Client-side navigation to family + machine slugs | All card links |

### No new packages needed

Phase 2 requires zero new npm installs. Everything needed (Next.js, Motion, Tailwind) is already in the lockfile.

---

## Architecture Patterns

### Recommended File Structure

```
src/
├── app/
│   └── catalogue/
│       ├── page.tsx                   # /catalogue — index of 8 families (server component)
│       └── [slug]/
│           └── page.tsx               # /catalogue/[slug] — machines in a family (server component)
├── components/
│   └── catalogue/
│       ├── FamilyCard.tsx             # Card for each family on index page
│       ├── MachineCard.tsx            # Card for each machine on family page
│       ├── MachineGrid.tsx            # "use client" — stagger animation wrapper
│       └── FamilyHero.tsx             # Family page header with name + description
```

### Pattern 1: Static Generation for Family Pages

**What:** `generateStaticParams` reads from `machineFamilies` at build time, emitting 8 static HTML pages.
**When to use:** All catalogue pages — content is static TypeScript data, no runtime data fetching.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// app/catalogue/[slug]/page.tsx — server component, no "use client"

import { machineFamilies } from '@/data/families'
import { getMachinesByFamily } from '@/data/machines'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return machineFamilies.map((family) => ({ slug: family.slug }))
}

// Prevent unknown slugs from rendering (force 404 instead of dynamic fallback)
export const dynamicParams = false

export default async function FamilyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const family = machineFamilies.find((f) => f.slug === slug)
  if (!family) notFound()

  const machines = getMachinesByFamily(slug)
  return <MachineGrid family={family} machines={machines} />
}
```

**Key Next.js 15 detail:** `params` is now a `Promise` — must be `await`ed before accessing properties. [VERIFIED: nextjs.org/docs/app/api-reference/functions/generate-static-params, 2026-04-15]

### Pattern 2: Stagger Animation with whileInView

**What:** Container `motion.div` holds `staggerChildren` transition; each card `motion.div` declares enter/exit variants. The `"use client"` boundary is at the grid level, keeping family page server components.
**When to use:** Any card grid that should animate in as the visitor scrolls to it.

```typescript
// Source: https://motion.dev/motion/stagger/ + Hero.tsx established pattern
// components/catalogue/MachineGrid.tsx

"use client"
import { motion } from "motion/react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,   // 70ms between cards — fast enough to feel snappy
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function MachineGrid({ machines }: { machines: Machine[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}   // trigger when 10% of grid is visible
    >
      {machines.map((machine) => (
        <motion.div key={machine.slug} variants={cardVariants}>
          <MachineCard machine={machine} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Pattern 3: next/image with remotePatterns

**What:** `next/image` requires every external hostname to be listed in `next.config.ts` `remotePatterns`. The `**` prefix matches any subdomain.
**When to use:** Any `<Image>` component with `src` pointing to an external domain.

```typescript
// Source: nextjs.org/docs/app/api-reference/components/image
// next.config.ts — already partially configured for cat/liebherr, add unsplash:

images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.caterpillar.com' },
    { protocol: 'https', hostname: '**.liebherr.com' },
    { protocol: 'https', hostname: '**.volvoce.com' },
    { protocol: 'https', hostname: '**.komatsu.eu' },
    { protocol: 'https', hostname: 'images.unsplash.com' },  // ADD: placeholder images
  ],
}
```

### Pattern 4: MachineCard Component

```typescript
// components/catalogue/MachineCard.tsx — pure presentational, no "use client" needed
import Image from 'next/image'
import Link from 'next/link'
import type { Machine } from '@/data/machines'

export function MachineCard({ machine }: { machine: Machine }) {
  return (
    <Link
      href={`/catalogue/${machine.familySlug}/${machine.slug}`}
      className="group block border border-grey-dark/10 hover:border-orange transition-colors duration-200"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-grey-dark/5 overflow-hidden">
        {machine.imageUrl ? (
          <Image
            src={machine.imageUrl}
            alt={machine.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-grey-dark/20 font-heading text-xs uppercase tracking-widest">
            Image à venir
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-base text-grey-dark uppercase tracking-wide group-hover:text-orange transition-colors mb-2">
          {machine.name}
        </h3>
        {/* Capacity badges */}
        <div className="flex flex-wrap gap-1">
          {machine.variants.map((v) => (
            <span
              key={v.label}
              className="font-body text-xs bg-grey-dark/5 text-grey-dark/70 px-2 py-0.5 border border-grey-dark/10"
            >
              {v.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
```

### Anti-Patterns to Avoid

- **Motion in server components:** Never import `motion` in a file without `"use client"`. The pattern is: server page fetches data → passes it as props to a `"use client"` grid component. [VERIFIED: motion.dev docs, Hero.tsx pattern]
- **Hotlinking manufacturer images:** Corporate sites actively block hotlinking. Embedding `https://www.caterpillar.com/en/products/...` directly as `imageUrl` will result in broken images or 403 errors at runtime. Use placeholder images for Phase 2.
- **`dynamicParams` omission:** Without `export const dynamicParams = false`, an unknown slug like `/catalogue/foo` will attempt dynamic rendering and may produce unexpected behavior. Always set this when using a static data-driven slug list.
- **Forgetting to `await params`:** In Next.js 15, `params` is a Promise. Accessing `params.slug` directly (without `await params`) will be undefined. [VERIFIED: nextjs.org docs 2026-04-15]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static route generation | Custom build script | `generateStaticParams` | Next.js native SSG, zero config |
| Image optimization / resizing | Manual sharp transforms | `next/image` with `fill` + `sizes` | Automatic WebP conversion, lazy load, layout shift prevention |
| Scroll-triggered animation | IntersectionObserver + useState | `whileInView` (Motion) | Handles mount/unmount, SSR, reduced-motion automatically |
| Stagger delay calculation | Manual `delay: index * 0.05` | `staggerChildren` variant | Composable, parent controls all children without prop drilling |
| Client-side family filter | Custom filter UI + router push | Direct family slug routes | 8 families = 8 static pages; no filter state needed. URL is the filter |

**Key insight:** With only 8 families and 72 machines, client-side JavaScript filtering of a flat list is overkill. Each family gets its own static URL (`/catalogue/terrassement`, etc.). The Header's family nav already links to these URLs. No filter widget is required for Phase 2.

---

## Image Strategy (CAT-04)

This is the most complex requirement to resolve cleanly. Three options ranked by reliability:

### Option A: Unsplash free stock (RECOMMENDED for Phase 2)

- Unsplash license allows commercial use without attribution [VERIFIED: unsplash.com/license]
- URLs are stable (`images.unsplash.com/photo-...`)
- Add `{ protocol: 'https', hostname: 'images.unsplash.com' }` to `next.config.ts` remotePatterns
- Limitation: not brand-specific (a Liebherr excavator image may actually show a Komatsu)
- Resolution path: acceptable as placeholder; Phase 5 can swap in real assets

### Option B: Official manufacturer media libraries (NOT recommended for direct hotlinking)

- Caterpillar has a media library at `caterpillar.com/en/news/media-library.html` intended for press use, not hotlinking into third-party websites [CITED: caterpillar.com/en/news/media-library.html]
- Image URLs on manufacturer sites are unversioned and change without notice
- `next/image` will cache the optimized version, but the source URL can 404 at next rebuild
- **Conclusion:** Download images and host them in `public/images/machines/` instead of hotlinking [ASSUMED — manufacturer ToS not fully reviewed in this session]

### Option C: Host manufacturer images in /public (for production)

- Download approved press images, place in `public/images/machines/[machine-slug].jpg`
- Set `imageUrl: '/images/machines/pelle-hydraulique.jpg'` in `machines.ts`
- No `remotePatterns` changes needed; next/image serves from `/public`
- Most reliable long-term approach; recommended for production in Phase 5

**Phase 2 decision:** Populate `imageUrl` with Unsplash URLs for a representative subset of machines (one per family at minimum). Leave remaining machines with `imageUrl: undefined` — the `MachineCard` renders a graceful "Image à venir" placeholder. This unblocks CAT-04 partially and avoids breaking images from hotlink prevention.

---

## Common Pitfalls

### Pitfall 1: next/image "hostname not configured" build error

**What goes wrong:** Adding an external URL to `imageUrl` in `machines.ts` without updating `next.config.ts` causes a build error: "hostname not configured under images.remotePatterns".
**Why it happens:** `next/image` validates all external hostnames against the allowlist at build time.
**How to avoid:** Add every new image domain to `remotePatterns` in `next.config.ts` before running `next build`. For `images.unsplash.com`, add `{ protocol: 'https', hostname: 'images.unsplash.com' }`.
**Warning signs:** Console error during `npm run dev` referencing an unconfigured host.

### Pitfall 2: Motion in a server component

**What goes wrong:** Importing `motion` from `"motion/react"` in a file without `"use client"` at the top throws a React server component error.
**Why it happens:** Motion uses React hooks internally, which are forbidden in server components.
**How to avoid:** Split: server component `page.tsx` fetches data → passes to a `"use client"` `MachineGrid.tsx` component. This is the exact pattern used in Phase 1 (`Hero.tsx` is a client component, `page.tsx` is not).
**Warning signs:** "You're importing a component that needs useEffect" error at runtime.

### Pitfall 3: params is a Promise in Next.js 15

**What goes wrong:** Accessing `params.slug` synchronously returns `undefined`.
**Why it happens:** Next.js 15 changed `params` to be a Promise (previously synchronous in 13/14).
**How to avoid:** Always `const { slug } = await params` in async page functions. [VERIFIED: nextjs.org docs 2026-04-15]
**Warning signs:** `family` is undefined after `machineFamilies.find(...)`, page falls through to `notFound()` for all routes.

### Pitfall 4: aspect-ratio layout shift without fill + sizes

**What goes wrong:** `next/image` with `layout="responsive"` (v12 API) or missing `sizes` prop causes layout shift (CLS) as the image loads.
**Why it happens:** Browser doesn't know image dimensions before load.
**How to avoid:** Use `fill` prop inside a relative-positioned container with a fixed `aspect-ratio` class (e.g., `aspect-[4/3]`). Always provide `sizes` prop matching the grid breakpoints.

### Pitfall 5: Stagger animation re-triggering on re-renders

**What goes wrong:** Cards re-animate every time a parent component re-renders.
**Why it happens:** `initial` and `animate` are stateful by default; missing `viewport={{ once: true }}` means the animation fires every time the element scrolls in/out.
**How to avoid:** Add `viewport={{ once: true }}` to the container `motion.div` using `whileInView`. [VERIFIED: motion.dev stagger docs]

---

## Code Examples

### Verified patterns from official sources

### generateStaticParams for 8 family slugs
```typescript
// Source: nextjs.org/docs/app/api-reference/functions/generate-static-params (2026-04-15)
import { machineFamilies } from '@/data/families'

export async function generateStaticParams() {
  return machineFamilies.map((family) => ({ slug: family.slug }))
}
export const dynamicParams = false
```

### staggerChildren container variant
```typescript
// Source: motion.dev/motion/stagger/ (2026-04-18)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}
```

### next/image with fill and aspect ratio
```typescript
// Source: nextjs.org/docs/app/api-reference/components/image
<div className="relative aspect-[4/3] overflow-hidden">
  <Image
    src={machine.imageUrl}
    alt={machine.name}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  />
</div>
```

### Tailwind v4 responsive machine grid
```html
<!-- Source: tailwindcss.com/docs/grid-template-columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13 | No `fallback` prop; use `dynamicParams` instead |
| `params.slug` synchronous access | `const { slug } = await params` | Next.js 15 | Breaking change — all dynamic page functions must be `async` |
| `motion/dist/react` import path | `"motion/react"` import | Motion v11+ | Established in Hero.tsx already |
| `layout="responsive"` on Image | `fill` + container with aspect ratio | Next.js 13 | Legacy API removed in Next.js 13 |

**Deprecated/outdated:**
- `framer-motion` package: replaced by standalone `motion` package (both currently installed in this project; use imports from `"motion/react"`)
- `next/image` `domains` config: replaced by `remotePatterns` since Next.js 12.3 [VERIFIED: next.config.ts already uses remotePatterns]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Caterpillar/Liebherr hotlink their images — blocked without confirmed ToS review | Image Strategy | If hotlinking is actually allowed, Option A (Unsplash) adds unnecessary indirection; can swap URLs in machines.ts with no structural change |
| A2 | Unsplash commercial license permits embedding images via direct URL without attribution | Image Strategy | Low risk — Unsplash license is public and well-known as permissive, but project owner should confirm |
| A3 | Phase 3 (product pages) will use the same `/catalogue/[slug]/[machine-slug]` nested route | Architecture | If Phase 3 uses a different URL scheme, the `href` in `MachineCard` will need updating |

---

## Open Questions

1. **Should `/catalogue` index show all 72 machines, or just the 8 family cards?**
   - What we know: CAT-01 says "list of all families" and CAT-02 says "filter/browse by family"
   - What's unclear: Whether a single `/catalogue` page should also show all machines inline (with filter) or just the 8 family entry points
   - Recommendation: Keep `/catalogue` as the 8-family index (matches FamilyGrid on homepage); each family page shows that family's machines. This is the simplest interpretation of CAT-01/CAT-02.

2. **Should machine cards on the family page link to `/catalogue/[slug]/[machine-slug]` (Phase 3 URL) or be non-clickable in Phase 2?**
   - What we know: Phase 3 will create individual machine pages
   - What's unclear: The planner must decide: stub links now vs. only adding links when Phase 3 routes exist
   - Recommendation: Add the `href` now pointing to the Phase 3 URL pattern — Next.js will 404 gracefully until Phase 3 builds the page. This future-proofs the component.

3. **How many Unsplash image URLs should be populated in machines.ts for Phase 2?**
   - What we know: 72 machines, `imageUrl` is currently `undefined` for all
   - Recommendation: Populate at least 1 image per family (8 images total) using representative Unsplash construction equipment photos. Remaining machines get the "Image à venir" placeholder.

---

## Environment Availability

Step 2.6: All dependencies are bundled in the existing Next.js project. No external tools, databases, or services are required for Phase 2. No external dependency audit needed.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| next | App Router routes | ✓ | 15.5.15 | — |
| motion | Animations | ✓ | 12.38.0 | — |
| tailwindcss | Responsive grid | ✓ | ^4 | — |
| Node.js | Build toolchain | ✓ | 25.6.1 | — |

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test config files found in project |
| Config file | None — Wave 0 gap |
| Quick run command | `npm run build` (build validation as proxy) |
| Full suite command | `npm run build && npm run lint` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CAT-01 | `/catalogue` renders 8 family cards | smoke (build) | `npm run build` — static generation failure = 0 output | ❌ Wave 0 |
| CAT-02 | `/catalogue/[slug]` renders for all 8 slugs | smoke (build) | `npm run build` — `generateStaticParams` must emit 8 routes | ❌ Wave 0 |
| CAT-03 | Machine card shows name, variants, image area | manual/visual | Manual browser check | ❌ Wave 0 |
| CAT-04 | No broken images (remotePatterns configured) | smoke | `npm run build` — next/image misconfiguration throws at build | ❌ Wave 0 |
| NAV-02 | Responsive at 375px, 768px, 1280px | manual/visual | DevTools responsive mode | n/a |
| UX-03 | Stagger animation plays on scroll | manual/visual | Browser scroll test | n/a |
| UX-04 | Hover state on cards is expressive | manual/visual | Browser hover test | n/a |

### Sampling Rate

- **Per task commit:** `npm run build` — catches type errors and next/image misconfig
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Build green + manual visual check of `/catalogue` and `/catalogue/terrassement` on mobile/desktop before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] No test framework installed — `npm run build` serves as smoke test proxy
- [ ] No component tests — visual validation is manual for Phase 2 (acceptable given no test infra)

*(Recommendation: A Jest + React Testing Library setup is deferred to Phase 5 if at all. Phase 2 relies on TypeScript compilation + build success as correctness gate.)*

---

## Security Domain

Phase 2 is read-only static HTML generation from local TypeScript data. No user input, no authentication, no form submissions, no external API calls at runtime. ASVS categories do not apply.

| ASVS Category | Applies | Reason |
|---------------|---------|--------|
| V2 Authentication | no | No auth in Phase 2 |
| V3 Session Management | no | No sessions |
| V4 Access Control | no | All pages are public |
| V5 Input Validation | no | No user input — only `params.slug` from `generateStaticParams` (static, enumerated) |
| V6 Cryptography | no | No secrets or sensitive data |

**Note on `dynamicParams = false`:** Setting this prevents arbitrary slug injection from ever reaching the page render function. Any slug not in `machineFamilies` returns a 404 before any code runs. This is the correct security posture. [VERIFIED: nextjs.org docs]

---

## Sources

### Primary (HIGH confidence)
- [nextjs.org/docs/app/api-reference/functions/generate-static-params](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — generateStaticParams API, dynamicParams, params-as-Promise (last updated 2026-04-15)
- [motion.dev/motion/stagger/](https://motion.dev/motion/stagger/) — staggerChildren, delayChildren, viewport once
- [nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image) — remotePatterns, fill, sizes
- Project codebase: `src/app/layout.tsx`, `src/components/home/Hero.tsx`, `next.config.ts`, `package.json`, `src/data/families.ts`, `src/data/machines.ts`

### Secondary (MEDIUM confidence)
- [tailwindcss.com/docs/grid-template-columns](https://tailwindcss.com/docs/grid-template-columns) — responsive grid cols pattern
- [unsplash.com/license](https://unsplash.com/license) — commercial use license for placeholder images
- WebSearch: framer-motion/motion stagger in Next.js App Router — confirmed `"use client"` + `whileInView` + `staggerChildren` as idiomatic pattern (multiple sources, 2025-2026)

### Tertiary (LOW confidence)
- Caterpillar/Liebherr hotlinking policy — not officially confirmed; conservative assumption that hotlinking is blocked [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json, no new installs needed
- Architecture: HIGH — generateStaticParams and Motion patterns verified against official docs
- Image strategy: MEDIUM — Unsplash license verified; manufacturer hotlinking policy assumed (not verified)
- Pitfalls: HIGH — all based on verified official documentation changes (Next.js 15 params Promise, dynamicParams)

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (Next.js minor releases frequently; check remotePatterns API if upgrading)
