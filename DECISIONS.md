# Decisions

Choices made during the autonomous build, with reasoning, so any of them can be reversed knowingly.

Last updated: 15 September 2026

## Stack

**Astro 7.3.2, `output: 'static'`.** Every page on this site is content. Nothing needs server rendering. Static output gives the best Lighthouse numbers and the simplest deploy.

**Cloudflare Workers with static assets, not Pages.** Cloudflare now recommends Workers for new projects. `dist/` is served as static assets, and the Worker runs first only for `/api/*` plus the legacy `.html` redirect paths.

**Hand rolled CSS with design tokens, not Tailwind.** The look is editorial: large type, generous whitespace, a small number of repeated components. A token file plus component scoped styles expresses that more directly than utility classes, ships less CSS, and keeps every design value in one place, which is what the brief asked for. Tokens live in `src/styles/tokens.css`.

**D1 for form data.** Four small tables. No ORM. Plain prepared statements.

**No JavaScript framework.** The interactive pieces are a slideshow, a drawer, tabs, a multi step funnel and copy buttons. Each is a small vanilla island. This keeps the JS budget near zero.

## Content and copy

**Sep 14 wins every conflict.** Where the two meetings disagree, the Sep 14 meeting is the truth. The most consequential reversal: The Good Weekend is the foundation's cash engine and Road to Her Smile is one of three initiatives, self funded. Copy follows this.

**Nothing is invented.** No impact stat, date, venue, testimonial, doctor, partner or quote appears unless it came from the transcript or the existing site. Everything else renders as a visible placeholder.

**The hero headline is verbatim.** "I won't let Graves' disease put me in one." The pun on "grave" is deliberate and is preserved exactly, apostrophe included.

**No em-dashes anywhere.** Site copy, alt text, meta tags, code comments, commit messages and docs all use periods, commas, colons or line breaks instead. Enforced by a grep check over `dist/` before deploy.

**The financial services firm is never named.** Financial services appear only as "Her Future" under the foundation. No exception, including in code comments.

## Design

**`#5BBCC9` never carries text.** It is 2.2:1 on white, which fails AA badly. It is used for large fills, bands, ribbons, the emblem and decorative rules. All teal coloured text, links and button fills use the derived `#1F6670`, which is 6.6:1 on white and 5.9:1 on cream.

**Gold is a hairline only.** `#C9A961` appears as thin rules, the emblem's inner sliver, small caps labels on dark and focus rings. Never as a large fill, because it goes muddy and it fails contrast at body sizes.

**The top bar carries three things and nothing else.** About Us, the centred emblem, About the Founder. This mirrors L'Echelon's split around a centred monogram and it is an explicit Sep 14 instruction. Everything else lives in the left rail.

**No purple.** Sep 14 settled the palette as turquoise, cream, sand and light gold.

## Motion

**The unveiling plays once per session.** `sessionStorage` gates it. Under 2.5 seconds, skippable with a visible control and with Escape, and fully disabled under `prefers-reduced-motion`. It is a light sweep across the emblem on a cream ground, not a dark curtain, because Nani explicitly did not want the darkness of her Rosen Relations site.

**The slideshow pauses on hover and on focus**, exposes a visible pause button, is keyboard operable with arrow keys, and does not auto advance under `prefers-reduced-motion`.

## Privacy and security

**No raw IP is ever stored.** The API stores a SHA-256 hash of the IP salted with `IP_SALT`. Logs carry route, status and a request id only. No email, name or message body is ever logged.

**Her Future never asks about money.** The funnel collects a pillar, one or two yes/no questions, an optional notes box and contact details. The API actively rejects any payload containing income, asset, net worth or balance keys. This is a discovery call, not a qualification form.

**Turnstile degrades gracefully.** If `TURNSTILE_SECRET_KEY` is absent, forms still work with the honeypot alone and the gap is logged rather than the form breaking.

## Deploy

**The rebuild does not go to `main`.** It ships to a `workers.dev` URL from the `rebuild/foundation` branch, with a PR opened into `main` and left unmerged. Merging may redeploy the Vercel site, which is linked from live donation materials, so that is Bosi's call to make deliberately.
