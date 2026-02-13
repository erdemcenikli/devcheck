# Plan: Make API & Web Check Subscription-Based

## Context

DevCheck's API (`POST /api/analyze`) and web check (`/check`) are completely free and open. The API docs page at `/api-docs` reveals everything — full request/response schemas, TypeScript interfaces, complete examples, and all category weights. There's no authentication, pricing, or subscription concept anywhere.

**Goal:** Redesign the `/api-docs` page to present the API as a paid subscription product, and add gating hints to the web check flow. Keep integration easy to understand, but don't give everything away. Page-level changes only — no backend auth implementation yet.

---

## 1. Create Pricing Data (single source of truth)

- [ ] **New file:** `src/lib/data/pricing.ts`

Define `PRICING_TIERS` array used by both the API docs page and any future pricing references:

| Tier | Price | Key Features | Limits |
|------|-------|-------------|--------|
| Free | $0 | Score, grade, verdict, critical flag, issue count by severity | 5 requests/day |
| Pro | $29/mo | Everything in Free + detailed issues with recommendations, guideline URLs, full category breakdowns | 500 requests/day |
| Team | $79/mo | Everything in Pro + 2,000 req/day, webhook notifications, team key management, priority support | 2,000 requests/day |

Pro tier is `highlighted: true` (recommended).

---

## 2. Redesign `/api-docs` Page

- [ ] **Modify:** `src/app/api-docs/page.tsx` — Restructure with new sections, update cURL example, remove full response reveal

### 2a. API Hero Section
- [ ] **New file:** `src/components/api-docs/api-hero.tsx` (client component, framer-motion)

- Headline: "Automate App Store Compliance" (with emerald-to-cyan gradient text)
- Subtitle: "Integrate review checks into your CI/CD pipeline. One API call, instant compliance report."
- Two CTAs: "Get API Key" (gradient button) + "View Pricing" (outline, scrolls to `#pricing`)
- Reuse the animated background orb pattern from `src/components/landing/hero.tsx`

### 2b. Endpoint Section (modified)
- [ ] **Modify:** `src/components/api-docs/endpoint-section.tsx`

- Change "Authentication: None (public)" to "Authentication: Bearer token" with an API key badge
- Add small note: "Required for full response. Limited summary available without key."

### 2c. Authentication Section
- [ ] **New file:** `src/components/api-docs/auth-section.tsx`

- Show the `Authorization: Bearer dk_live_...` header format in a code block
- Small snippet showing how to add it in cURL and fetch
- Note explaining: "Without a key, you'll receive a summary response (score, grade, verdict). With a key, get the full compliance report."

### 2d. Request Fields (unchanged)
Keep `src/components/api-docs/request-fields-table.tsx` as-is — making integration easy is important.

### 2e. cURL Example (updated)
- [ ] In `page.tsx`, update the `curlExample` and `CurlHighlighted` to include the `-H "Authorization: Bearer dk_live_..."` header.

### 2f. Pricing Section
- [ ] **New file:** `src/components/api-docs/pricing-section.tsx` (client component)

- `id="pricing"` anchor for scroll-to
- 3-column grid of pricing cards using `PRICING_TIERS` from `src/lib/data/pricing.ts`
- Each card: glassmorphism container, tier name, price, feature list with emerald check icons
- Pro card gets emerald border glow + "Recommended" badge
- CTAs: "Get Free Key" / "Start Free Trial" / "Contact Sales" (all can link to `#` or a mailto for now)
- Framer-motion stagger entrance (reuse the `itemVariants` pattern from `src/components/landing/how-it-works.tsx`)

### 2g. Response Comparison (the key conversion driver)
- [ ] **New file:** `src/components/api-docs/response-comparison.tsx` (client component)

Side-by-side showing Free vs Pro response:

**Free panel** — shows the actual limited JSON:
```json
{
  "overallScore": 82,
  "grade": "B",
  "verdict": "needs-work",
  "hasCritical": false,
  "issueCount": { "critical": 0, "warning": 3, "info": 2 }
}
```

**Pro panel** — shows the full detailed JSON but with the bottom portion (issues array, category breakdowns, recommendations) covered by a gradient blur overlay with a Lock icon and "Upgrade to unlock detailed issues & recommendations" CTA.

Use Tabs component (`src/components/ui/tabs.tsx`) or a simple toggle to switch between views.

### 2h. Gated Response Schema
- [ ] **New file:** `src/components/api-docs/gated-response-schema.tsx`

- `AnalysisResult` interface: fully visible but annotated showing which fields are free vs pro
- `CategoryResult` interface: blurred with gradient overlay + lock icon + "Pro plan" label
- `Issue` interface: blurred with gradient overlay + lock icon + "Pro plan" label

The blur effect: a `div` with `absolute inset-0`, `bg-gradient-to-b from-transparent to-zinc-900`, and `backdrop-blur-sm`, containing a centered Lock icon and upgrade CTA.

### 2i. Rate Limits Section
- [ ] **New file:** `src/components/api-docs/rate-limit-section.tsx`

Simple table showing rate limits per tier + documentation of `X-RateLimit-*` and `X-DevCheck-Tier` response headers. Same table styling as `request-fields-table.tsx`.

### 2j. Categories Grid (kept, moved to bottom)
Keep `src/components/api-docs/categories-grid.tsx` unchanged, just positioned last.

### 2k. Remove the existing full success response example
- [ ] The current full JSON response example in page.tsx gets replaced by the response comparison component. Only the error example remains visible.

---

## 3. Gate the Web Check (`/check` and `/results`)

### 3a. Results Page Gating
- [ ] **Modify:** `src/components/results/results-dashboard.tsx`

After the `OverallScore` component (which shows score, grade, verdict — the "free" data), add a **gate overlay** before the Category Breakdown section:

- Show a glassmorphism card with Lock icon
- Text: "Unlock Full Report" / "Subscribe to see detailed issues, recommendations, and category breakdowns"
- CTA button: "View Plans" linking to `/api-docs#pricing`
- The category cards below are rendered but wrapped in a container with `blur-sm` and `pointer-events-none`
- Users can see the overall score/grade/verdict (proving value) but can't access the detailed breakdown

### 3b. Landing Page CTA Update
- [ ] **Modify:** `src/components/landing/hero.tsx`

- Change "Start Free Check" to "Try Free Check" (subtle signal it's limited)

### 3c. Header Update
- [ ] **Modify:** `src/components/shared/header.tsx`

- Change "API" nav link to "API & Pricing"
- Add a "Sign In" ghost button (non-functional, links to `#` for now — signals it's a product)

---

## 4. Files Summary

### New Files (7)
| File | Purpose |
|------|---------|
| `src/lib/data/pricing.ts` | `PRICING_TIERS` constant |
| `src/components/api-docs/api-hero.tsx` | Marketing hero for API docs |
| `src/components/api-docs/auth-section.tsx` | Bearer token documentation |
| `src/components/api-docs/pricing-section.tsx` | 3-column pricing cards |
| `src/components/api-docs/response-comparison.tsx` | Free vs Pro response side-by-side |
| `src/components/api-docs/gated-response-schema.tsx` | Schema blocks with blur gates |
| `src/components/api-docs/rate-limit-section.tsx` | Rate limit tier table |

### Modified Files (5)
| File | Change |
|------|--------|
| `src/app/api-docs/page.tsx` | Restructure with new sections, update cURL example, remove full response reveal |
| `src/components/api-docs/endpoint-section.tsx` | Show Bearer auth instead of "None (public)" |
| `src/components/results/results-dashboard.tsx` | Add gate overlay before category breakdown |
| `src/components/landing/hero.tsx` | "Start Free Check" → "Try Free Check" |
| `src/components/shared/header.tsx` | "API" → "API & Pricing", add Sign In button |

---

## 5. Verification

- [ ] Run `npm run dev` and verify all pages load without errors
- [ ] Visit `/api-docs` — confirm hero, auth, pricing, response comparison, schema, rate limits, categories
- [ ] Visit `/check` → complete a check → `/results` — confirm gate overlay on category breakdown
- [ ] Visit `/` — hero says "Try Free Check", header shows "API & Pricing" + "Sign In"
- [ ] Check mobile responsiveness on all modified pages
