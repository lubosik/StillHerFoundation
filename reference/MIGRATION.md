# MIGRATION.md
## Content inventory: "Road to Her Smile" / StillHer Foundation

**Purpose:** raw material for the Astro rebuild. Every line of copy below is transcribed verbatim from either the live Vercel site or the local repo. Nothing here is invented. Where the live site and the local repo disagree, both versions are shown and the difference is flagged.

**Sources**
1. Live site: `https://stillher-landing.vercel.app/` (fetched 15 Sep 2026, all pages returned HTTP 200 except where noted)
2. Local repo: `/Users/ghost/Downloads/stillher-landing/`

**Read-only note:** no existing repo file was modified. This file is the only thing written.

---

## 0. CRITICAL FINDINGS (read first)

1. **The live site and the local repo are two different generations of the project.** The local `index.html` and `press.html` are an OLDER draft. They are not what is deployed.

2. **The subject's name changed.** Local repo says **"Leah Spriggs"** throughout. The live site says **"Lia Spriggs"** throughout. **Lia is the current and correct spelling.** Do not migrate "Leah".

3. **The church was de-named.** Local repo names **"Grace Covenant Church"** and repeatedly says "a church". The live site has scrubbed this to **"a trusted community"** / "that same organization" / "a community stayed silent". This looks like a deliberate legal or editorial softening. **Preserve the live wording. Do not reintroduce the church name.**
   - Note: the live site still names **"a doctor at Johns Hopkins"** on `/the-tradegy.html`. That institution name has NOT been scrubbed. Flag for a legal check before reuse.

4. **The spelling error "Tradegy".** The live site spells it "Tradegy" in the page filename (`the-tradegy.html`), the nav label, the page `<title>`, the H1, and every footer link. The correct spelling is **"Tragedy"**. The new site fixes this; the old path must still redirect.

5. **Every image in `/images/` that shows a person is AI-generated, not a photo of Lia.** Confirmed by `generate-images.js` in the repo root, which generates `hero.png`, `portrait.png`, `hands.png` and `leah-young.png` via `google/gemini-2.5-flash-image`. The prompt for `leah-young.png` literally reads "Artistic recreation of a 1980s Italian photograph." **The woman shown is not Lia Spriggs.** See section 6.

6. **The only likely real photograph is `images/lia-italy.jpg`, which exists ONLY on the live site and is NOT in the local repo.** It is a 2.5MB JPG (all the AI assets are 1024x1024 PNGs), it is not listed in `generate-images.js`, and its alt text is "Lia Spriggs in her modeling years". It must be downloaded from the live site and preserved. See section 6.

7. **`generate-images.js` contains a hardcoded OpenRouter API key in plaintext** at line 7. It is committed to git. Flag for rotation. Do not carry this file into the new repo.

---

## 1. PAGE INVENTORY

### Live site (https://stillher-landing.vercel.app)

| Path | Status | Title | One-line description |
|---|---|---|---|
| `/` and `/index.html` | 200 (identical, 43,344 bytes) | Road to Her Smile \| StillHer Foundation Documentary | RTHS landing page: cinematic hero, five full-bleed navigation panels to the subpages, "Why This Documentary Matters" summary, three pillars, donate band, sponsors block, mailing list modal |
| `/the-tradegy.html` | 200 | The Tradegy \| Road to Her Smile \| StillHer Foundation | The full account of what happened to Lia: her life before, the extraction, the $25 gift card, the medical reality. Misspelled filename and label. |
| `/her-road.html` | 200 | Her Road \| Road to Her Smile \| StillHer Foundation | The six-chapter medical journey ahead: Texas surgical team, assessment, best case, worst case, healing, outcome |
| `/who-is-lia.html` | 200 | Who is Lia? \| Road to Her Smile \| StillHer Foundation | Four-part portrait of Lia as a person: Verona, the model, the mother, the pillar of community |
| `/mission.html` | 200 | Our Mission for This Project \| StillHer Foundation | Foundation mission statement, why the documentary matters, the three pillars, donate band |
| `/film.html` | 200 | Film Sponsorship + Support Opportunities \| Road to Her Smile \| StillHer Foundation | Three ways to support, in-kind needs list, sponsorship tier modal (Bronze to Diamond), in-kind modal |
| `/press.html` | 200 | Press \| Road to Her Smile \| StillHer Foundation | Press angles, donation QR code, film fact sheet, four press asset download cards, Lia bio, press contact, accolades |
| `/tragedy.html` | **404** | n/a | Correctly-spelled path does not exist live |
| `/sponsors.html` | **404** | n/a | No standalone sponsors page; sponsors are a repeated block |
| `/donate.html` | **404** | n/a | Donations go to the external Railway app |

### Local repo (/Users/ghost/Downloads/stillher-landing/)

| File | Size | Description |
|---|---|---|
| `index.html` | 49,341 bytes / 861 lines | **Older draft.** Uses "Leah". Single-page scroll: hero with film-stills strip, Her Story, six-chapter dark timeline ("A Life Dismantled"), three pillars, foundation about, email capture band, final CTA, footer with social icons |
| `press.html` | 12,776 bytes / 201 lines | **Older draft.** Uses "Leah" and "a church". No press-angles section, no QR, no sponsors block |
| `api/subscribe.js` | 982 bytes | Vercel serverless email capture endpoint (see section 7) |
| `generate-images.js` | 4,490 bytes | AI image generation script. Contains a plaintext API key. |
| `research.js` | 6,699 bytes | Playwright-style reference-site screenshot scraper |
| `research/RESEARCH.md` + 21 PNGs | ~5.8MB | Design research: screenshots of Vogue, Rolex, Hilton, UN sites |
| `images/` | 13 files, ~15.6MB | See section 6 |
| `reference/Nani Still her foundation Meetings.docx` | 62,003 bytes | Meeting notes. Not parsed for this inventory. |
| `reference/screenshots/logo-sketch-primary.png` | 2,015,998 bytes | Logo sketch |
| `reference/screenshots/voices-united.webp` | 11,092 bytes | Reference screenshot |

**Pages present live but ABSENT from the local repo:** `the-tradegy.html`, `her-road.html`, `who-is-lia.html`, `mission.html`, `film.html`. The live `index.html` and `press.html` are also newer than the local copies. **All live subpage copy below was recovered from the deployed HTML, not from the repo.**

---

## 2. FULL COPY EXTRACTION

All copy in sections 2.1 to 2.7 is transcribed verbatim from the **live** site. Section 2.8 holds the local-repo-only copy worth keeping.

---

### 2.1 LIVE HOME `/` (becomes `/road-to-her-smile`)

**Page title:** `Road to Her Smile | StillHer Foundation Documentary`

**Meta description:** "Road to Her Smile is a cinematic documentary about Lia Spriggs. An Italian immigrant failed by a husband, a doctor, and a trusted community. A StillHer Foundation film."

**Open Graph / Twitter description:** "An Italian immigrant. A broken promise. A doctor who disappeared. A community that stayed silent. This is Road to Her Smile."

**OG image:** `https://stillher-landing.vercel.app/images/still-johns-hopkins.png` (1200x800 declared)
**OG image alt:** "Road to Her Smile - StillHer Foundation Documentary"
**OG type:** `video.movie` | **OG site_name:** `StillHer Foundation`

#### Nav (desktop)
The Tradegy · Her Road · Our Mission · Film Sponsorship · Who is Lia? · Donate Now

#### Nav (mobile drawer)
The Tradegy · Her Road · Who is Lia? · Our Mission · Film Sponsorship · Press · Donate Now

#### Hero
> **Kicker:** A StillHer Foundation Documentary
>
> **Title:** Road to
> Her Smile
>
> **Synopsis:** She was left to fight for her life.
> And still, she remained standing.
>
> **CTAs:** Film Sponsorship | Read Her Story

#### Panel 1
> **Kicker:** Road to Her Smile
> **Heading:** The
> Tradegy
> **Body:** What was done to Lia Spriggs.
> Thirteen teeth. One doctor. No answers.
> **CTA:** Read the Full Story

#### Panel 2
> **Kicker:** Road to Her Smile
> **Heading:** Her
> Road
> **Body:** The road ahead to restoration.
> Every step matters.
> **CTA:** Follow Her Road

#### Panel 3
> **Kicker:** StillHer Foundation
> **Heading:** Our
> Mission
> **Body:** Restoring dignity to women abandoned
> by the systems meant to protect them.
> **CTA:** Our Mission

#### Panel 4
> **Kicker:** Road to Her Smile
> **Heading:** Who is
> Lia?
> **Body:** Getting to know the woman
> at the heart of this story.
> **CTA:** Meet Lia

#### "Why This Documentary Matters"
> **Label:** Why This Documentary Matters
>
> **Heading:** This is not just one woman's story.
>
> Lia Spriggs was a model in Verona, Italy, a woman whose natural presence and elegance carried her through the fashion world of northern Italy before she followed a man she loved to America, where over twelve years of marriage she discovered a betrayal so sustained that it left her a single immigrant mother with no safety net in a country that was not her own.
>
> A trusted community referred her to a doctor who extracted thirteen of her teeth in a single procedure and then vanished without explanation, leaving behind no implants, no follow-up, and no answers, while her body developed Hashimoto's disease and fibromyalgia in the years that followed.
>
> This documentary names what happened to Lia Spriggs, demands accountability from the systems and individuals that failed her, and begins the long road to restoring the dignity and the smile that were taken from her.
>
> **CTA:** Read the Full Story

#### Three pillars (home version, shorter than the mission.html version)
> **Dignity**
> When systems strip a woman of her ability to eat, to speak, to smile, they strip her identity. This documentary names that.
>
> **Accountability**
> A doctor disappeared. A community stayed silent. This film documents what happened and demands the accountability every vulnerable person deserves.
>
> **Restoration**
> Road to Her Smile is Lia's road back. With your support, she will not have to walk it alone.

#### Support band
> **Label:** Support the Documentary
> **Heading:** Help us tell
> this story.
> **Body:** Every contribution funds production, legal advocacy, and Lia's medical restoration. This is how we make sure her voice is finally heard.
> **CTA:** Donate to Road to Her Smile

#### Mailing list modal
> **Heading:** Join Our Mailing List
> **Body:** Be the first to know when Road to Her Smile premieres.
> **Button:** Join
> **Success state:** You're on the list. Thank you.

#### Footer
> A nonprofit dedicated to restoring dignity to women who have been abandoned by the systems meant to protect them.
>
> **Navigate:** The Tradegy · Her Road · Our Mission · Film Sponsorship · Who is Lia? · Press
> **Follow:** (social icons present, all `href="#"`)
>
> 2026 StillHer Foundation.
> All rights reserved.

---

### 2.2 LIVE `/the-tradegy.html` (becomes `/road-to-her-smile/the-tragedy`)

**Page title:** `The Tradegy | Road to Her Smile | StillHer Foundation` *(note the misspelling)*
**Meta description:** "What happened to Lia Spriggs. The full story of medical abandonment, institutional betrayal, and the road to restoration."

> **Kicker:** Road to Her Smile
> **H1:** The Tradegy *(fix to "The Tragedy")*

#### Section: Before
> **Label:** Before
> **Heading:** She Was Not Always Invisible
>
> Lia Spriggs was born in Verona, Italy, into a life that carried the kind of natural, unhurried elegance that luxury brands spend millions trying to manufacture, and she moved through the fashion world of northern Italy as someone whose presence alone could hold a room still, a woman with a future that looked genuinely expansive and entirely her own.
>
> On a military post in Vicenza, she met a man in uniform who promised her love, a life in America, and the kind of partnership she had every reason to believe was real, and she left behind everything she had ever known to follow him across the ocean into what she trusted would be a shared future.
>
> Over the course of twelve years of marriage, Lia discovered that her husband had been unfaithful for nearly all of them, a sustained betrayal that left her isolated as a single immigrant mother raising two children in a country that was not her own, with no family within reach and no safety net of any kind beneath her.

**Image captions on this page:**
> Lia Spriggs, Verona, Italy
> The chair. No follow-up. No answers.

#### Section: The Betrayal
> **Label:** The Betrayal
> **Heading:** Thirteen Teeth. One Doctor. No Answers.
>
> When an eviction notice brought Lia to her knees in front of her children, she found a trusted community that offered what felt like solid ground, and through that community she was referred to a doctor at Johns Hopkins who she believed would restore what years of hardship had already begun to erode.
>
> That doctor extracted thirteen of her teeth in a single procedure, and then he vanished without explanation, leaving behind no implants, no replacement teeth, no follow-up appointment, and no way for Lia to reach him, abandoning her toothless and without recourse in a situation she had no power to reverse on her own.
>
> When Lia returned to that same community and asked for help, they gave her a twenty-five dollar grocery gift card, and just days later, from that same organization, came the announcement of a seven point two million dollar renovation project, a contrast so enormous and so quiet that it became the central image this documentary exists to hold up to the light.
>
> **Pull quote:** She was not asking for luxury. She was asking for her dignity.

#### Section: The Medical Reality
> **Label:** The Medical Reality
> **Heading:** This Is Not a Production Choice. This Is a Medical Fact.
>
> In the years following the extraction, Lia's body developed both Hashimoto's disease and fibromyalgia, and she now lives every day with an ill-fitting denture that causes constant pain, while the bone loss in her jaw continues to progress at a rate that means the window for surgical intervention is actively closing with each month that passes.
>
> Without intervention, the bone deterioration will advance to the point where dental implants are no longer a viable option at all, and what is at stake is not a cosmetic concern but a woman's fundamental ability to eat solid food, to speak clearly without discomfort, and to smile without the sharp, grinding pain that has defined her daily reality for nearly two decades.

#### Stat block
| Figure | Label |
|---|---|
| **13** | Teeth removed in a single procedure |
| **0** | Follow-up calls received afterward |
| **$25** | What she was given when she asked for help |

**CTAs:** Support Lia's Restoration | Read Her Full Road

---

### 2.3 LIVE `/her-road.html` (becomes `/road-to-her-smile/her-road`)

**Page title:** `Her Road | Road to Her Smile | StillHer Foundation`
**Meta description:** "The story of Lia Spriggs - from Verona to America, from betrayal to resilience. A StillHer Foundation documentary."

> **Kicker:** Road to Her Smile
> **H1:** Her Road
> **Subhead:** The medical journey ahead. What Lia faces on the road to getting her smile back.
> **Section label:** The Road Ahead

#### Chapter One: The Journey to Texas
> Lia's surgical team is based in Texas, which means that every stage of her restoration requires travel from her home, a journey that is both physically demanding and financially significant for a woman living with the chronic fatigue and pain of Hashimoto's disease and fibromyalgia, conditions that turn even ordinary travel into an act of endurance.

#### Chapter Two: The Initial Assessment
> The first step is a comprehensive oral examination to assess the full extent of bone loss in Lia's jaw and to determine whether active infection is present, a real and serious possibility given the nearly two decades of inadequate dental care and the compromised immune system that comes with her autoimmune conditions.

#### Chapter Three: Best Case - Immediate Implants
> In the best possible outcome, the assessment reveals no active infection and sufficient bone density remaining in Lia's jaw to proceed directly to implant placement, allowing her to begin the restoration process in a single surgical visit and finally start the path toward being able to eat solid food and smile without pain.

#### Chapter Four: Worst Case - Infection and Bone Grafting
> If the surgical team discovers active infection when they open Lia's jaw, they will have no choice but to close the surgical site, send her home to recover on antibiotics, and schedule a return trip to Texas for bone grafting, a separate procedure that involves rebuilding the deteriorated bone structure in her jaw and then waiting months for the graft to heal before implants can even be considered.

#### Chapter Five: The Healing Process
> Even in the best-case scenario, the healing process following implant surgery is measured in months rather than weeks, and for a patient with Hashimoto's disease and fibromyalgia, the autoimmune complications could extend that timeline significantly, meaning any illness, infection, or flare-up during recovery could set the entire process back and require additional rounds of treatment.

#### Chapter Six: The Road to Her Smile
> This is the road. It is not simple, it is not guaranteed, and it is not short, but at the end of it, Lia Spriggs will be able to eat solid food without pain, speak clearly without the grinding discomfort of an ill-fitting denture, and smile without shame for the first time in nearly two decades, and every contribution to this project brings that moment closer to reality.

---

### 2.4 LIVE `/who-is-lia.html` (becomes `/road-to-her-smile/who-is-lia`)

**Page title:** `Who is Lia? | Road to Her Smile | StillHer Foundation`
**Meta description:** "Getting to know Lia Spriggs - the woman at the heart of the Road to Her Smile documentary."

> **Kicker:** Road to Her Smile
> **H1:** Who is Lia?
> **Subhead:** Getting to know the woman at the heart of this story.

#### Born in Verona
> **Heading:** A World of Sun-Warmed Stone
>
> Lia Spriggs was born in Verona, Italy, into a world of sun-warmed stone, ancient bridges, and a culture that valued beauty not as a commodity but as a way of life. She grew up surrounded by the kind of effortless Italian elegance that the fashion industry spends billions trying to replicate, and from a young age it was clear that she carried something rare - a presence that could hold a room still, a quiet confidence that had nothing to do with performance and everything to do with who she naturally was.

#### The Model
> **Heading:** Presence Was the Only Currency That Mattered
>
> She moved through the fashion world of northern Italy as someone who belonged there without trying. She modelled. She stood in front of cameras and in rooms where presence was the only currency that mattered, and she did it with the kind of grace that made other people believe that the future was genuinely expansive, that doors would keep opening, that the world she had been born into would continue to hold her.

#### Pull quote
> "She carried something rare - a quiet confidence that had nothing to do with performance and everything to do with who she naturally was."

#### A Mother
> **Heading:** She Built a Life from Nothing
>
> When she crossed the ocean and arrived in America, she carried with her every ounce of that strength and poured it into raising two children in a country that was not her own, without family nearby, without the safety net she had left behind in Italy. She built a life from nothing, held her family together through betrayal and heartbreak, and never once stopped being the pillar her children needed her to be.

#### A Pillar of Community
> **Heading:** She Is Still Standing. She Is Still Her.
>
> Even after everything that was taken from her - her marriage, her teeth, her health, her trust - Lia remained a presence in her community, someone people turned to, someone who showed up for others even when the systems meant to show up for her had failed completely. She is still standing. She is still her.

**CTAs:** Support Lia's Restoration | Read What Happened

---

### 2.5 LIVE `/mission.html` (becomes `/about`)

**Page title:** `Our Mission for This Project | StillHer Foundation`
**Meta description:** "StillHer Foundation exists to restore dignity to women abandoned by the systems meant to protect them."

> **Kicker:** StillHer Foundation
> **H1:** Our Mission for This Project
> **Subhead:** Restoring dignity to women abandoned by the systems meant to protect them.

#### Our Mission
> "StillHer Foundation exists to restore dignity to women abandoned by the systems meant to protect them."
>
> We document the stories the world was never supposed to hear. We build the communities that make sure they are heard anyway. Road to Her Smile is our first documentary, and Lia's story is only the beginning.
>
> **CTA:** Support the Foundation

#### Why This Documentary Matters
> **Heading:** Because this is not just one woman's story.
> **Subhead:** It is the story of every woman abandoned by the systems meant to protect her.

#### Three pillars (long version, use this one)
> **Dignity**
> This is about more than teeth. When systems strip a woman of her ability to eat, to speak, to smile, they strip her identity. This documentary names that.
>
> **Accountability**
> A doctor disappeared. A community stayed silent. This film documents what happened and demands the accountability that every vulnerable person deserves.
>
> **Restoration**
> Road to Her Smile is Lia's road back. And with your support, she will not have to walk it alone. Every gift brings her closer to her smile.

#### Support band
> **Label:** Support the Documentary
> **Heading:** Help us tell this story.
> **Body:** Every contribution funds production, legal advocacy, and distribution. This is how we make sure Lia's voice is finally heard.
> **CTA:** Donate to Road to Her Smile

---

### 2.6 LIVE `/film.html` (becomes `/road-to-her-smile#partnerships`)

**Page title:** `Film Sponsorship + Support Opportunities | Road to Her Smile | StillHer Foundation`
**Meta description:** "Film sponsorship and support opportunities for Road to Her Smile, a StillHer Foundation documentary."

> **Kicker:** Road to Her Smile
> **H1:** Film Sponsorship +
> Support Opportunities
> **Subhead:** How You Can Be Part of This

#### Three Ways to Support the Film
> **1. View the Sponsorship Deck**
> Our five-page investor pitch deck covers the vision, the team, the budget, and how your contribution will be used.
> *Button:* View Deck
>
> **2. View the In-Kind List**
> See what the production needs beyond financial support: locations, equipment, wardrobe, catering, and professional services.
> *Button:* View List
>
> **3. Support Directly**
> Every contribution funds production, post-production, legal advocacy, and distribution. Every dollar brings Lia closer to her smile.
> *Button:* Donate Now

#### In-Kind Support
> **Heading:** What the Production Needs
>
> Beyond financial contributions, the production benefits from in-kind support across several categories. If you can contribute any of the following, please reach out.

| Item | Status |
|---|---|
| Shooting Locations | Needed |
| Location (Pollyanna) | **Secured** |
| Catering / Craft Services | Needed |
| Hair, Makeup + Wardrobe | Needed |
| Camera + Lighting Equipment | Needed |
| Sound Recording Equipment | Needed |
| Post-Production Suite Access | Needed |
| Legal Counsel (Pro Bono) | Needed |

#### Support band
> **Label:** Support the Documentary
> **Heading:** Every contribution brings Lia closer to her smile.
> **Body:** Your support funds production, legal advocacy, and distribution. This is how we make sure her voice is finally heard.
> **CTA:** Donate to Road to Her Smile

#### Sponsorship tier modal
> **Modal label:** Sponsorship Tiers
> **Modal title:** Road to Her Smile - Sponsorship Bracket Structure

| Tier | Amount | Benefits |
|---|---|---|
| **Bronze** | $25,000 - $49,999 | Logo on credits, certificate of recognition |
| **Silver** | $50,000 - $149,999 | All Bronze benefits + premiere screening invitation |
| **Gold** | $150,000 - $249,999 | All Silver benefits + featured sponsor credit |
| **Platinum** | $250,000 - $499,999 | All Gold benefits + executive producer credit |
| **Diamond** | $500,000+ | All Platinum benefits + presenting sponsor title |

> **Modal CTA:** Become a Sponsor

#### In-kind modal
> **Modal label:** In-Kind Support Needed
> **Body:** The production needs these resources. If you can contribute any of the following, please reach out.
> *(same eight-row table as above)*
> **Modal CTA:** Contact Us to Contribute → `mailto:hello@stillherfoundation.org`

---

### 2.7 LIVE `/press.html` (becomes `/partnerships`)

**Page title:** `Press | Road to Her Smile | StillHer Foundation`
**Meta description:** "Press materials, stills, and contact information for Road to Her Smile, a StillHer Foundation documentary."

> **Kicker:** Press and Media
> **H1:** Road to Her Smile

#### Press Opportunities
> **Heading:** Story Angles for Media
>
> Road to Her Smile offers multiple entry points for press coverage. We welcome interview requests, features, and collaborative storytelling across the following angles:
>
> - The making of an independent documentary on a zero-to-one budget
> - Black women in documentary filmmaking and media production
> - Medical abandonment and institutional accountability in America
> - How immigrant women navigate systems not designed for them
> - A daughter telling her mother's story: the personal stakes of documentary work

#### Support the Project (QR block)
> **Heading:** Support the Project
> **Body:** Scan to contribute directly. Every donation funds production, legal advocacy, and distribution.
> *(QR is generated client-side at runtime via `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=...&color=1A1A1A&bgcolor=FFFFFF`, encoding the donation URL. Third-party runtime dependency: replace with a statically generated QR in Astro.)*

#### Film Overview / Production Information
| Key | Value |
|---|---|
| Title | Road to Her Smile |
| Genre | Documentary |
| Runtime | 98 minutes (est.) |
| Year | 2026 |
| Status | In production |
| Producer | StillHer Foundation |
| Director | TBC |
| Country | United States / Italy |

> **One-line synopsis**
> An Italian immigrant is failed by a husband, a doctor, and a trusted community. A documentary demands accountability.
>
> **Short synopsis (75 words)**
> Lia Spriggs left Italy for love and followed a man across the ocean who would betray her for twelve years. She found herself alone, toothless after a doctor disappeared post-procedure, and turned away by the community that referred her. Road to Her Smile documents the systems that failed her and the road back to her dignity.

#### Press Assets / Download Materials
> **Film Stills** - High-resolution production stills. ZIP archive, 300dpi, print-ready. *(Download ZIP)*
> **Poster + Key Art** - Official poster in PDF and PNG. Landscape and portrait orientations. *(Download PDF)*
> **Press Notes** - Full press kit with film overview, biographies, and production context. Approximately five to six pages. *(Download PDF)*
> **Director Statement** - Director's note on the making of the film and its purpose. One page. *(Download PDF)*
>
> The project's full press kit / EPK is available on request and is scoped to approximately five to six pages.

**Note:** on the LIVE page all four download buttons point at `#`. They are non-functional placeholders. (The older LOCAL press.html pointed them at fake Google Drive URLs instead. See section 4.)

#### About Lia
> **Heading:** Lia Spriggs
>
> Lia Spriggs was born in Verona, Italy, into a life of elegance and early promise. She modelled, she moved through rooms where presence was currency, and she had a future that looked expansive. She fell in love with a man on a military post in Vicenza. She followed him to America. Over twelve years of marriage she discovered he had been unfaithful for nearly all of them. She raised two children alone, in a country that was not her own, without family nearby. An eviction notice brought her to her knees. A trusted community referred her to a doctor. The doctor extracted thirteen of her teeth and then disappeared. She was left toothless, indefinitely, and the autoimmune disease that followed compounded everything. She now lives with diagnosed Hashimoto's disease and fibromyalgia. She is still standing. Road to Her Smile is her road back.

#### Press Contact
> **Heading:** Get in Touch
> **Body:** For interview requests, screening inquiries, and press accreditation.
>
> **StillHer Foundation Press Office**
> press@stillherfoundation.org
>
> We aim to respond to all press enquiries within 48 hours.

#### Accolades
> **Heading:** Festival and Grant History
>
> Road to Her Smile is currently in production. Festival submissions and grant applications are underway. This section will be updated as the film progresses through the festival circuit.
>
> **Status:** In production. Submissions pending.

---

### 2.8 LOCAL-ONLY COPY WORTH KEEPING

This copy exists ONLY in the local repo draft. It is written around "Leah" and "a church", so it cannot be lifted as-is, but several pieces are stronger than what is live and the copywriter should see them.

#### Local `index.html` hero (film-poster framing, not on live)
> **Meta strip:** 2026 · Documentary · Based on a True Story
> **Award badge:** Official Selection / StillHer 2026
> **Kicker:** A StillHer Foundation Documentary
> **Title:** Road to Her Smile
> **Synopsis:** Leah Spriggs left Italy for a promise of love. She was left with nothing. She is still standing.
> **Runtime line:** 98 min • 2026 • Documentary • True Story
> **CTAs:** Watch the Trailer | Read Her Story

> **Stills panel label:** Stills
> Thumb 1: `images/portrait.png`, caption "Verona, Italy"
> Thumb 2: `images/leah-young.png`, caption "Young Leah"
> Thumb 3: `images/still-johns-hopkins.png`, caption "The Procedure"

#### Local `index.html` "Her Story"
> **Label:** Her Story
> **Heading:** She was not always the woman the world would later overlook.
>
> Born in Verona, Italy, Leah Spriggs carried a natural elegance that luxury brands spend millions trying to replicate. She was a model. She stood in rooms where presence was currency, where the future looked expansive.
>
> Then she met a man in uniform on a military post in Vicenza. He promised her love, America, and a white picket fence. She left everything she knew and followed him across the ocean. What she walked into was not safety. It was betrayal, layered and relentless, over twelve years.

#### Local `index.html` timeline: "A Life Dismantled" / "Her Road"
This is a **six-chapter PAST timeline**. It is a completely different structure from the live `her-road.html`, which is a six-chapter FUTURE medical timeline. Both are worth keeping in the new site as two distinct sections.

> **Chapter One: Born in Verona, Italy**
> A woman of presence. A future that looked expansive. She modelled. She stood in rooms where presence was currency and beauty opened doors.
>
> **Chapter Two: Vicenza, Italy**
> She met a man in uniform. A promise of love and America. She believed him, as people believe those who speak with certainty.
>
> **Chapter Three: The Marriage**
> Twelve years. Infidelity running through almost all of them. A single immigrant mother. Two children. No safety net.
>
> **Chapter Four: Rock Bottom**
> An eviction notice, final. She dropped to her knees in front of her children. Then she found Grace Covenant Church and placed her trust there.
> *(FLAG: names the church. Live site has scrubbed this to "a trusted community".)*
>
> **Chapter Five: Johns Hopkins**
> Thirteen teeth removed. A doctor who then disappeared. No follow-up. No implants. No answers. Left toothless, indefinitely. Her body then developed an autoimmune disease.
>
> **Chapter Six: The Church**
> A $25 grocery gift card. Days later from the pulpit: a $7.2 million renovation announcement. This is the story this documentary tells.
> *(FLAG: "The Church", "from the pulpit". Live site has scrubbed this.)*

#### Local `index.html` email capture band
> **Label:** Follow Leah's Road
> **Heading:** Be the first to know when Road to Her Smile premieres.
> **Placeholder:** your@email.com
> **Button:** Notify Me
> **Confirmation:** You are on the list. Thank you.

#### Local `index.html` final CTA + share
> **CTAs:** Donate to Road to Her Smile | Share Her Story
> **Share sheet title:** Road to Her Smile
> **Share sheet text:** A story the world was never supposed to hear.
> **Clipboard fallback alert:** "Link copied. Share Leah's story."

#### Local `press.html` differences from live
> **One-line synopsis (local):** An Italian immigrant is failed by a husband, a doctor, and **a church**. A documentary demands accountability.
> **Short synopsis (local):** ...turned away by **the church** that referred her...
> **About the Foundation (local, NOT present live, worth keeping):**
> StillHer Foundation is a nonprofit dedicated to restoring dignity to women who have been abandoned by the systems meant to protect them. We document, advocate, and fund the restoration of women failed by medical institutions, religious organizations, and family structures. Road to Her Smile is our first documentary production. Our work begins with Leah. It will not end with her.
> *(FLAG: "religious organizations". Softened or removed on the live site. Legal review needed.)*

#### Logo tagline (from `images/logo-dark.svg` and `logo-light.svg`)
> **Wordmark:** STILLHER / FOUNDATION
> **Tagline:** Restoring dignity. One story at a time.
> **SVG aria-label:** "StillHer Foundation — Restoring dignity. One story at a time."

---

## 3. SPONSORS BLOCK

The sponsors block is a **repeated component** appearing at the bottom of every live page (`/`, `the-tradegy`, `her-road`, `who-is-lia`, `mission`, `film`, `press`). It is **not** present in either local file.

**Confirmed exact contents, identical on all seven live pages:**

> **Label:** Our Sponsors
> **Heading:** The people standing behind her.
> **Body:** Their belief in this project makes every frame possible.

| Initials badge | Name | Role |
|---|---|---|
| **JV** | John Victoria | Sponsor |
| **J** | Juliana | Sponsor |
| **P** | Pollyanna | In-Kind Support |
| **+** | Your Name Here | Become a Sponsor |

> **CTAs:** Become a Sponsor | View Sponsorship Deck

**Confirmation against expectation:** all four expected entries are present and spelled exactly as expected. "John Victoria", "Juliana", "Pollyanna", "Your Name Here". There are no additional sponsors, no logos (initials in a circle only), and no surnames for Juliana or Pollyanna.

**Cross-reference:** Pollyanna also appears on `film.html` in the in-kind table as the one **Secured** item: "Location (Pollyanna)".

---

## 4. LINKS AND CTAs

### 4.1 Card donation link (the single most important outbound link)
```
https://stillher-donation-production.up.railway.app/
```
**Confirmed.** This exact URL, with trailing slash, appears on **all seven live pages** and in the local `index.html`. It is the target of every one of the following labels:

| CTA label | Appears on |
|---|---|
| Donate Now | nav + mobile drawer, all pages; film.html "Support Directly" |
| Donate to Road to Her Smile | home, mission, film |
| Support Lia's Restoration | the-tradegy, who-is-lia |
| Become a Sponsor | sponsors block on all 7 pages; film.html tier modal |
| Support the Foundation | mission.html |

Local `index.html` additionally uses it for: `nav-donate`, `.about-link` ("Support the Foundation"), `.support-btn-1` ("Donate to Road to Her Smile").

### 4.2 Email addresses
| Address | Where | Label |
|---|---|---|
| `hello@stillherfoundation.org` | live `film.html`, in-kind modal | "Contact Us to Contribute" |
| `press@stillherfoundation.org` | live `press.html` AND local `press.html` | "StillHer Foundation Press Office" |

**There is no general contact form and no third contact address anywhere on the site.**

### 4.3 Booking / calendar links
**None found.** No Calendly, Cal.com, SavvyCal, HubSpot meetings, Google Calendar, or any other scheduling link exists on any live page or in either local file. The only "get in touch" mechanisms are the two mailto addresses above.

### 4.4 Social links
**Present but non-functional.** The footer "Follow" column renders three inline SVG icons on the live site and in local `index.html`:
- Instagram → `href="#"`
- X → `href="#"`
- Facebook → `href="#"`

**No real social profile URLs exist anywhere in the codebase.** These need to be sourced from the client before the new build.

### 4.5 Internal links (live, all relative)
`index.html` · `the-tradegy.html` · `her-road.html` · `mission.html` · `film.html` · `who-is-lia.html` · `press.html`

### 4.6 Placeholder / broken links to NOT migrate
| Link | Where | Problem |
|---|---|---|
| `#` on all 4 press download cards | live `press.html` | Non-functional placeholder |
| `https://drive.google.com/drive/folders/stillher-stills` | local `press.html` | Fake Google Drive URL, not a real folder ID |
| `https://drive.google.com/drive/folders/stillher-poster` | local `press.html` | Same |
| `https://drive.google.com/drive/folders/stillher-press-notes` | local `press.html` | Same |
| `https://drive.google.com/drive/folders/stillher-director` | local `press.html` | Same |
| `#` on all 3 social icons | live + local | No real profiles |
| `View Deck` / `View Sponsorship Deck` | live `film.html` + every sponsors block | Opens an on-page modal; there is no actual deck PDF hosted anywhere |
| `View List` | live `film.html` | Opens an on-page modal |

### 4.7 Third-party runtime dependencies
| Service | Purpose | Note |
|---|---|---|
| `https://fonts.googleapis.com` / `fonts.gstatic.com` | Cormorant Garamond, Lora, Raleway | Self-host in Astro |
| `https://api.qrserver.com/v1/create-qr-code/` | Runtime QR generation on press.html | Replace with a build-time static QR |
| `https://openrouter.ai/api/v1/chat/completions` | `generate-images.js` only | Do not migrate |

---

## 5. TYPOGRAPHY AND BRAND TOKENS (carry into Astro)

From the shared CSS across live and local:
```
--gold:  #C9A96E
--ink:   #1A1A1A
--dark:  #0D0D12
--cream: #F5F0E8
--muted: #888888
--white: #FFFFFF
off-white used for text on dark: #FAFAF7
footer black: #0A0A0F
```
**Fonts:** Cormorant Garamond (display headings, italic 300 for hero H1, 600 for section H2), Lora (body serif), Raleway (labels, nav, buttons, uppercase 0.2em to 0.35em letter-spacing).

---

## 6. IMAGES

### 6.1 Files in `/Users/ghost/Downloads/stillher-landing/images/`

| File | Size | Dimensions | What it shows | Real photo of a real person? |
|---|---|---|---|---|
| `hero.png` | 1,409,181 B (1.41 MB) | 1024x1024 | A lone woman in a long pale dress, back to camera, silhouetted against a tall arched window in a dark empty room. Face not visible. Warm golden chiaroscuro, heavy film grain. | **NO. AI-generated.** Prompt is in `generate-images.js`. Confirmed by viewing the file. Not Lia. |
| `portrait.png` | 1,469,913 B (1.47 MB) | 1024x1024 | Full-length editorial fashion portrait of a dark-haired woman in a camel coat, tan pussy-bow blouse, wide trousers, gold hoop earrings, holding a tan handbag, gazing off-camera against a warm beige wall. | **NO. AI-generated.** Prompt: "Vintage editorial fashion portrait of a beautiful Italian woman, early 1990s Milan fashion world aesthetic." **Not Lia.** Currently used on local index.html labelled "Leah Spriggs". This is a misrepresentation and must not be carried over. |
| `hands.png` | 1,448,117 B (1.45 MB) | 1024x1024 | Extreme close-up of a pale woman's hands clasped in her lap, warm amber raking side light, shallow depth of field. No face. | **NO. AI-generated.** Prompt in `generate-images.js`. No identifiable person, so lower risk, but still synthetic. |
| `leah-young.png` | 1,739,833 B (1.74 MB) | 1024x1024 | A young brunette woman in a cream linen dress leaning against a mossy Italian brick and stone wall, roses climbing, Veronese hills behind. Faded film stock look with a visible border. | **NO. AI-generated. Highest-risk asset on the site.** The prompt literally reads "Artistic recreation of a 1980s Italian photograph." **This is not Lia Spriggs.** It was the OG/Twitter share image on the local draft with alt "Leah Spriggs - Road to Her Smile Documentary", which presents a synthetic person as the real subject. **Delete. Do not migrate.** |
| `still-johns-hopkins.png` | 1,327,018 B (1.33 MB) | 1024x1024 | An empty dental treatment chair under a single overhead surgical lamp in a dark teal clinical room, instrument cart and sink to the left. No people. | **NO. AI-generated.** Not in `generate-images.js` (added a day later) but same 1024x1024 signature and same rendering style. It is the current live OG image. No person shown, so it is the safest of the synthetic set, but it depicts a specific named institution ("Johns Hopkins" in the filename) and is not a real photo of that clinic. Rename at minimum. |
| `logo-dark.svg` | 3,030 B | 480x120 | The StillHer wordmark for dark backgrounds: gold-and-off-white silhouette mark of three stylised standing female figures, "STILLHER" over a gold rule over "FOUNDATION", with italic tagline "Restoring dignity. One story at a time." | N/A. Vector brand asset. **Migrate. This is the only logo actually used in the markup** (`<img src="images/logo-dark.svg" alt="StillHer Foundation">` in the nav of every live page and both local files). |
| `logo-light.svg` | 2,960 B | 480x120 | Same lockup, light-background colourway | N/A. Migrate. Not currently referenced by any page. |
| `logo-mark-only.svg` | 3,539 B | 120x120 | The three-figure silhouette mark alone, no wordmark | N/A. Migrate. Useful for favicons, avatars, social. Not currently referenced. |
| `logo-dark.png` | 80,401 B | 1024x1024 | Raster logo | N/A. Superseded by the SVG. Do not migrate. |
| `logo-light.png` | 249,315 B | 1024x1024 | Raster logo | N/A. Superseded by the SVG. Do not migrate. |
| `logo-generated.png` | 249,962 B | 1024x1024 | AI-generated logo exploration | N/A. Discard. |
| `favicon.svg` | 1,344 B | 64x64 | Gold three-figure silhouette mark on a `#0D0D12` square | N/A. Migrate, or regenerate from `logo-mark-only.svg`. |
| `manifest.json` | 156 B | n/a | Maps hero.png, portrait.png, hands.png, leah-young.png. Written by `generate-images.js`. | N/A. Artefact of the AI pipeline. Do not migrate. |

### 6.2 Images that exist ONLY on the live site (NOT in the local repo)

These must be pulled down from the live deployment before it is taken offline.

| Live URL | Size | Referenced as | Assessment |
|---|---|---|---|
| `/images/lia-italy.jpg` | 2,566,439 B (2.57 MB) | `<img alt="Lia Spriggs in her modeling years">` on the-tradegy.html; `<img alt="Young Lia Spriggs">` on who-is-lia.html; `<img alt="Lia Spriggs">` on mission.html; also the CSS hero background on several pages | **Almost certainly the real photograph of the real Lia Spriggs.** Evidence: it is the only JPG among the imagery, it is 2.57 MB (far larger than any of the 1.3 to 1.7 MB AI PNGs), it is NOT produced by `generate-images.js`, it is not 1024x1024, it was added after the AI set, it is named for her, and its alt text on three separate pages asserts it is her. **HIGH PRIORITY: download and preserve. Never replace this with AI imagery.** I was unable to open the binary to visually confirm (the shell became unavailable mid-task), so treat this as a strong inference and have the client confirm it is her before publishing. |
| `/images/mission-hero.jpg` | 54,332 B | CSS `background-image` on mission.html | Small file. Not in the repo. Download and assess. Unknown subject. |
| `/images/film-sponsorship.jpg` | 145,569 B | CSS `background-image` on film.html | Not in the repo. Download and assess. Unknown subject. |

### 6.3 Images in `/reference/`
| File | Size | Note |
|---|---|---|
| `reference/screenshots/logo-sketch-primary.png` | 2,015,998 B | Logo design sketch |
| `reference/screenshots/voices-united.webp` | 11,092 B | Design reference screenshot |

### 6.4 Image policy recommendation for the rebuild

- **Preserve:** `lia-italy.jpg` (real photo), `logo-dark.svg`, `logo-light.svg`, `logo-mark-only.svg`, `favicon.svg`.
- **Do not migrate:** `leah-young.png`, `portrait.png`, `hero.png`, `hands.png`, all three logo PNGs, `manifest.json`, `generate-images.js`.
- **Rationale:** a documentary whose entire thesis is accountability and truth-telling cannot use AI-generated pictures of a fictional woman to represent a real named victim. `leah-young.png` and `portrait.png` are actively captioned as Lia/Leah in the markup. That is the single biggest content liability in the migration.
- **Replacement path:** source real archival photographs of Lia from the family, or use non-figurative imagery (`hands.png` style, empty rooms, Verona locations) clearly captioned as illustrative.

---

## 7. EXISTING API: `api/subscribe.js`

**Path:** `/Users/ghost/Downloads/stillher-landing/api/subscribe.js` (982 bytes)

**What it is:** a Vercel serverless function (default-export handler, ESM, `import fs`/`import path`) mounted at `/api/subscribe`.

**What it does:**
1. Sets permissive CORS headers: `Access-Control-Allow-Origin: *`, methods `POST, OPTIONS`, headers `Content-Type`.
2. Short-circuits `OPTIONS` with 200. Rejects anything other than `POST` with 405.
3. Reads `{ email, source }` from the JSON body. Validates only that `email` exists and contains `@`. Returns 400 `{ error: 'Invalid email' }` otherwise.
4. Reads `/tmp/stillher_subscribers.json`, parses it as an array, swallowing any error into an empty list.
5. Deduplicates on exact email match. If new, pushes `{ email, source: source || 'unknown', ts: <ISO timestamp> }` and writes the file back.
6. Returns 200 `{ ok: true }`.

**What it integrates with:** **nothing.** There is no Mailchimp, ConvertKit, Klaviyo, Resend, Beehiiv, Supabase, Airtable, or database connection. It writes to the local filesystem only.

**Why it is effectively broken in production:** Vercel serverless functions have an **ephemeral, per-invocation `/tmp`**. Every cold start gets a fresh container. Captured emails are silently and permanently lost, and the dedupe check almost never sees prior entries. **Anyone who has submitted the mailing-list form on this site is not on any list.** This should be raised with the client as a data-loss issue, and it may be worth telling any known subscribers to re-subscribe.

**Client side:** local `index.html` POSTs `{ email, source: 'documentary_site' }` to `/api/subscribe`, and on a thrown fetch error falls back to pushing `{ email, ts }` into `localStorage` under the key `sh_emails`. Note the fallback only fires on a network throw, not on a non-2xx response, so failures are mostly invisible. The live homepage presents the same capture as a "Join Our Mailing List" modal.

**Recommendation for the Astro build:** replace entirely with a real ESP integration (the foundation will need double opt-in and an unsubscribe path regardless), and check `localStorage` capture on any machine that has been used for testing.

---

## 8. ROUTE MAPPING TABLE (for redirects)

The new `/` is the **StillHer Foundation home**, not Road to Her Smile. RTHS moves under `/road-to-her-smile`.

| Old path (live) | New route | Redirect type | Note |
|---|---|---|---|
| `/` | `/road-to-her-smile` | 301 | The old root was the RTHS landing page. The new root is the foundation home, so the old root must redirect INTO the campaign, not to the new root. |
| `/index.html` | `/road-to-her-smile` | 301 | Same target as `/` |
| `/the-tradegy.html` | `/road-to-her-smile/the-tragedy` | 301 | **Fixes the "Tradegy" misspelling.** Keep this redirect permanently. |
| `/her-road.html` | `/road-to-her-smile/her-road` | 301 | |
| `/who-is-lia.html` | `/road-to-her-smile/who-is-lia` | 301 | |
| `/film.html` | `/road-to-her-smile#partnerships` | 301 | Sponsorship content folds into an anchor on the campaign page |
| `/mission.html` | `/about` | 301 | Foundation-level content, moves out of the campaign |
| `/press.html` | `/partnerships` | 301 | |

**Additional redirects worth adding defensively** (not required, but cheap and they catch the misspelling in both directions):

| Path | New route | Note |
|---|---|---|
| `/tragedy.html` | `/road-to-her-smile/the-tragedy` | 404s today; people will guess the correct spelling |
| `/the-tradegy` | `/road-to-her-smile/the-tragedy` | Extensionless variant |
| `/her-road` | `/road-to-her-smile/her-road` | Extensionless variant |
| `/who-is-lia` | `/road-to-her-smile/who-is-lia` | Extensionless variant |
| `/film` | `/road-to-her-smile#partnerships` | Extensionless variant |
| `/mission` | `/about` | Extensionless variant |
| `/press` | `/partnerships` | Extensionless variant |

**Asset paths:** keep `/images/lia-italy.jpg` resolvable, or 301 it to its new location. It is referenced by the current OG tags and by any third party that has hotlinked it.

**OG image:** the live OG image is `/images/still-johns-hopkins.png`. If that asset is renamed or dropped, add a redirect so existing shared links on WhatsApp, iMessage, LinkedIn and X do not lose their preview card.

---

## 9. MIGRATION CHECKLIST

- [ ] Download `lia-italy.jpg`, `mission-hero.jpg`, `film-sponsorship.jpg` from the live site before it is decommissioned. They exist nowhere else.
- [ ] Confirm with the client that `lia-italy.jpg` is genuinely a photo of Lia before publishing it under her name.
- [ ] Replace "Leah" with "Lia" everywhere. Never ship the local draft's spelling.
- [ ] Do not reintroduce "Grace Covenant Church", "the church", "from the pulpit", or "religious organizations". The live site deliberately uses "a trusted community" / "that same organization" / "a community". Get a legal read before deviating.
- [ ] Legal read on retaining "a doctor at Johns Hopkins" (currently live on the-tradegy.html).
- [ ] Fix "Tradegy" to "Tragedy" in every label, title and slug, and hold the 301 from the old path.
- [ ] Drop all four AI-generated figure images. Source real imagery or use clearly illustrative non-figurative art.
- [ ] Rotate the OpenRouter API key exposed in `generate-images.js` line 7. Do not migrate that file.
- [ ] Replace `api/subscribe.js` with a real ESP. Warn the client that existing captures were lost to Vercel's ephemeral `/tmp`.
- [ ] Get real Instagram, X and Facebook URLs from the client. All three are currently `href="#"`.
- [ ] Get the real sponsorship deck PDF. "View Deck" currently just opens a modal.
- [ ] Get the four real press assets (stills ZIP, poster, press notes, director statement). All four download buttons are dead.
- [ ] Replace the runtime `api.qrserver.com` QR call with a build-time static QR.
- [ ] Self-host Cormorant Garamond, Lora and Raleway.
- [ ] Verify the donation URL `https://stillher-donation-production.up.railway.app/` is still live and still the correct processor before wiring it into ~20 CTAs.
- [ ] Decide whether `hello@stillherfoundation.org` and `press@stillherfoundation.org` both survive, or consolidate.
