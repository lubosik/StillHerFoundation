# Placeholders

Every value Nani still needs to send, and where it goes.

Almost all of them live in one file: `src/config/site.ts`. Drop the real value in, flip `pending` to `false`, and the whole site updates. Nothing is hardcoded in a page.

Last updated: 15 September 2026

## How a placeholder behaves

A pending value renders through `src/components/Placeholder.astro`.

- In development it gets a gold dashed outline, so nothing ships by accident.
- In production it degrades to a neutral line such as "Coming soon", never an empty gap.
- A missing image renders as `.ph-frame`, a designed empty frame with a gold inner rule and a short descriptive line, so a pending section still looks finished.

## 1. Organisation

| Value | Config path | Currently |
|---|---|---|
| Registered legal entity name | `org.legalName` | "The StillHer Foundation", needs confirming |
| Domain | `org.domain` | Assumes `stillherfoundation.org`, not purchased |
| Contact email | `org.email` | `hello@stillherfoundation.org`, carried from the current site, needs confirming |
| 501(c)(3) status and EIN | `org.taxStatus` | Renders as "501(c)(3) status: pending" in the footer |
| Year founded | `org.founded` | Empty |
| Registered mailing address | `org.address` | Empty. Needed for the privacy and terms pages |

## 2. Social

| Value | Config path |
|---|---|
| Instagram for The StillHer Foundation | `social.foundationInstagram` |
| Instagram for Nani Rosen | `social.naniInstagram` |

Two Instagram icons sit in the footer. A "Follow Nani" link sits on `/founder`. Neither appears in the header, by design.

## 3. Ways to give (`/support`)

All seven cards render from the `giving` array. Each needs its handle or address.

| Method | Config id | Needed |
|---|---|---|
| Card | `card` | Confirm the Railway link `https://stillher-donation-production.up.railway.app/` is still correct |
| Venmo | `venmo` | Handle |
| PayPal | `paypal` | Handle or paypal.me link |
| Cash App | `cashapp` | $cashtag |
| Zelle | `zelle` | Email or phone number |
| Bitcoin | `btc` | Wallet address. Confirm the network |
| XRP | `xrp` | Wallet address, and the destination tag if one is required |

QR codes for BTC and XRP are generated at build time from the address. While an address is empty no QR is produced and a designed placeholder square shows instead.

## 4. Her Future (`/her-future`)

| Value | Config path | Needed |
|---|---|---|
| Booking calendar | `herFuture.bookingUrl` | The joint link Nani and her partner are creating. Until it is set, the funnel still saves the visitor's answers to the database and shows a designed "booking opens shortly" frame instead of a broken embed |
| Compliance wording | `herFuture.compliance` | A general "information only, not financial advice" footer is in place. **This must be confirmed with her firm before launch** |

The disclaimer text is already final and needs nothing.

## 5. Partnerships

| Value | Config path | Needed |
|---|---|---|
| Sponsorship deck PDF | `partnerships.sponsorshipDeck` | Drop the PDF into `public/docs/` and set the path. Until then the download button renders visibly inactive rather than as a dead link |

## 6. Impact band (home page)

| Value | Config path |
|---|---|
| Women reached | `impactStats[0].value` |
| Raised for the work | `impactStats[1].value` |
| Communities served | `impactStats[2].value` |

No number is invented. The band renders as finished design with "Pending" values. If Nani would rather not publish numbers at all, delete the `impactStats` array and the band disappears.

## 7. Imagery and media

These are not in `site.ts`. They are image files.

| Slot | Where | Needed |
|---|---|---|
| Hero portrait | Home | Nani's new photoshoot. Art direction: activist, survivor, campaign energy, less businessy |
| Founder portrait | `/founder` | Same shoot |
| Dubai award | Home slideshow, slide 3 | Award photography from the Wisdom & Wealth Summit |
| Acceptance speech | Home slideshow, slide 3 | Speech text or video. The slide currently reads "Holding space for Dubai speech" and looks finished |
| The interview | Home slideshow, slide 4 | Wisdom & Wealth Summit interview link or footage |
| Campaign editorial | Home slideshow, slide 5 | Photoshoot imagery |
| Speaker videos | `/speaker` | Footage, once the videographer has been following her |

Twelve editorial atmosphere images already exist in `src/assets/images/`, generated to the campaign art direction. None of them contain a face, by design. They cover backplates, the road, the ribbon, the golf course, the club terrace, the retreat, the desk, the stage and three textures. The list and the prompts are in `brand/IMAGE_LOG.md`.

**No AI image of a real person appears anywhere on the site**, and none ever should. The legacy site's `hero.png`, `portrait.png`, `hands.png` and `leah-young.png` were AI generated and captioned as real people. They are not migrated.

One real photograph was rescued from the live site before it can be retired: `reference/rescued-images/lia-italy.jpg`, captioned there as "Lia Spriggs in her modeling years". Its provenance is not confirmed, so it is not placed on any page yet. Confirm with the client before publishing it.

## 8. Not a placeholder, but needed before launch

- Revoke the GitHub personal access token that was hardcoded in the old git remote, and the OpenRouter key that is committed in `generate-images.js` on `main` and under the `legacy-rths-v1` tag. Both are in git history and must be treated as compromised.
- Confirm the Turnstile keys. Without `TURNSTILE_SECRET_KEY` the forms still work, protected by the honeypot alone.
- Decide whether to keep the Vercel deployment running. It is linked from donation materials.
