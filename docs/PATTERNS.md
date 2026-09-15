# Frontend patterns

Read this before writing a page. Every page must match these conventions so the site reads as one piece of design.

## The look in one line

Luxury fashion magazine meets high trust charity. Cream canvas, teal signature, champagne gold hairlines, big editorial serif, tracked uppercase labels, generous whitespace. Never dark, never corporate blue, never clinical.

## File layout

```
src/
  config/site.ts        every placeholder value, single source of truth
  layouts/Base.astro    html shell, SEO, top bar, rail, footer
  styles/tokens.css     every design value
  styles/base.css       reset, typography, buttons, cards, forms, utilities
  components/           shared components
  pages/                one file per route
```

Import with the `@/` alias, for example `import Base from '@/layouts/Base.astro'`.

## Page skeleton

```astro
---
import Base from '@/layouts/Base.astro';
---

<Base title="Page name" description="One sentence under 160 characters.">
  <section class="section">
    <div class="wrap">
      <span class="label">Tracked uppercase kicker</span>
      <h1>Headline with one <span class="em">italic</span> word</h1>
    </div>
  </section>
</Base>
```

`title` is the page name only. Base appends the site name. Do not repeat it.

## Layout classes (in base.css, use these, do not reinvent)

- `.wrap` wide content column. `.wrap--narrow` prose column.
- `.section` vertical rhythm. Modifiers: `--tight`, `--white`, `--sand`, `--teal`, `--ink`.
- `.grid` plus `.grid--2`, `.grid--3`, `.grid--4`.
- `.stack` for vertical flow between children.
- `.card`, `.card__title`.
- `.btn` plus `.btn--primary`, `--ghost`, `--gold`, `--on-dark`.
- `.label` tracked uppercase kicker. `.label--gold`, `.label--on-dark`.
- `.em` italic emphasis word inside a display headline.
- `.rule`, `.rule--short` gold hairline.
- `.ph-frame` a designed empty image slot. Set `style="--ph-ratio: 4 / 5"`.
- `.visually-hidden`, `.hp` (honeypot).

Alternate section backgrounds down a page so it never reads as one flat slab. A good default run is cream, white, sand-tint, cream, ink for the footer approach.

## Typography rules

- One `h1` per page. Heading levels never skip.
- Use `.em` on exactly one word per major headline, not more. "The New Standard in *Luxury* Editorial" is the energy.
- Body copy lives in `<p>`, which is already capped at a readable measure.
- Tracked uppercase is for labels, buttons and nav only. Never for body copy.

## Colour rules, enforced by review

- `--teal` (#5BBCC9) NEVER carries text. Large fills, bands, rules and decoration only.
- All teal coloured text, links and button fills use `--teal-ink` (#1F6670).
- `--gold` (#C9A961) is a hairline only: thin rules, borders, focus rings, small caps on dark. Never a large fill, never body text. Small gold text uses `--gold-ink`.
- Every text and background pair must pass WCAG 2.2 AA.
- No purple anywhere.

## Placeholders

Never invent a fact, stat, date, venue, testimonial, doctor, partner or quote.

Anything Nani still owes us comes from `src/config/site.ts` and renders through the `Placeholder` component:

```astro
import Placeholder from '@/components/Placeholder.astro';
<Placeholder field={org.email} />
```

For a missing image use `.ph-frame` with a short descriptive line inside. A pending section must still look finished and deliberate, never broken or empty.

If you need a new placeholder value, add it to `site.ts` using the `p()` helper and note it. Do not hardcode a "TODO" in a page.

## Forms

Every form posts JSON to the Worker API. The shared handler in `src/scripts/forms.ts` binds automatically to any form with `data-form`.

```astro
<form data-form data-endpoint="/api/inquiry" data-success="Thank you. We will be in touch." novalidate>
  <input type="hidden" name="type" value="partnership" />

  <div class="hp" aria-hidden="true">
    <label for="x-website">Leave this field empty</label>
    <input type="text" id="x-website" name="website" tabindex="-1" autocomplete="off" />
  </div>

  <label class="field">
    <span class="field__label">Name</span>
    <input type="text" name="name" required maxlength="120" autocomplete="name" />
  </label>

  <button type="submit" class="btn btn--primary">Send</button>
  <p class="form__status" data-status role="status" aria-live="polite"></p>
</form>
```

Rules:
- Every form carries the honeypot block. Give the honeypot input a page unique `id`.
- Every form has a `[data-status]` live region.
- Every input has a real `<label>`, not a placeholder standing in for one.
- Add the Turnstile div only when `import.meta.env.PUBLIC_TURNSTILE_SITE_KEY` is set, exactly as `Newsletter.astro` does.

Endpoints: `/api/subscribe`, `/api/her-future`, `/api/inquiry`, `/api/interest`. See `docs/BACKEND.md` for the exact payload each one takes.

## Interactivity

Small vanilla islands in a `<script>` tag at the bottom of the component. No framework, no library.

Every interactive thing must:
- Work with a keyboard, with a visible focus ring.
- Carry correct ARIA (`aria-expanded`, `aria-controls`, `aria-selected`, `role="tab"` and friends).
- Respect `prefers-reduced-motion`.
- Remove hidden content from the tab order.

Copy `Slideshow.astro` and `Rail.astro` for the house style.

## Images

Use `.ph-frame` until the visual director's images land in `src/assets/images/`. When they exist, use Astro's `<Image>` or a `<picture>` with AVIF then WebP, explicit `width` and `height`, `loading="lazy"` below the fold and `decoding="async"`.

Alt text describes the image. Decorative images take `alt=""`. No em-dashes in alt text.

## Hard constraints, every one is a review blocker

1. **No em-dashes.** Not in copy, alt text, meta tags, comments or commit messages. Use periods, commas, colons or line breaks. `grep -r "—" dist/` must return nothing.
2. **Never name the financial services firm.** The strings "Premier Financial Alliance" and "National Life Group" must appear nowhere, including comments. Financial services are presented only as "Her Future".
3. **No invented facts.** No stat, date, venue, testimonial, doctor, partner or quote that did not come from the transcript or the existing site.
4. **No AI images of real people.** The legacy repo's `hero.png`, `portrait.png`, `hands.png` and `leah-young.png` are AI generated and are captioned as real people. Do NOT use them. Use `.ph-frame` instead.
5. **Do not publish Good Weekend dates or a venue.** "Spring 2027, dates to be announced" only.
6. **Her Future never asks about money.** No income, assets, net worth or balances.
