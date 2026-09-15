# How credible charity sites are actually built

Research pass, 15 September 2026. Sites studied: British Heart Foundation, Macmillan, Breast Cancer Now, charity: water, British Thyroid Foundation, Cancer Research UK, Malala Fund, Girl Effect.

Structure, nav order, section order and footer text below are verified from the live pages. Colour percentages and container widths are estimates and are marked as such.

## The three findings that changed this build

### 1. No charity site uses a persistent desktop sidebar

Zero of the seven reference sites have one. Every homepage is a single vertical stack of full bleed bands with a centred inner container. charity: water's About page states outright that there is no sidebar. Where health charities use a side navigation at all it is sub navigation on deep information pages, never on the homepage, never persistent.

The original build had a fixed 15rem left rail on desktop. It has been removed.

### 2. A bare hamburger on desktop costs real usability, but a combo hamburger does not

The research against it is strong:
- Nielsen Norman Group measured a drop of more than 20 percent in discoverability with hidden navigation, and desktop users were at least 39 percent slower. Desktop users opened hidden menus in only 27 percent of cases, against 48 to 50 percent for visible or combo navigation.
- Jakob Nielsen, June 2025: hiding core navigation behind three stacked lines violates the visibility principle, because links users cannot see may as well not exist.
- Brad Frost: a hamburger removes a branding opportunity, because navigation labels themselves tell a visitor what the organisation actually does.

But the decisive fact for this project: **the British Thyroid Foundation, which is Nani's own reference site, uses a hamburger on every screen size and gets away with it.** It works because BTF pairs it with an always visible priority cluster: Membership, a Donate button, Shop and Search sit outside the menu, and only the long tail sits inside. NN/g's combo condition performed as well as fully visible navigation.

So the pattern to ship is priority plus: hamburger, labelled with the word Menu rather than a bare icon, alongside a small number of always visible priority links and a permanent Donate button.

### 3. White is the base everywhere. Colour is for actions

Every reference site uses white as the default page and card surface and reserves the brand colour for bands and actions. None uses a cream or tinted base. Estimated white coverage across the seven homepages is 60 to 75 percent, brand colour 10 to 20 percent, the rest photography or a light neutral band.

Target for this site:
- White, roughly 70 percent: page background, header, all cards, footer top.
- Turquoise, roughly 10 percent, action colour only: the Donate button, links, eyebrow labels, stat numerals, one full bleed band, focus states. Never a large background behind body text.
- Cream, roughly 20 percent, two bands maximum. More than two and cream becomes the base and the page reads as a lookbook, which was the original complaint.

## Where Donate lives

Consistently three to five touchpoints: header top right with a contrasting fill, a hero CTA, a dedicated mid page donation block with preset amounts, ways to give cards, and a footer link. The donation block sits third to fifth on the page, never first. Help first, ask second.

## What makes a site read as an organisation rather than a campaign

1. Registered charity number in the footer legal line, in an exact stated form. All six UK sites do this. charity: water and Girl Effect give the US EIN equivalent.
2. Registered office street address in the footer.
3. Regulator or accreditation badges: Fundraising Regulator, PIF TICK for health information.
4. A helpline or contact number with opening hours.
5. Impact numbers with a source and a year, placed mid page rather than in the hero.
6. A "how can we help" block high on the page. Health charities lead with help, then ask for money.
7. A dedicated donation block with preset amounts and what each one funds.
8. Real, named people's stories with photographs.
9. Governance links: annual report, financial information, strategic plan, trustees, safeguarding, complaints, accessibility statement.
10. Partner and institutional logos.
11. A campaign or event strip, which signals an ongoing programme rather than a launch.
12. Plain, functional navigation labels. No poetic or campaign style labels.

## Per site notes

**British Heart Foundation.** Two tier header, utility bar above a horizontal nav of five items, Donate a top level item with its own submenu. Impact stats mid page. Footer carries three registration numbers, the Fundraising Regulator logo, a helpline, executive pay and a modern slavery statement. Sans throughout, custom typeface.

**Macmillan.** Horizontal nav of six items, Donate a button in the top right cluster. Footer carries three registration numbers, Fundraising Regulator and PIF TICK badges, registered office. Homepage ends on a support line block with hours.

**Breast Cancer Now.** Leads with "find life changing support now", then real named stories, then science, then a donation block with tiers. Registered 1160558 and SC045584.

**charity: water.** Thin campaign bar above the nav carrying a live impact stat and a matched giving CTA. Strongest trust block of the set: the 100 percent promise, the EIN, four rating badges, two street addresses.

**British Thyroid Foundation.** The client's reference. Hamburger on all sizes plus a visible priority cluster. Homepage runs featured carousel, news, events, ways to get involved, donation tiers, impact statistics, personal stories, help by need, membership. Impact framed as "2500+ people assisted each year" and "£600k+ invested into research since 1997".

**Cancer Research UK.** Utility row with search and donate, horizontal nav of six. Donation form with preset amounts is the third section. Custom hybrid slab and sans, chosen to carry scientific weight while staying compassionate.

**Malala Fund and Girl Effect.** Both women focused, both roughly 75 percent white with brand accents, both sans. Malala Fund leads with the mission sentence, then a stat, then where they work, then stories. Girl Effect's footer carries both the US EIN and the UK charity and company numbers.

## Applied to this build

Done:
- Removed the desktop side rail. Pages run full width with a centred container.
- White is the page canvas, cream is the alternating band.
- Priority plus navigation: Menu button with the word, a permanent Donate button, and priority links visible on desktop.
- Serif for display headlines only, sans for navigation, body, buttons, forms and footer.
- Impact strip exists, with honest pending values rather than invented numbers.

Not done, and why:
- **No "how can we help" support block.** The foundation does not yet run a helpline or an information service. Building one would imply a service that does not exist.
- **No donation block with preset amounts and what each funds.** Card giving currently hands off to an external page we do not control, and stating what a given amount funds would be an invented claim.
- **No regulator badges.** The foundation's 501(c)(3) status is still pending. A placeholder badge would be a false trust signal.
- **No named stories with photographs.** The only real photograph available has unconfirmed provenance.
- **No partner logos.** No partner has been confirmed.

Each of these is a genuine content gap, not a design gap. They are listed in PLACEHOLDERS.md and OPEN_QUESTIONS.md and should be built as soon as Nani supplies the underlying facts.
