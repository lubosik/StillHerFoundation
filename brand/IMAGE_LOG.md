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

---

# Session two, 16 September 2026

Owner: `visual-v2`. Scope: `EDITS_SEP15.md` sections 2, 6 and 7. Four jobs: the new full bleed
hero of Nani, the Good Weekend golf redo, the Road to Her Smile Project redo, and the
restoration of her mother's modelling print.

## Generation summary

| Item | Value |
|---|---|
| Provider | Higgsfield MCP |
| Model | `nano_banana_2` at `resolution: 2k`, `aspect_ratio: 16:9`, served as `nano_banana_flash` |
| Native output | 2752 x 1536 PNG |
| Cost per image | 2 credits, confirmed against the balance |
| Images generated | 9 candidates across 3 slots |
| Images accepted | 3 |
| Upscale jobs | 1 at 2 credits, rejected on inspection |
| Credits spent | 20 |
| Opening balance | 155.04 |
| Closing balance | 135.04 |
| Budget cap | 90 credits, not exceeded |

### Model choice

The previous session established that `nano_banana_2` bills 2 credits per image at the 2k tier
against 11 for GPT Image 2. It held the art direction first time again, including the hero,
which was the one job authorised to spend more. It carried Nani's likeness from a single
reference image well enough that the expensive model was never needed, so the hero cost 8
credits for four candidates rather than 44.

### Likeness reference

`reference/nani-refs/nani-studio.jpeg` was uploaded through `media_upload` plus `media_confirm`
and passed to every hero request as an `image_references` media. Media id
`a72884f1-bd82-4137-9251-088d47dbd1fb`.

`nani-red-carpet-GETTY-WATERMARKED.jpeg` was used only on screen to check the likeness. It was
never uploaded, never sent to a model and is not on the site.

### Consent

Nani asked for images of herself and supplied her own reference photograph for the purpose. No
other identifiable person was generated. The Road to Her Smile Project candidates contain no
face at all.

## Slots

### hero-nani

New slot. This is the full bleed hero for the L'Echelon front page in section 2.

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 8, four candidates |
| Files | `src/assets/images/hero-nani-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/hero-nani.png` |

Prompt:

> Wide cinematic editorial campaign still, cream Mediterranean penthouse salon in Monaco. The woman from the reference image: long dark hair with a blunt fringe, strong dark brows, a full sleeve tattoo down her right arm, slim, dressed in a cream tailored suit with a soft silk camisole and a fine gold pendant necklace. She perches on the arm of a large cream sofa at the right of frame, one leg tucked, leaning her weight into the sofa arm, hand resting lightly on the cushion, shoulders relaxed, smiling broadly and warmly at camera, radiating success and good health. The left third of the frame is intentionally quiet and empty: a plain sunlit cream wall and pale stone floor, clean negative space with no objects. Behind her the room opens through an arch to a terrace with cypress trees and hazy blue sea, sand coloured stone, cream bouclé, brushed brass, one teal silk cushion for accent, huge soft window light from the left. Rich, warm, expensive, editorial. Medium format film, shallow depth of field, gentle grain. No text, no lettering, no signage, no watermark, no logos.

Alt text:

> Nani Rosen smiling, perched on a cream sofa in a sunlit Mediterranean villa salon.

Why this one. It is the only candidate that does all four of her asks at once: she is perched
half up and half leaning on the arm of the couch rather than sitting in it, the smile is broad
and warm, the room reads Monaco rather than spa, and the left third is a flat sunlit wall with
nothing in it. Her face lands at roughly 68 per cent across, so a cream scrim over the left
third covers none of her. Verified by compositing a scrim over the shipped 1920 WebP.

Likeness check at full resolution: blunt fringe, long dark hair, strong brows, the right arm
sleeve tattoo and the "R" pendant all carried from the reference. Both hands correct, five
digits each. No text anywhere in the frame.

The three rejected candidates are kept as JPEGs in `brand/alternates/hero-nani-ALT-a.jpg`,
`-b.jpg` and `-c.jpg`. Candidate a is strong but the bottom right of the room reads as a
bathtub. Candidate b seats her in an armchair rather than on its arm. Candidate c puts her in a
dress in a room that reads closer to a spa than to Monaco.

### good-weekend-course

Replaces the previous files of the same name, which read as a farm.

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/good-weekend-course-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/good-weekend-course.png`, overwritten |

Prompt:

> Luxury editorial photograph of a manicured championship golf course at soft dawn. In the near foreground a putting green with a hole cut into the turf and a flagstick standing in the hole, the flag hanging softly in still air. Immediately beside the green a deep bunker of freshly raked pale sand with clean parallel rake lines. In the mid foreground fairway turf with several fresh divots cut out of the grass and open divot holes clearly visible. Beyond that a wide fairway with crisp alternating light and dark mowing stripes running to the horizon. Low golden mist lying over the grass, long dawn shadows, cream and sand tones, warm soft light, cypress and olive trees along the far edge. Unmistakably a golf course, immaculate and expensive. Editorial campaign quality, medium format film, subtle grain. No people, no faces, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> A golf green with the flag in the hole, a raked bunker and divots at soft dawn.

Every note she gave is answered in frame: field, divot holes trailing across the fairway, a
hole with a flagstick standing in it, and a raked bunker so the sand is not blocked. Mowing
stripes and dawn mist keep it in the same editorial register as the rest of the site. The
rejected sibling is at `brand/alternates/good-weekend-course-ALT.jpg`. It has a stronger bunker
but a saturated blue flag and a foreground that reads as mud rather than divots.

### rths-project

New slot, already referenced by `src/config/site.ts`. Replaces the literal empty road.

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 6, three candidates, all genuinely different |
| Files | `src/assets/images/rths-project-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/rths-project.png` |

Prompt:

> Intimate editorial photograph, horizontal. Close view of an older woman's hands only, weathered, dignified, softly lined, resting open and cupped together in her lap on a cream linen skirt, one hand gently holding the other. Cropped at the mid forearm: no face, no head, no shoulders, no body above the forearms anywhere in the frame. Warm side light from a window falls across the hands, cream and sand tones, a simple thin gold ring, a muted teal thread in the linen weave. Soft shadow, generous negative space on one side. Tender, resilient, dignified. Medium format film, shallow depth of field, natural skin texture, fine grain, editorial campaign quality. No face, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> An older woman's hands resting folded and open in her lap on cream linen.

Why this one. The project is about a woman's dignity being given back, so the representation
that carries the most weight is the woman herself, present but not identified. Hands hold
restoration and dignity without going anywhere near teeth or dentistry, and without a face.
Inspected at full resolution: two hands, correct digit count, no extra fingers, no face
anywhere, no text.

The two alternates are deliberately different takes and are kept for the page owner:
`brand/alternates/rths-project-ALT-doorway.jpg` is an arched door half open onto warm morning
light falling across a stone floor, with a chair, a folded cloth and a teal bowl waiting in the
room beyond. `brand/alternates/rths-project-ALT-mirror.jpg` is an antique brass hand mirror
lying on cream linen and turned to the window, reflecting only light and sky.

### lia-modelling-restored

A restoration, not a generation. No new person was created and nothing about her was changed.

| Field | Value |
|---|---|
| Source | `reference/nani-refs/lia-modelling-print.jpg`, a phone snapshot of a physical print |
| Method | Python and Pillow only. The upscaler was tried and rejected |
| Credits | 2, spent on the rejected upscale |
| Master | `src/assets/images/lia-modelling-restored.jpg`, 810 x 1138 |
| Renditions | `src/assets/images/lia-modelling-restored-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Working files | `src/assets/images/_originals/lia-modelling-workingcrop.png` and `lia-modelling-restored.png` |

What was done:

1. Crop. The print sits at an angle in a stack next to a camera and an Ilford paper envelope.
   Its four corners were located, then a single perspective transform lifted the print out of
   the snapshot. The carpet, the camera, the envelope and every neighbouring print are gone.
   The right edge was pulled in by about 30 pixels of blank paper margin because a neighbouring
   photograph overlaps the print there. No part of her is lost.
2. Deskew. The print was tilted 13.5 degrees and also keystoned, so a plain rotation was not
   enough. The perspective transform in step 1 handled both. The result is rectangular and
   upright, and the recovered proportions land at almost exactly 4:5, which is what an 8 by 10
   print should measure. That is the check that the corner positions were right.
3. Tone. Converted to greyscale, which removes the yellowed cast in one move. A gentle flat
   field pass, applied at 60 per cent strength, evened out the phone's uneven lighting without
   flattening the print's own tonality. Levels were then stretched on the 0.4 and 99.6
   percentiles and a mild S curve restored contrast. The blacks in her hair and the near white
   of the studio backdrop both came back.
4. Upscale. **Rejected.** `upscale_image` with the bytedance backend returned a clean 2160 x
   3024 file, but a side by side of the face against the Pillow restoration showed it had
   redrawn her: eyelashes invented where the print has none, eyebrows resharpened and reshaped,
   the mouth re-rendered with hard edges, and synthesised skin texture. The instruction was
   "don't even change a thing on her", so the upscale was discarded and the Pillow restoration
   shipped alone. The rejected file was not saved into the repository.

Because the upscale was dropped, the true optical resolution of this photograph is 810 pixels
wide. The 1280 and 1920 renditions are honest Lanczos enlargements of that master, produced so
the `w` descriptors in `Picture.astro` describe the real pixel widths of the files. They carry
no detail beyond the master.

Alt text:

> Nani's mother in her modelling years, a restored black and white darkroom print.

## Rendered file sizes

Measured on disk after writing, not reported by the encoder. The 1920 WebP cap is 250KB and the
1920 AVIF cap is 180KB. All four slots are inside both.

| Slot | 1920 webp | 1920 avif | 1280 webp | 1280 avif | 640 webp | 640 avif |
|---|---|---|---|---|---|---|
| `hero-nani` | 105.9KB | 74.1KB | 55.7KB | 41.6KB | 19.0KB | 14.2KB |
| `good-weekend-course` | 245.2KB | 165.2KB | 123.9KB | 101.4KB | 31.2KB | 24.6KB |
| `rths-project` | 156.9KB | 100.3KB | 72.2KB | 51.1KB | 20.2KB | 15.3KB |
| `lia-modelling-restored` | 118.6KB | 54.4KB | 72.3KB | 37.2KB | 31.0KB | 19.5KB |

Every file was also verified to carry its labelled pixel width, and every `public/images/` copy
was byte compared against its `src/assets/images/` original.

## Notes for the page owner

1. The hero slot is named `hero-nani`. Nothing in the repository named it, so it was chosen to
   sit alongside the existing convention. `hero-backplate` was left untouched rather than
   overwritten, because it is still referenced by `src/pages/index.astro`.
2. `rths-road` is now orphaned by `src/config/site.ts`, which already points the initiative at
   `rths-project`, but `src/pages/index.astro` line 22 still uses `slot: 'rths-road'` for a
   slide. The old files were left in place so that reference does not break. Delete them once
   that slide is repointed.
3. `src/components/Picture.astro` hardcodes `width="1280" height="720"` on the `img`, which
   assumes every slot is 16:9. `lia-modelling-restored` is portrait at 4:5. The CSS
   `aspect-ratio` overrides the layout so nothing breaks visually, but the intrinsic ratio is
   wrong for that one slot and will cost a little layout stability. Components sit outside this
   agent's write scope, so it was left alone.
4. `src/assets/images/_originals/` grew by three more full resolution PNGs. The earlier note
   about `.gitignore` or Git LFS for that directory still stands.

---

# Session three, 16 September 2026

Owner: `visual-graves`. Scope: six section images for the Graves' disease resource page, so the
page is not a wall of text. Page copy, components and styles were written by another agent and
were not touched here.

## Graves resource page

### Generation summary

| Item | Value |
|---|---|
| Provider | Higgsfield MCP |
| Model | `nano_banana_2` at `resolution: 2k`, `aspect_ratio: 16:9`, served as `nano_banana_flash` |
| Native output | 2752 x 1536 PNG |
| Cost per image | 2 credits, confirmed against the balance |
| Images generated | 12, two candidates across six slots |
| Images accepted | 6 |
| Credits spent | 24 |
| Opening balance | 135.04 |
| Closing balance | 111.04 |
| Budget cap | 50 credits, not exceeded |

### Model choice

`nano_banana_2` again, on the evidence of the two previous sessions: 2 credits per image at the
2k tier against 11 for GPT Image 2. It held the art direction on the first pass for all six
slots, so the expensive model was never needed and is not mentioned again here.

### Art direction applied

Luxury editorial, soft natural light, cream, sand and warm neutrals. Teal carried as an accent
in fabric, glaze or ceramic only, never as a wash. Fine champagne gold detail where it earned a
place. Subtle film grain. Calm, dignified, adult.

Every prompt carried an explicit negative tail: no faces, no text, no lettering, no signage, no
watermark, no logos. Nothing clinical was prompted or accepted: no hospital, no scrubs, no
stethoscope, no lab coat, no syringe, no pill bottle, no anatomical diagram, no thyroid
illustration, no corporate healthcare blue. Nothing in the wellness influencer register either:
no crystals, no meditation poses, no candles, no soft focus spirituality.

### Compliance check

No identifiable face appears in any accepted image. `graves-living` is a full backlit silhouette
with no rendered features. `graves-body` was cropped after generation to remove the underside of
the jaw so the frame starts at the throat. `graves-support` shows hands and forearms only.
The other three contain no people at all.

Every accepted frame was inspected at full resolution and then crop zoomed into the regions most
likely to carry a defect: the nightstand book in `graves-symptoms`, the sheet of paper in
`graves-diagnosis`, the wall switch and stone floor in `graves-hero`, the window surround and
the glazed pot in `graves-living`, and the finger and nail count in `graves-body` and
`graves-support`. No text, no malformed hands and no accidental faces were found in any accepted
frame. Both discarded siblings per slot were rejected on composition or palette rather than on a
defect, so no extra credits were spent on regeneration.

### Slots

#### 1. graves-hero

Sits behind the page title.

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-hero-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-hero.png` |

Prompt:

> Wide quiet interior editorial photograph. Early morning sunlight falling in a soft diagonal across a cream limewash wall, a low linen armchair in sand coloured fabric set against it, a single small teal ceramic vessel resting on a pale wood side table. Warm neutral palette, cream, sand, oatmeal. Pale stone floor. Generous negative space, calm and contemplative, the feeling of a room just before a conversation. Nobody in frame. Luxury editorial interiors photography, medium format film, soft natural light, subtle film grain. No people, no faces, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> Morning light falling across a cream plaster wall above a linen armchair and a small teal vase.

Chosen because the upper two thirds of the frame is a flat sunlit wall, which gives the page
title a clean field to sit on. The rejected sibling put a framed picture, a wall shelf and a
large draped teal throw into the frame, all of which compete with type.

#### 2. graves-body

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-body-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-body.png`, 2375 x 1336, cropped from the raw generation |

Prompt:

> Abstract intimate editorial close up. The hollow of a woman's throat and the line of her collarbone in soft raking window light, warm shadow gathering in the hollow, a fine champagne gold chain resting on the skin, cream linen shirt collar open at the edge of frame. Cropped hard below the chin so no mouth, no face and no head are visible at all. Dignified and editorial, restrained, not sensual. Warm neutral palette, cream and sand. Medium format film, shallow depth of field, natural skin texture, subtle grain. No face, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> The hollow of a throat and collarbone in soft light, a fine gold chain over an open linen shirt.

The raw generation left the underside of the jaw in the top of the frame. No features were
visible and it was not identifiable, but the brief asked for no face, so the frame was cropped
to `2375x1336+188+200` before encoding, which removes the jaw entirely and lands at an exact
16:9. The cropped file is what is stored in `_originals`, so the renditions are reproducible
from it. The 1920 rendition is a downscale of a 2375 pixel wide master, so no upscaling is
involved.

This is the slot that had to suggest the body without a single medical cue. The throat is the
part of the body the condition acts on, and reading it as a fine jewellery frame rather than an
anatomy plate is the whole point. The rejected sibling was light through a cupped hand, which is
clean and anatomically correct but reads as generic charity stock and has a cool grey background
that sits outside the palette.

#### 3. graves-symptoms

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-symptoms-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-symptoms.png` |

Prompt:

> An empty unmade bed in late afternoon light, rumpled cream linen sheets and a soft crumpled pillow, one teal linen edge showing at the foot of the bed. Wooden shutters half closed at the window casting long warm bars of light across the bedding and the pale plaster wall. Warm sand and ivory palette, quiet and heavy with rest, tasteful and calm rather than sad. Completely empty, nobody in frame. Luxury editorial interiors photography, medium format film, soft natural light, subtle film grain. No people, no faces, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> An empty unmade bed in cream linen, lit in warm bars through half closed shutters.

The book on the nightstand was crop zoomed and is blank. Chosen over a wider sibling that reads
as a furniture catalogue and drops a pair of slippers on the floor. This one is tighter, warmer
and the shutter light does the work.

#### 4. graves-diagnosis

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-diagnosis-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-diagnosis.png` |

Prompt:

> Calm editorial still life, horizontal. A worn cream linen cloth over a plain table, a tumbler of water half full, a folded blank sheet of cream paper, a simple black pen laid across the corner of the table, warm morning light raking in from a window at the left and casting long soft shadows. Warm neutral palette, sand, ivory, pale oak, a single teal ceramic saucer as the only colour accent. Still, composed, serious. Nobody in frame. Editorial still life photography, medium format film, subtle grain. The paper is entirely blank with nothing printed or written on it. No people, no faces, no text, no lettering, no writing, no signage, no watermark, no logos.

Alt text:

> A glass of water, a blank folded sheet of paper and a pen on a linen covered table.

The sheet of paper was crop zoomed at full resolution and is completely blank, which is the
whole risk on this slot. The pen carries no branding. The teal glazed saucer is the accent.
Chosen over a sibling on a pale oak desk whose only teal was a bottle far back and out of focus,
so the palette read thinner.

#### 5. graves-living

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-living-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-living.png` |

Prompt:

> Editorial photograph, a woman in full silhouette against a tall arched window filled with warm Mediterranean morning light. She stands in profile looking out, dark simple silhouette with no facial features visible at all, hair gathered loosely, a soft linen dress catching the light at its edge. Dust in the air, cream plaster walls either side, warm sand toned stone floor, a teal glazed pot on the sill. Calm, composed, unhurried, quietly strong. Backlit so her features are entirely lost in shadow. Medium format film, subtle grain, luxury editorial campaign quality. No visible face, no facial features, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> A woman in silhouette at an arched window, looking out over warm Mediterranean rooftops.

She stands upright with her chin level, which is what carries strength rather than sadness. The
silhouette is pure outline, crop zoomed to confirm no eye, mouth or feature is rendered.

The rejected sibling was a woman from behind at open balcony doors over the Amalfi coast. It is
a good photograph and has no face at all, but two large expanses of cyan sea and cool grey white
walls push it outside the cream and sand palette, and teal stops being an accent when it fills a
third of the frame. This frame keeps teal to a single glazed pot on the sill.

#### 6. graves-support

| Field | Value |
|---|---|
| Model | `nano_banana_2` 2k, 16:9 |
| Credits | 4, two candidates |
| Files | `src/assets/images/graves-support-{1920,1280,640}.{webp,avif}`, copied to `public/images/` |
| Source | `src/assets/images/_originals/graves-support.png` |

Prompt:

> Close editorial photograph across a table of cream linen. Two people's hands meeting near the centre of the frame, one hand resting protectively over the back of another hand, fingers softly curled, a plain cup of tea to one side out of focus. Cropped above the wrists so nothing above the wrists appears, no arms, no bodies, no heads, no faces. Warm afternoon window light, cream, sand and oatmeal tones with one small teal ceramic accent. Quiet solidarity, dignified and calm. Medium format film, shallow depth of field, natural skin texture, subtle grain. Correct human hands, five fingers on each hand. No faces, no heads, no text, no lettering, no signage, no watermark, no logos.

Alt text:

> One hand resting over another on a cream linen tablecloth, cropped above the wrists.

Two hands, four fingers and a thumb on each, verified by crop zoom at full resolution. The
rejected sibling resolved as four hands in an overlapping cluster where the digit count could
not be read cleanly, which is exactly the defect this check exists to catch.

### Rendered file sizes

Measured on disk with `stat -f%z` after writing, not reported by the encoder. The 1920 WebP cap
is 250KB and the 1920 AVIF cap is 180KB. All six slots are inside both caps under either reading
of KB, decimal or binary. Quality was selected per file by a descending ladder that stops at the
first setting under the cap.

| Slot | 1920 webp | 1920 avif | 1280 webp | 1280 avif | 640 webp | 640 avif |
|---|---|---|---|---|---|---|
| `graves-hero` | 177,112 B | 44,972 B | 49,912 B | 19,969 B | 15,804 B | 7,021 B |
| `graves-body` | 244,828 B | 173,948 B | 119,968 B | 76,439 B | 34,168 B | 16,055 B |
| `graves-symptoms` | 209,816 B | 165,932 B | 138,148 B | 91,336 B | 58,730 B | 34,604 B |
| `graves-diagnosis` | 243,330 B | 91,241 B | 104,066 B | 49,004 B | 35,992 B | 19,208 B |
| `graves-living` | 206,168 B | 129,619 B | 119,292 B | 61,093 B | 36,158 B | 19,266 B |
| `graves-support` | 249,624 B | 142,528 B | 129,578 B | 60,538 B | 37,088 B | 19,872 B |

Largest 1920 WebP is `graves-support` at 249,624 bytes, which is 243.8 KiB. Largest 1920 AVIF is
`graves-body` at 173,948 bytes, which is 169.9 KiB. Total delivered payload across the 36 files
is 3.0MB.

Every file was confirmed to carry its labelled pixel width, and all 36 `public/images/` copies
were byte compared against their `src/assets/images/` originals with `cmp`. All 36 match.

Pixel dimensions: five slots render at 1920 x 1072, 1280 x 714 and 640 x 357, because the model
outputs 2752 x 1536, which is 1.792 rather than a true 1.778. `graves-body` renders at an exact
1920 x 1080, 1280 x 720 and 640 x 360 because its post generation crop was chosen to land on
16:9. `src/components/Picture.astro` hardcodes `width="1280" height="720"`, which is very close
to the five and exact for the sixth, so no layout instability is introduced by these slots.

### Notes for the page owner

1. Slot names are `graves-hero`, `graves-body`, `graves-symptoms`, `graves-diagnosis`,
   `graves-living` and `graves-support`. Nothing in the repository named them, so they follow
   the existing `<topic>-<subject>` convention.
2. `src/assets/images/_originals/` grew by six more full resolution PNGs, about 51MB. The note
   from the first session has since been acted on: that directory is now listed in `.gitignore`,
   so these PNGs stay local and out of the tree. Nothing further is needed.
   The 36 delivered renditions in `src/assets/images/` and `public/images/` were picked up and
   committed by the page owner in `f734000`, so this agent committed nothing itself. Only this
   log file is left modified.
3. The machine was down to 104MB of free disk during this run, which is why candidate PNGs were
   converted to inspection JPEGs and deleted rather than held. Worth clearing before the next
   image session, because a full batch of twelve 2k PNGs is about 110MB on its own.

## Hero reshoot, 16 September

The first hero did not hold Nani's likeness. Side by side against her own
reference the generated face was rounder, the cheeks fuller, the nose
different, and the fringe blunter and sitting higher. The client flagged it.

**Root cause.** The first pass described her appearance in the prompt while
also passing a reference. The Higgsfield Soul guidance is explicit that this
is the wrong move: the reference already carries identity, and re-describing
it creates conflict and drift. The first pass also used `nano_banana_2`,
which is the fast model, rather than the photorealism one.

**What changed.**
- Model: `nano_banana_pro` at 2k, the model the Soul guidance names for
  maximum photorealistic sharpness.
- Two references instead of none conditioning the face: a 4x upscaled head
  and shoulders crop from her own studio photograph, plus the full studio
  photograph for build and tattoo placement.
- The prompt stopped describing her features and instead instructed the model
  to match the reference exactly, then spent its words on scene, wardrobe,
  pose and light. Identity comes from the reference, everything else from the
  prompt.
- Added an explicit photorealism instruction: visible pores, natural skin
  texture, no smoothing, no beautification.

**Licensing note.** Two reference photographs were supplied. Only the clean
studio photograph was sent to the model. The second is a watermarked Getty
press image, and the watermark is a copyright signal on the photograph, so it
was used on screen for likeness checking only and never uploaded.

| | |
|---|---|
| Slot | `hero-nani` |
| Model | `nano_banana_pro`, 2k, 16:9 |
| Candidates | 4, one accepted |
| Credits | 8 spent, balance 109.04 to 101.04 |
| Master | `src/assets/images/_originals/hero-nani-v2.png`, 2752x1536 |
| Renditions | WebP and AVIF at 1920, 1280, 640. Largest 1920 WebP 149KB, AVIF 74KB |

Alt text: Nani Rosen seated on the arm of a cream sofa in a sunlit
Mediterranean room, smiling toward the camera.

**Checks run.** Face compared side by side against the reference at 2.4x.
Both hands inspected at full resolution, five digits each, natural anatomy.
No text, lettering or watermark in frame. The tattoo carries AI garbled
letterforms at full resolution, illegible at display size, noted rather than
hidden. Left third of the frame verified clear flat wall so the headline has
a clean field.
