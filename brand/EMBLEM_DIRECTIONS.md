# Emblem directions

Three readings of Nani's pen sketch. All three are built from the same skeleton, so they
are genuinely the same mark in three characters rather than three different marks.

## The construction, shared by all three

Read off the sketch, and non negotiable in every version:

- A **ring**, with a thin gold sliver inside it.
- A large **S** in the upper centre. Top terminal at the upper right, a generous lower
  bowl that sweeps down and to the right, terminal at the lower left.
- Below and overlapping it, an **H and F that share strokes**. One horizontal serves as
  the H's crossbar on the left of centre and the F's top arm on the right. The H's right
  stem and the F's stem are the same vertical. The F keeps its own shorter mid arm. The
  H's left stem finishes in a curved foot that sweeps left.
- **One long vertical** running from above the S down through it and on through the HF
  ligature. That vertical through the S is what makes the mark read a little like a dollar
  sign. Nani liked that. It stays.

The bar runs longer on the H side than the F side. That asymmetry is deliberate: it is
the only way a single shared horizontal can give both letters honest proportions.

No text sits inside or around the ring on the main emblem. Ring lettering belongs to the
Good Weekend seal alone.

Every letter is explicit `<path>` geometry. No `<text>`, no font dependency, no traced
raster. The mark can be handed to an embroiderer or a die maker as is.

---

## Direction A, Linea

`brand/alternates/direction-a-linea.svg`

**Rationale.** The restrained reading. One uniform stroke weight throughout, no serifs,
no ball terminals, no flourish. The ring is a single fine circle with a gold hairline
inside it. All of the character comes from the proportions and from how much air is left
around the monogram.

**At small size.** The most robust of the three. Because every stroke is the same weight,
it fades evenly rather than breaking up, so it still reads as a considered mark at 24px.
The gold hairline disappears below roughly 40px, but nothing looks broken when it goes.

**On thread.** Straightforward. A uniform stroke is a uniform satin stitch. A digitiser
can work from this file without asking a single question. The curved foot on the H is the
only place needing care at small patch sizes.

**Why it is not the pick.** It is correct rather than beautiful. Set next to B it reads
closer to a tech startup than to a house with a name, and the brief asked for elegant,
feminine and romantic.

---

## Direction B, Fleur, CHOSEN

`brand/directions/direction-b-fleur.svg`

**Rationale.** The romantic reading, and the one that earns the Chanel comparison. The
strokes are modulated to Didone stress: hairline where the stroke runs horizontal, full
weight where it runs vertical. In the S that means thin over the top arc, thin across the
middle diagonal, thin under the bottom arc, and thick at the two bowl shoulders. Ball
terminals close the S at both ends. Hairline serifs cap the stems and the arms. Two fine
filigree vines sit low on either side, and a gold lozenge marks the ring at twelve and
six o'clock.

The thin middle of the S is doing structural work as well as aesthetic work. It is what
stops the S welding itself into a blob where it crosses the long vertical.

**At small size.** The high contrast is the cost of the elegance. The hairlines have a
floor built in so the mark holds to roughly 32px, and below that the mono and single
colour versions take over. The filigree vines are a large format treatment only: they are
present in this direction sheet, on the seal and on the share image, and are left off
`public/brand/emblem.svg` so the mark stays clean in the top bar.

**On thread.** Workable above roughly 60mm, where the hairlines are still two or three
stitches wide. Below that, hand the embroiderer `emblem-1c.svg` instead. The filigree
vines are never embroidered.

**Why it is the pick.** It is the only one of the three that is actually beautiful rather
than merely well made. The contrast reads as couture. The ball terminals and the curved
foot carry the feminine note Nani asked for, and the long vertical and the heavy bowl
shoulders keep it from going soft. It is elegant, feminine and romantic, and still strong.

---

## Direction C, Crest

`brand/alternates/direction-c-crest.svg`

**Rationale.** The heavy reading. A thick teal band forms the outer ring, a gold sliver
sits inside it, and a fine teal circle closes the frame. Gold lozenges break the band top
and bottom. The monogram is monoline but roughly twice the weight of direction A, so it
holds its own against the band.

**At small size.** The band survives further down than either of the others because it is
a solid shape rather than a line. The monogram inside crowds at 24px and below, since the
band eats the space the letters need.

**On thread.** The best of the three. Nothing in it is thinner than two millimetres at a
75mm patch, the band gives a digitiser a clean border to run a satin stitch along, and it
is the only version that would read from across a room on the back of a letterman jacket.
It is also the right starting point for a struck lapel pin, where the band becomes the
raised rim.

**Why it is not the pick.** Too heavy for a cream editorial page. It wants to be an
applique, not a logo.

---

## The decision

**Direction B is the working logo.** It is copied to `public/brand/emblem.svg` with the
filigree vines left off, which is the form used on the site, in both lockups, on the seal
and on the share image. The vines stay available for large format work.

A and C are kept in `brand/alternates/`. C is not a reject: it is the version that goes
to the embroiderer and the pin maker when the piece is small or the substrate is coarse,
alongside `public/brand/mono/emblem-1c.svg`.

`brand/directions/preview.html` shows all three at 16px, 64px and 512px, plus a jacket
patch mock on dark fabric.
