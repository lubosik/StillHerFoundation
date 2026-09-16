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
