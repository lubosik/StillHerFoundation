# Image Log

Non-portrait imagery for The StillHer Foundation site. Owned by `visual-director`.

## Generation summary

| Item | Value |
|---|---|
| Provider | Higgsfield MCP |
| Model | `nano_banana_2` (Nano Banana 2, Google) at `resolution: 2k`, `aspect_ratio: 16:9` |
| Native output | 2752 x 1536 PNG |
| Cost per image | 2 credits |
| Images generated | 24 (2 candidates per slot, 12 slots) |
| Images accepted | 12 |
| Credits spent | 48 |
| Starting balance | 203.04 |
| Closing balance | 155.04 |
| Budget cap | 150 credits (not exceeded) |

### Why this model

`models_explore` returned no published credit costs, so a two image probe batch was run
against slot 1 and the spend was read back from `transactions`. Nano Banana 2 at the 2k tier
bills 2 credits per image. GPT Image 2, the next obvious candidate, bills 11 credits per
image on the same account. Nano Banana 2 delivered 2752 x 1536 photoreal output that met the
art direction on the first pass, so the whole shot list ran on it at roughly one fifth the
cost of the alternative. Full budget for 24 images came to 48 credits.

## Art direction applied to every prompt

Luxury campaign editorial. Soft natural light. Cream and sand environments. Teal as an accent
in fabric, water or florals. Fine champagne gold detail. Subtle film grain. Calm, powerful,
feminine. Every prompt carried an explicit negative tail: no people, no faces, no text, no
lettering, no watermark, no logos, no signage.

Palette echoed: teal `#5BBCC9`, champagne gold `#C9A961`, cream `#F7F2E9`, sand `#D9C8AE`.

## Compliance check

No identifiable human face appears in any accepted image. Two images contain human hands only
(`rths-ribbon`), cropped above the wrist with no head, neck or face in frame. No image depicts
a real person. Every accepted image was inspected at full resolution before acceptance.

Two candidates were rejected specifically for embedded text, which confirms the check is doing
work: the discarded `good-weekend-terrace` candidate carried a printed menu card, and the
discarded `speaker-stage` candidate had a lit EXIT sign above a stage door. Both were replaced
by their sibling candidate rather than regenerated, so no extra credits were spent.

## Output format

Each accepted image is published as WebP and AVIF at 1920, 1280 and 640 pixel widths in
`src/assets/images/`, named `<slot>-<width>.<ext>`. Quality was selected per file by a
descending ladder that stops at the first setting under the size cap, so the 1920 WebP stays
under 250KB and the 1920 AVIF under 180KB. Full resolution PNG sources are retained in
`src/assets/images/_originals/`.

## Slots

### 1. hero-backplate

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/hero-backplate-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/hero-backplate.png` |

Prompt:

> Editorial campaign backplate. Cream limewash surface with soft texture, a shaft of warm natural light through linen drapery, teal silk folds along one edge, champagne gold glints, sand tones, quiet luxury, subtle film grain, shot on medium format film, empty composition with negative space, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> Cream plaster wall lit through linen, with teal silk drapery falling along one edge.

Note: chosen over a busier sibling candidate because the large flat centre of wall gives
headline type a clean field to sit on.

### 2. rths-road

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/rths-road-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/rths-road.png` |

Prompt:

> An empty open country road at golden hour, warm Verona toned light, cypress and soft hills in the far distance, long low sun flare, dust haze, cinematic luxury travel campaign photography, cream and sand tones, subtle film grain, shot on medium format film, no people, no faces, no cars, no text, no lettering, no watermark, no logos, no signage

Alt text:

> An empty country road running toward low golden sun over warm distant hills.

### 3. rths-ribbon

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/rths-ribbon-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/rths-ribbon.png` |

Prompt:

> Two womens hands gently holding a single length of teal silk ribbon between them, cropped at the wrists, cream studio background, soft natural window light, champagne gold light on the silk, luxury campaign editorial still life, subtle film grain, shallow depth of field, no faces, no heads, no text, no lettering, no watermark, no logos

Alt text:

> Hands cropped at the wrist holding a length of teal silk ribbon against cream.

Note: the accepted frame resolved as four hands rather than two, which reads as shared
support and was kept deliberately. No faces, heads or necks are in frame.

### 4. good-weekend-course

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/good-weekend-course-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/good-weekend-course.png` |

Prompt:

> Dawn light over an immaculate golf green, dew beaded on close cut grass, soft mist drifting, long golden shadows, sand bunker edge in warm tone, serene luxury resort editorial photography, cream and sand palette, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos, no signage

Alt text:

> A dew covered golf fairway at dawn with drifting mist and a raked sand bunker.

### 5. good-weekend-terrace

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/good-weekend-terrace-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/good-weekend-terrace.png` |

Prompt:

> An elegant outdoor terrace table at golden hour, white tablecloth, gold flatware, cream ceramic plates, a single teal silk napkin, soft warm sunset light across stone balustrade, fine dining luxury editorial photography, calm and refined, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> A terrace dinner table in evening light with gold cutlery and a teal silk napkin.

Note: the sibling candidate was rejected for a printed menu card in frame.

### 6. retreat-spa

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/retreat-spa-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/retreat-spa.png` |

Prompt:

> Spa stillness, neatly rolled cream towels on a sand coloured stone ledge, white plumeria flowers floating on calm teal toned water, soft natural light, gentle ripples, champagne gold tray detail, luxury wellness campaign photography, serene, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> Rolled cream towels beside plumeria blossoms floating on still teal water.

### 7. retreat-coast

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/retreat-coast-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/retreat-coast.png` |

Prompt:

> Tropical Pacific shoreline in warm late afternoon light, soft teal water meeting cream sand, low foam, volcanic rock softened by long exposure, misty green cliffs beyond, quiet luxury resort editorial photography, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> Soft teal surf meeting pale sand below misty green Hawaiian cliffs at sunset.

### 8. her-future-desk

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/her-future-desk-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/her-future-desk.png` |

Prompt:

> Still life of a soft leather portfolio and a gold nib fountain pen resting on a cream desk surface in early morning sun, long soft shadow, a folded teal silk square nearby, editorial luxury product photography, calm and aspirational, subtle film grain, no people, no faces, no text, no lettering, no writing, no watermark, no logos

Alt text:

> A leather portfolio, gold nib fountain pen and folded teal silk in morning light.

### 9. speaker-stage

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/speaker-stage-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/speaker-stage.png` |

Prompt:

> A microphone on a stand in shallow focus on an empty stage, a single warm golden spotlight behind it, cream and deep teal shadow, haze in the beam, quiet anticipation, cinematic luxury photography, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> A microphone on an empty stage lit from behind by one warm spotlight through haze.

Note: the sibling candidate was rejected for a lit EXIT sign above a stage door.

### 10. texture-paper

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/texture-paper-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/texture-paper.png` |

Prompt:

> Extreme close up of handmade cream paper surface, visible cotton fibres and gentle undulation, warm soft side light casting micro shadows, sand and ivory tones, refined minimal texture background, subtle film grain, no people, no faces, no text, no lettering, no watermark, no logos

Alt text:

> Macro view of cream handmade paper showing cotton fibre grain in soft side light.

Note: chosen over a deckled edge candidate because the full bleed fibre field works as a
section background without a focal point competing for attention.

### 11. texture-teal-wash

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/texture-teal-wash-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/texture-teal-wash.png` |

Prompt:

> A soft teal watercolour wash bleeding across cream cotton paper, organic feathered edges, pooling pigment with granulation, pale sand ground showing through, gentle gradient from deep teal to almost nothing, fine art abstract texture, scanned artwork, subtle grain, no people, no faces, no text, no lettering, no brush, no watermark, no logos

Alt text:

> A soft teal watercolour wash bleeding across cream cotton paper.

### 12. texture-gold-lines

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4 (2 candidates) |
| Files | `src/assets/images/texture-gold-lines-1920.webp` `-1280.webp` `-640.webp` and `.avif` at each width |
| Source | `src/assets/images/_originals/texture-gold-lines.png` |

Prompt:

> Thin champagne gold foil lines applied in a sparse arc across cream paper, delicate hairline strokes catching the light with a metallic sheen, generous negative space, soft raking daylight, refined minimal luxury texture, fine art abstract, subtle grain, no people, no faces, no text, no lettering, no numbers, no symbols, no watermark, no logos

Alt text:

> Fine champagne gold foil hairlines curving in an arc across cream paper.

## Rendered file sizes

All 1920 renditions sit inside the 250KB WebP and 180KB AVIF caps. Measured at encode time:

| Slot | 1920 webp | 1920 avif | 1280 webp | 1280 avif | 640 webp | 640 avif |
|---|---|---|---|---|---|---|
| `good-weekend-course` | 231KB | 168KB | 153KB | 128KB | 40KB | 33KB |
| `good-weekend-terrace` | 168KB | 108KB | 97KB | 68KB | 40KB | 31KB |
| `her-future-desk` | 177KB | 129KB | 81KB | 61KB | 23KB | 17KB |
| `hero-backplate` | 99KB | 65KB | 37KB | 23KB | 12KB | 8KB |
| `retreat-coast` | 187KB | 142KB | 99KB | 78KB | 33KB | 27KB |
| `retreat-spa` | 158KB | 100KB | 80KB | 57KB | 30KB | 23KB |
| `rths-ribbon` | 120KB | 82KB | 54KB | 36KB | 20KB | 14KB |
| `rths-road` | 219KB | 146KB | 131KB | 114KB | 34KB | 28KB |
| `speaker-stage` | 59KB | 27KB | 32KB | 17KB | 13KB | 8KB |
| `texture-gold-lines` | 63KB | 38KB | 32KB | 20KB | 9KB | 6KB |
| `texture-paper` | 190KB | 126KB | 98KB | 69KB | 34KB | 26KB |
| `texture-teal-wash` | 229KB | 171KB | 158KB | 132KB | 36KB | 29KB |

Total delivered payload across all 72 files: 5.5MB. Largest single 1920 WebP is 230KB and largest 1920 AVIF is 171KB, both inside the caps.

## Note for the build owner

`src/assets/images/_originals/` holds 12 full resolution PNG sources totalling roughly 106MB.
That is deliberate, so the renditions can be regenerated at other widths without spending
credits again, but it is heavy for a Git working tree. Adding `src/assets/images/_originals/`
to `.gitignore`, or moving it to Git LFS, is worth considering. `.gitignore` sits outside this
agent's write scope so it was left untouched.
