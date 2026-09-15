# Build log

The StillHer Foundation website rebuild. Branch `rebuild/foundation`.

## 15 September 2026

**Recon**
- Read the build brief end to end.
- Confirmed wrangler is authenticated (account `Lubosikongwa@icloud.com's Account`, d1 write scope present) and `gh` is authenticated as `lubosik`.
- Found the source files on the Desktop. The docx transcript, the primary logo sketch and the Voices United reference resolved. Seven screenshots were iCloud placeholder stubs and would not download after three attempts. Logged in OPEN_QUESTIONS.md and proceeded from the written descriptions in the brief.
- Decoded the logo sketch from the primary screenshot: an S above an H and F ligature that share a crossbar, one long vertical giving the dollar sign read, inside a hand drawn ring.
- Extracted the docx to plain text and distilled it into `reference/TRANSCRIPT_NOTES.md`.
- Confirmed the current Astro and Cloudflare Workers static assets pattern against the live docs.

**Repo**
- Tagged the current state `legacy-rths-v1` and pushed it.
- Renamed the GitHub repo from `stillher-landing` to `StillHerFoundation`.
- Found a dead GitHub personal access token hardcoded in the `origin` URL. Rewrote the remote to a clean HTTPS URL and switched to the `gh` credential helper. Logged for revocation.
- Created branch `rebuild/foundation`.
- Scaffolded Astro 7.3.2 with the sitemap integration. 261 packages installed.

**Foundations**
- Wrote `src/config/site.ts`, the single source for every value Nani still needs to supply.
- Wrote `astro.config.mjs`, verified it parses.
- Wrote OPEN_QUESTIONS.md and DECISIONS.md.

**Agents dispatched**
- `transcript-analyst`: complete. `reference/TRANSCRIPT_NOTES.md`, 443 lines.
- `migration-analyst`: inventory of the live Vercel site and the legacy repo pages.
- `brand-identity`: three emblem directions, wordmark, lockups, mono set, favicons, the Good Weekend seal, design tokens, brand guide.
- `visual-director`: editorial imagery via the Higgsfield MCP, 203 credits available, 150 credit cap.
- `backend-builder`: Worker API, D1 schema, Turnstile, rate limiting, redirects.

## 15 September 2026, afternoon

**Deployed**
- Created the D1 database, applied migrations remotely, set the IP_SALT secret.
- Deployed to https://stillher-foundation.lubosikongwa.workers.dev
- Verified all 16 routes and all 7 legacy redirects live.
- Smoke tested every API endpoint against the live Worker. All four write to D1 correctly, the honeypot writes nothing, the money guard rejects money shaped keys, and a GET returns 405.
- Opened PR #1 into main, left unmerged.

**Client direction, received mid build**
Bosi reviewed the first deploy and asked for four changes: full width pages, less cream and more white, a hamburger menu on desktop so containers are not squeezed, and an overall feel closer to a credible dot org than a fashion microsite.

**Research**
Studied seven reference charity sites including the British Thyroid Foundation, which Nani had cited. Findings in reference/CHARITY_PATTERNS.md. Three conclusions drove the rework:
1. None of the seven uses a persistent desktop sidebar. The fixed left rail was removed.
2. A bare hamburger on desktop costs over 20 percent of discoverability and makes users 39 percent slower, but a combo pattern measures as well as fully visible navigation, and BTF itself ships exactly that. So the hamburger stayed, paired with visible priority links and a permanent Donate button.
3. Every reference site uses white as the base and reserves brand colour for actions. The palette was rebalanced to white canvas, cream bands, turquoise actions.

**Rework**
- Removed the fixed left rail. Pages run full width with a centred container, widened to 88rem.
- Rebuilt the top bar: Menu button with a visible word label, centred emblem, priority links, permanent Donate.
- Rebuilt the drawer: opens at every width, shows all nine sections at once in three labelled groups, two columns on wide screens.
- Canvas switched to white, every former white band flipped to cream.
- Initiative panels now carry their photography with copy landing on solid white for AA contrast, and are taller.
- Footer gained a governance column and a proper legal block.

**Verification**
- Zero horizontal overflow measured at 390, 430, 768, 1280 and 1920 via a CDP driver. Playwright cannot install on this macOS version, so Chrome is driven directly over the DevTools protocol.
- Drawer verified open: aria-expanded flips, focus moves inside, all nine links present.

**Still open**
- Both reviewer agents running against the live URL.
- Two credentials need revoking: a GitHub token that was in the old remote URL, and an OpenRouter key committed in generate-images.js on main.
