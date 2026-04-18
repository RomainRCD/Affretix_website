---
phase: 01-foundation-homepage
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - postcss.config.mjs
  - src/app/globals.css
  - src/app/layout.tsx
autonomous: true
requirements:
  - UX-01
  - UX-02

must_haves:
  truths:
    - "npm run dev starts without errors"
    - "npm run build completes without TypeScript errors"
    - "Brand colors (orange #F58634, grey-dark #353335, gold #C9A84C) are available as Tailwind utility classes"
    - "Barlow Condensed and DM Sans fonts load via next/font/google with CSS variable strategy"
    - "font-heading and font-body Tailwind utilities are available and applied to html/body"
  artifacts:
    - path: "next.config.ts"
      provides: "Next.js 15 config with remotePatterns for manufacturer image domains"
      contains: "remotePatterns"
    - path: "postcss.config.mjs"
      provides: "Tailwind v4 PostCSS bridge"
      contains: "@tailwindcss/postcss"
    - path: "src/app/globals.css"
      provides: "Brand token definitions via @theme, base body styles"
      contains: "@theme"
    - path: "src/app/layout.tsx"
      provides: "Root layout with font CSS variables applied to <html>"
      contains: "barlowCondensed.variable"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/app/globals.css"
      via: "font CSS variables bridging next/font to @theme"
      pattern: "--font-barlow-condensed"
    - from: "src/app/globals.css"
      to: "Tailwind runtime"
      via: "@theme directive"
      pattern: "--color-orange"
---

<objective>
Bootstrap the Next.js 15 project, configure Tailwind v4 brand tokens, and set up the font pipeline. After this plan, the project compiles cleanly and every subsequent plan can use `text-orange`, `bg-grey-dark`, `font-heading`, and `font-body` Tailwind utilities.

Purpose: Provides the shared foundation — brand colors, typography, and project structure — that all other Phase 1 plans depend on. Without this, no other plan can produce pixel-accurate output.

Output: A runnable Next.js 15 project with Tailwind v4 `@theme` brand tokens, Barlow Condensed + DM Sans via `next/font/google`, and `next.config.ts` pre-configured with manufacturer `remotePatterns`.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation-homepage/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Bootstrap Next.js 15 project and install dependencies</name>
  <files>package.json, tsconfig.json, postcss.config.mjs, next.config.ts</files>

  <read_first>
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Standard Stack section (versions, installation command, postcss config, next.config.ts pattern)
  </read_first>

  <action>
The project root is /Users/romainrichard/PycharmProjects/Affretix_website. It is a blank git repo (CLAUDE.md present, no src/ yet).

Run the following bootstrap commands from the project root:

```bash
npx create-next-app@15 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install framer-motion
```

The `.` installs into the current directory. The `--yes` flag accepts all defaults without prompting.

After installation, replace `postcss.config.mjs` with the Tailwind v4 PostCSS config (the generated one may still reference the old plugin format):

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

Replace `next.config.ts` with the following (do NOT use `next.config.js`):

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.caterpillar.com' },
      { protocol: 'https', hostname: '**.liebherr.com' },
      { protocol: 'https', hostname: '**.volvoce.com' },
      { protocol: 'https', hostname: '**.komatsu.eu' },
    ],
  },
}

export default config
```

Do NOT create `tailwind.config.js` — Tailwind v4 uses only the `@theme` CSS directive. If create-next-app generated one, delete it.
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && node -e "const p = require('./package.json'); console.log(p.dependencies.next, p.dependencies['framer-motion'])"</automated>
  </verify>

  <acceptance_criteria>
    - `package.json` contains `"next": "^15.x.x"` or `"15.x.x"` (version ≥ 15.0.0)
    - `package.json` contains `"framer-motion"` in dependencies
    - `postcss.config.mjs` contains `"@tailwindcss/postcss"`
    - `next.config.ts` contains `remotePatterns`
    - No `tailwind.config.js` file exists at project root (Tailwind v4 does not use it)
    - `tsconfig.json` contains `"@/*": ["./src/*"]` path alias
  </acceptance_criteria>

  <done>Next.js 15 project bootstrapped, framer-motion installed, postcss and next.config.ts written with correct content.</done>
</task>

<task type="auto">
  <name>Task 2: Configure Tailwind v4 brand tokens and font CSS variables in globals.css and layout.tsx</name>
  <files>src/app/globals.css, src/app/layout.tsx</files>

  <read_first>
    - .planning/phases/01-foundation-homepage/01-RESEARCH.md — Pattern 1 (Root Layout with Font CSS Variables), Pattern 2 (Tailwind v4 Brand Tokens via @theme), Code Examples section (globals.css — Full Brand Setup, layout.tsx — Root Layout Shell)
    - src/app/globals.css (read current state — may contain default Tailwind v4 content from create-next-app)
    - src/app/layout.tsx (read current state — may contain default Next.js content)
  </read_first>

  <action>
Replace `src/app/globals.css` entirely with:

```css
@import "tailwindcss";

@theme {
  /* Brand palette */
  --color-orange: #F58634;
  --color-grey-dark: #353335;
  --color-gold: #C9A84C;
  --color-white: #FFFFFF;

  /* Typography — references CSS variables set by next/font in layout.tsx */
  --font-heading: var(--font-barlow-condensed), "Barlow Condensed", sans-serif;
  --font-body: var(--font-dm-sans), "DM Sans", sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-white);
  color: var(--color-grey-dark);
}
```

Replace `src/app/layout.tsx` entirely with:

```tsx
import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Affretix — Location de matériel BTP avec chauffeur',
  description: 'Louez votre engin de chantier avec opérateur qualifié. 67+ engins : terrassement, transport, compactage et plus. Filiale du groupe LEVA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Note: The `<body>` contains only `{children}` for now. Plan 02 will add `<Header>` and `<Footer>` once those components exist. Do NOT add Header/Footer placeholders — that causes import errors.

Critical constraints from research:
- Barlow Condensed requires explicit `weight: ['400', '700']` — it is NOT a variable font. Omitting weight causes a startup error.
- Import from `next/font/google`, NOT from `@next/font` (deprecated).
- Do NOT put `"use client"` in layout.tsx — it is a Server Component.
  </action>

  <verify>
    <automated>cd /Users/romainrichard/PycharmProjects/Affretix_website && npm run build 2>&1 | tail -20</automated>
  </verify>

  <acceptance_criteria>
    - `src/app/globals.css` contains `@import "tailwindcss"` (NOT `@tailwind base`)
    - `src/app/globals.css` contains `@theme {` block
    - `src/app/globals.css` contains `--color-orange: #F58634`
    - `src/app/globals.css` contains `--color-grey-dark: #353335`
    - `src/app/globals.css` contains `--color-gold: #C9A84C`
    - `src/app/globals.css` contains `--font-heading:` and `--font-body:`
    - `src/app/layout.tsx` contains `Barlow_Condensed` with `weight: ['400', '700']`
    - `src/app/layout.tsx` contains `variable: '--font-barlow-condensed'`
    - `src/app/layout.tsx` contains `variable: '--font-dm-sans'`
    - `src/app/layout.tsx` contains `lang="fr"`
    - `src/app/layout.tsx` does NOT contain `"use client"`
    - `npm run build` exits with code 0 (no TypeScript or compilation errors)
  </acceptance_criteria>

  <done>globals.css and layout.tsx written. Build passes. Brand utilities (text-orange, bg-grey-dark, text-gold, font-heading, font-body) are available for all subsequent plans.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| External npm registry | Dependencies fetched from npm during bootstrap |
| Manufacturer image domains | next/image will proxy requests to configured remotePatterns hosts |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Tampering | npm install supply chain | mitigate | Run `npm audit` after install; pin exact versions if audit finds issues |
| T-01-02 | Information Disclosure | next.config.ts remotePatterns wildcard | mitigate | Use specific hostname patterns (`**.caterpillar.com`) not open wildcards (`**`) to prevent the Next.js image proxy from being abused as an open proxy |
| T-01-03 | Spoofing | External font CDN (Google Fonts) | accept | next/font/google self-hosts fonts at build time — no runtime CDN dependency, no CORS attack surface |
</threat_model>

<verification>
After both tasks complete, run from the project root:

```bash
npm run dev
```

Open http://localhost:3000. The page should render (default Next.js page is acceptable — homepage content comes in Plan 03). No console errors about fonts, missing modules, or Tailwind config.

```bash
npm run build
```

Should exit 0. No TypeScript errors.

Grep checks:
```bash
grep -r "color-orange" src/app/globals.css        # must return --color-orange: #F58634
grep -r "font-barlow-condensed" src/app/layout.tsx # must return variable: '--font-barlow-condensed'
grep -r "remotePatterns" next.config.ts             # must return the manufacturer domains
```
</verification>

<success_criteria>
- `npm run build` exits 0
- `npm run dev` starts on port 3000 without errors
- `src/app/globals.css` has `@theme` block with all 4 brand colors and 2 font family tokens
- `src/app/layout.tsx` loads Barlow Condensed with explicit weight and DM Sans with `variable` option, applies both variables to `<html>`
- `next.config.ts` has `remotePatterns` for caterpillar.com, liebherr.com, volvoce.com, komatsu.eu
- No `tailwind.config.js` file exists
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation-homepage/01-01-SUMMARY.md` with:
- What was built (project bootstrap, brand tokens, font setup)
- Key decisions made (Next.js 15 over 16, Tailwind v4 @theme approach)
- Files created/modified
- Any deviations from the plan
- Verification results
</output>
