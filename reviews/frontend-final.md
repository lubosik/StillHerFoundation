# Frontend review, final

Reviewed against the live deployment at https://stillher-foundation.lubosikongwa.workers.dev, branch `rebuild/foundation`, 15 September 2026.

Tooling: Chrome driven over the DevTools protocol with real `Input.dispatchKeyEvent` key events, axe-core 4.13 injected over CDP, Lighthouse 13.4 mobile, and 34 full page screenshots reviewed by eye. Playwright could not be used: it does not support this macOS version.

Original verdict: NEEDS FIXES. 4 blockers, 16 warnings.
Status after fixes: all 4 blockers and 12 of 16 warnings resolved. See "Resolution".

## BLOCKERS, all fixed

**1. The Menu button had no accessible name below 768px.** WCAG 4.1.2. `.topbar__menu-label` used `display: none` under 48rem, which removes the word from the accessible name, and the burger span is `aria-hidden`. The accessibility tree reported `role=button name=""` at 390px. Every phone user on a screen reader met an unlabelled button.
Fixed: the label now uses the visually hidden clip technique instead of `display: none`, so it stays in the accessibility tree at every width. Verified: `name="Menu"` at 390px.

**2. The closed drawer stayed in the tab order and the accessibility tree.** WCAG 2.4.3, 2.4.7, 1.3.2. The drawer was only moved offscreen with a transform. Focusing Donate and pressing Tab landed on 12 invisible controls before any page content, and every page's heading outline began with the drawer's three group headings before the `h1`.
Fixed: the drawer now ships with `inert` and `aria-hidden="true"`, removed on open and reapplied on close, with focus moved out before the subtree goes inert and a `visibility` fallback for browsers without `inert`. Verified: 0 focusable elements in the closed drawer, and the heading outline now starts with the `h1`.

**3. Footer placeholder text failed contrast on every page.** WCAG 1.4.3. `.ph` inherits `--ink-soft` `#5D574E`, which is 2.42:1 on the ink footer, and 1.82:1 on the reduced opacity copyright line.
Fixed: `.footer .ph` and `.section--ink .ph` now inherit the surface text colour at 0.85 opacity. The italic styling still signals the placeholder. Verified: computed colour is now cream.

**4. The focus indicator failed non text contrast.** WCAG 1.4.11, which requires 3:1. The ring used `--gold` `#C9A961`, measuring 2.25:1 on white, 2.01:1 on cream and 1.95:1 on sand tint.
Fixed: the ring now uses `--gold-ink` `#7A6229`, which is 5.82:1 on white and 5.22:1 on cream. The lighter `--gold` is retained inside `.section--ink` and the footer, where it reaches 7.7:1. Verified in the shipped stylesheet.

## WARNINGS

Fixed:
- Canonical and sitemap used trailing slashes while the Worker serves the slashless form. Also, both pointed at a domain that is not purchased while the site is live on workers.dev. `PUBLIC_SITE_URL` now drives canonical, sitemap, Open Graph and robots from one value in `.env`, currently the workers.dev host. One line to change when the real domain goes live.
- The 404 emitted a canonical and no `noindex`. It now emits `noindex, follow` and no canonical.
- `robots.txt` was not in the repo; the 200 was Cloudflare's managed file with no sitemap line. Now generated from the same site URL.
- Copy spacing from placeholders: "published byThe StillHer Foundation" on Terms, "the The StillHer Foundation website" on Privacy, and "organisation.501(c)(3) status: pending" in the footer. All three fixed.
- Footer Instagram icons linked to a bare `https://instagram.com/`. They now render as non interactive content until a handle exists, which also cleared Lighthouse's `crawlable-anchors` failure.
- The disabled sponsorship deck button measured 1.99:1. Opacity raised to 0.7 with `--gold-ink` text.
- Inactive slideshow dots were 1px `--sand` on cream at 1.46:1. Now 2px `--ink-soft`.
- Text input borders were `--sand` on white at 1.64:1. Now `--ink-soft` at 6.4:1.
- `role="group"` on an `<article>` violated `aria-allowed-role`. Slides are now `<div role="group">`.
- The slide 1 CTA read "Learn more". Now "About the documentary".
- The pause button set both `aria-pressed` and a Pause/Play label, which double announces and contradicts. The visible label is now the single source of state.
- The impact band had no heading, only a styled span. Now an `h2`.
- Stale comment in `src/config/site.ts` describing a top bar that no longer exists.

Left open, deliberately:
- `/about` labels the retreat "Autumn" while `/her-relief-retreat` says "Details to be announced". The transcript records "realistically, October" as intent, not a fixed date. Logged in OPEN_QUESTIONS.md for Nani rather than guessed at.
- Her Future meta description is 169 characters, slightly over the 160 guideline. Cosmetic.
- Turnstile markup is absent because no site key is set. Forms run on the honeypot alone, as documented in PLACEHOLDERS.md.

## PASSED

**Build and routing.** 16 pages build clean. All 16 routes return 200, an unknown path returns the designed 404.

**Greps.** Zero em-dashes in `dist/`, `src/`, `public/` or `worker.js`. Zero occurrences of the financial firm or its carrier anywhere. No reference to the legacy AI generated images `hero.png`, `portrait.png`, `hands.png` or `leah-young.png`.

**Navigation.** Menu button left, centred emblem, priority links and Donate on desktop, priority links correctly hidden at 390px. Drawer opens from the left at every width with three labelled groups, nine links and a Donate CTA. No fixed sidebar at any width. Keyboard with real key events: click opens, focus moves to the first item, Tab wraps both ways, Escape closes and returns focus to the Menu button.

**Content.** The `h1` is exactly "I won't let Graves' disease put me in one." The mission line is exact. Five slides present, the Dubai slide reads "Holding space for Dubai speech" and looks finished. Sponsors are exactly John Victoria, Juliana, Pollyanna, Your Name Here. A regex scan of `/the-good-weekend` for months, weekdays, ordinals and cities found only "2027". `/her-relief-retreat` carries no month, season, year, doctor or place. The Her Future funnel exposes only `pillar`, `has_iul_policy`, `has_business_insurance`, `happy_with_it`, `notes`, `name`, `email`, `phone`, `disclaimerAccepted`, and no label or legend asks about income, assets, net worth, salary or balances.

**Colour.** No `--teal` or `#5bbcc9` carries text anywhere in source or built CSS. `--gold` text appears only on ink backgrounds at 7.7:1. A computed contrast sweep of every visible text node across all 16 routes now passes AA.

**Structure.** Exactly one `h1` per route, no heading level skips, zero images without `alt`, zero unlabelled form controls.

**Interaction.** Skip link focuses first and moves focus to `main`. Slideshow responds to arrow keys, hides inactive slides from assistive tech and removes their CTAs from the tab order, and the pause button holds the slide. Under `prefers-reduced-motion` the unveiling never appears, durations collapse to 0.01ms and the slideshow starts paused and does not advance. The partnerships tabs respond to arrow keys, Home and End. The Her Future funnel completes keyboard only, posts to the API and shows the booking placeholder.

**Responsive.** All 16 routes at 390, 768, 1280 and 1920 satisfy `scrollWidth <= innerWidth + 1`. Screenshots reviewed at 390 and 1440 for every route: nothing cropped, overlapping or reading as unfinished. Placeholder frames read as deliberate.

**SEO.** Unique title and description per route, canonical present, Open Graph and Twitter tags, valid JSON-LD `NGO` on every page. Sitemap and OG image resolve.

## Lighthouse mobile, after fixes

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 93 | 100 | 100 | 100 |
| Road to Her Smile | 100 | 100 | 100 | 100 |
| Her Future | 97 | 100 | 100 | 100 |

Before the fixes: 98 / 92 / 100 / 92, 98 / 92 / 100 / 100, 98 / 91 / 100 / 100. Accessibility moved from 91 to 92 up to 100 across the board, and SEO to 100.

## VERDICT: APPROVED after fixes
