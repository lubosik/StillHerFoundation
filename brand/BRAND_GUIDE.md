# The Still Her Foundation, brand guide

One page. Everything here is enforced by `src/styles/tokens.css`, which is the only place
design values are defined.

---

## 1. The emblem

`public/brand/emblem.svg` is the working logo. An S, H and F monogram in a ring: the S in
the upper centre, an H and F below sharing a single horizontal that serves as the H's
crossbar and the F's top arm, and one long vertical running down through all of it. That
vertical through the S gives the mark its dollar sign read, and it is intentional.

The mark is hand built path geometry. It carries no type, so it never depends on a font
and can go straight to an embroiderer or a die maker.

| File | Use |
| --- | --- |
| `public/brand/emblem.svg` | Default. Teal with a gold sliver ring. |
| `public/brand/mono/emblem-tealink.svg` | One colour, on cream or white. |
| `public/brand/mono/emblem-gold.svg` | One colour gold, on dark grounds only. |
| `public/brand/mono/emblem-white.svg` | One colour white, over dark photography. |
| `public/brand/mono/emblem-1c.svg` | Embroidery and stamping. Flat, no hairlines. |
| `public/favicon.svg` | Browser tab. Simplified, thickened, no gold. |
| `public/brand/lockup-stacked.svg` | Emblem above the wordmark. |
| `public/brand/lockup-horizontal.svg` | Emblem left, wordmark right. |
| `public/brand/good-weekend-seal.svg` | The tournament only. Never the foundation. |

### Clear space

Leave at least **one quarter of the emblem's ring diameter** clear on every side. At a
48px emblem that is 12px. Nothing enters it: no type, no rule, no photo edge, no other
logo. In the lockups the clear space is measured from the emblem, not from the wordmark.

### Minimum sizes

| Mark | Minimum |
| --- | --- |
| `emblem.svg`, full | 32px, or 12mm in print |
| `emblem-1c.svg`, embroidered | 40mm patch |
| `favicon.svg` | 16px |
| `lockup-horizontal.svg` | 180px wide |
| `lockup-stacked.svg` | 120px wide |

Below 32px use the favicon or the single colour mark. The full emblem's hairlines and its
gold sliver are not built to survive smaller than that.

---

## 2. Colour

| Token | Hex | Role |
| --- | --- | --- |
| `--teal` | `#5BBCC9` | Signature. Emblem, rules, bands, ribbons, large fills. **Never text.** |
| `--teal-ink` | `#1F6670` | All teal coloured text, every link, every teal button fill. |
| `--gold` | `#C9A961` | Hairline accents only. Thin rings, thin rules, emblem inlay. **Never a large fill, never text.** |
| `--gold-ink` | `#7A6229` | Gold that carries small caps labels and sits beside text. |
| `--cream` | `#F7F2E9` | Primary page canvas. |
| `--sand` | `#D9C8AE` | Borders and edges. Not a text background. |
| `--sand-tint` | `#EFE7D9` | Alternating section surfaces. Safe for body copy. |
| `--white` | `#FFFFFF` | Cards, alternating sections. |
| `--ink` | `#1C1A17` | Body text. |
| `--ink-soft` | `#5D574E` | Captions, hints, secondary copy. |
| `--error` | `#9A2F23` | Form errors only. |

Purple is not in the palette. It never appears.

### The contrast rule

`#5BBCC9` is **2.21:1 on white** and **1.99:1 on cream**. It fails WCAG 2.2 AA for text at
any size. It is a shape colour, not a text colour. `#1F6670` is the teal that carries type.

### Measured ratios

All values are WCAG 2.2 contrast ratios, computed from the token hexes. AA needs 4.5:1 for
body text and 3:1 for large text and UI boundaries.

| Foreground | on `--cream` #F7F2E9 | on `--white` #FFFFFF | on `--sand-tint` #EFE7D9 | Verdict |
| --- | --- | --- | --- | --- |
| `--ink` #1C1A17 | **15.57:1** | **17.36:1** | **14.14:1** | AAA everywhere |
| `--ink-soft` #5D574E | **6.41:1** | **7.15:1** | **5.82:1** | AA everywhere |
| `--teal-ink` #1F6670 | **5.90:1** | **6.58:1** | **5.36:1** | AA everywhere |
| `--gold-ink` #7A6229 | **5.22:1** | **5.82:1** | **4.74:1** | AA everywhere |
| `--error` #9A2F23 | **6.71:1** | **7.49:1** | **6.10:1** | AA everywhere |
| `--teal` #5BBCC9 | 1.99:1 | 2.21:1 | 1.80:1 | **fails. Not a text colour.** |
| `--gold` #C9A961 | 2.02:1 | 2.25:1 | 1.83:1 | **fails. Not a text colour.** |

Reversed out, for buttons and dark bands:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `--white` on `--teal-ink` | **6.58:1** | AA |
| `--white` on `--error` | **7.49:1** | AA |
| `--white` on `--gold-ink` | **5.82:1** | AA |
| `--ink` on `--teal` | **7.84:1** | AA. This is how teal carries a label. |
| `--ink` on `--gold` | **7.71:1** | AA |

One caution: `--sand` #D9C8AE is darker than it looks. `--teal-ink` lands at 4.02:1 on it
and `--ink-soft` at 4.36:1, both short of AA. Only `--ink` clears it, at 10.60:1. Treat
sand as a border colour. Any surface that will hold body copy uses `--sand-tint`.

---

## 3. Type

Three families, all self hosted in `public/fonts/`, latin and latin-ext only.

| Role | Family | Token |
| --- | --- | --- |
| Display | **Bodoni Moda** | `--font-display` |
| Script | **Pinyon Script** | `--font-script` |
| Labels and UI | **Jost** | `--font-sans` |

Bodoni Moda and Jost are variable, so one file per style covers the whole weight range.
Every face is `font-display: swap` with a real fallback stack behind it.

**Bodoni Moda** is the voice of the site. High contrast, editorial, and its italic is
genuinely beautiful. Use the italic for **one emphasis word per headline**, never two, and
never a whole headline.

**Pinyon Script** appears in exactly one place by default: the word *Her* in the wordmark.
Anything beyond that is a rare flourish and needs a reason. Never set a sentence in it,
never set it below 28px, and never set it in all caps.

**Jost** carries every label, eyebrow, button and piece of UI text. Uppercase, with
`--track-wide` (0.18em) or `--track-widest` (0.3em). Tracked uppercase is the only way
small Jost is used.

### Scale

Fluid, `clamp()` based, 320px to 1440px viewport.

| Token | Min | Max | Use |
| --- | --- | --- | --- |
| `--step--2` | 11px | 12px | Legal, fine print |
| `--step--1` | 13px | 15px | Captions, labels |
| `--step-0` | 16px | 18px | **Body** |
| `--step-1` | 19px | 23px | Lede, large body |
| `--step-2` | 23px | 31px | Subheads |
| `--step-3` | 28px | 42px | Section heads |
| `--step-4` | 34px | 58px | Page heads |
| `--step-5` | 42px | 92px | **Hero** |

---

## 4. Do

- Put the emblem on cream, white, or a dark photograph using the white mono version.
- Give it its clear space, always.
- Use `--teal-ink` for anything a person has to read.
- Keep gold to hairlines: a 1px rule, a thin ring, a small caps label on dark.
- Use the italic for one word.
- Use `emblem-1c.svg` for anything stitched, stamped or struck.
- Let the emblem sit alone. It is built to.

## 5. Do not

- Do not set text in `#5BBCC9`. Not headings, not labels, not links, not at any size.
- Do not fill a large area with gold. It reads as cheap the moment it stops being a line.
- Do not recolour the emblem outside the four supplied mono versions.
- Do not add the tournament ring text to the main emblem. That belongs to the seal alone.
- Do not stretch, skew, rotate, outline, or add a shadow to the mark.
- Do not rebuild the emblem out of live type. It is path geometry for a reason.
- Do not put the full emblem below 32px. Use the favicon or the single colour mark.
- Do not put body copy on `--sand`.
- Do not introduce purple, or any colour not in the table above.
- Do not define a colour, size, radius or duration anywhere but `src/styles/tokens.css`.
