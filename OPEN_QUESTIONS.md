# Open questions

Every unresolved decision on The StillHer Foundation rebuild.
Nothing here is invented. Where the build had to choose, the choice is stated so it can be reversed cheaply.

Last updated: 16 September 2026

## Resolved by the 15 September meeting

- **The tagline.** Settled and changed: "I won't let Graves put me in one." The word "disease" is deliberately absent, because the pun is the point.
- **Road to Her Smile naming.** Settled: "The Road to Her Smile Project".
- **The logo.** Settled in the negative. The SHF mark with the stem through the S is rejected. Her words: "it's giving money sign and I don't like it, it's giving back vibes." A replacement is in `brand/v2/`.
- **Lia's identity.** Settled: **Lia is Nani's mother.** The documentary is about the founder's own mother. This was not clear before.
- **The modelling photograph's provenance.** Settled. Bosi supplied a phone photo of the physical black and white darkroom print, on an Ilford paper envelope beside a film camera. It is the same image as the one rescued from the live Vercel site, so it is genuine and family owned. `reference/nani-refs/lia-modelling-print.jpg`.
- **Protecting Her Ecosystem.** It is no longer a homepage section. It is slide three of the hero and it has its own page.

## For Nani

1. **Thin purple thyroid-community accent: in or out?**
   Sep 13 raised it as a maybe. Sep 14 settled on turquoise, cream, sand and light gold. The build ships with no purple. Adding a hairline purple accent later is a one-line change in `src/styles/tokens.css`.

2. **Rail label: "Road to Her Smile" or "Her Smile Project"?**
   Build uses "Road to Her Smile" at route `/road-to-her-smile`.

3. **Retreat name: "Her Relief Retreat" or "Her Release Retreat"?**
   The transcript leaves this unresolved. Build uses Relief, at `/her-relief-retreat`.

4. **Initiative name: "Protecting Her Ecosystem" or "Her Ecosystem Initiative"?**
   The transcript garbles it as "H.E.T." in places. Build uses "Protecting Her Ecosystem".

5. **The Good Weekend dates and venue.**
   Pending Nani's conversation with Kevin. April 2 to 3 2027 and a country club were mentioned on Sep 13 but are NOT published anywhere on the site. Note that a two day frame no longer fits the Sep 14 three day structure (Friday dinner, Saturday Good Girls, Sunday Good Guys). The page says "Spring 2027, dates to be announced."

6. **Holiday dinner: include on the About page as the third flagship, or hold?**
   Currently listed on `/about` as a December flagship with the date and venue left pending.

7. **Payment handles, wallet addresses, Instagram handles, booking link, sponsorship deck PDF, domain.**
   All are placeholders in `src/config/site.ts`. See PLACEHOLDERS.md for the full list.

8. **Keep the Railway card donation link?**
   `https://stillher-donation-production.up.railway.app/` is carried over from the current site as "Donate by card". Confirm it is still the right destination before launch.

9. **Compliance wording for Her Future.**
   The page carries a general "information only, not financial advice" footer. This wording must be confirmed with her firm before launch. The firm is never named anywhere on the site, per the legal constraint.

10. **Nani's new activist headshot, Dubai award photos, and the speech and interview links.**
    The hero and the Dubai slide run on placeholder frames until these land. The brief's art direction for the headshot: activist, survivor, campaign energy, less businessy.

## Raised during the build

11. **Four reference screenshots could not be recovered.**
    `Screenshot 2026-09-15 at 11.06.01` (second logo angle), `11.11.41` and `11.11.45` (L'Echelon), `11.14.32`, `11.14.35`, `11.14.37`, `11.14.41` (British Thyroid Foundation) are iCloud placeholder stubs on the Desktop and would not download after three attempts over several minutes. The build proceeded from the written descriptions in the brief plus the two files that did resolve: the primary logo sketch and the Voices United reference. If Nani or Bosi can re-sync those files, the frontend reviewer should recheck visual fidelity against them.

12. **Road to Her Smile is no longer the funding anchor.**
    Sep 13 framed Road to Her Smile as the funding story. Sep 14 reversed this: The Good Weekend Tournament is the cash engine for the foundation's operational budget, and Road to Her Smile is one of three initiatives and self funded. Copy across the site follows Sep 14. Confirm this is still correct.

13. **A GitHub personal access token was hardcoded in the git remote URL.**
    The old `origin` URL embedded a `ghp_` token, which is now dead. The remote has been rewritten to a clean HTTPS URL using the `gh` credential helper. The exposed token should be revoked in GitHub settings if it has not expired already.

14. **Wordmark type: converted to paths or live text?**
    Depends on what the brand agent could achieve. If the wordmark uses live `<text>`, it will render differently anywhere the self hosted fonts are unavailable. Noted in `brand/BRAND_GUIDE.md`.

15. **Newsletter doctor contributor.**
    The brief notes a doctor contributor is planned for the newsletter. No doctor is named anywhere on the site, correctly. Confirm when there is someone to name.

16. **Impact band statistics.**
    Every number is a placeholder. The band renders as a finished design with "Pending" values rather than invented figures. Nani needs to supply real numbers or the band should be removed before launch.

17. **The top bar no longer matches Nani's Sep 14 instruction, and she should be told.**
    She asked for exactly three things in the top bar: About Us, the centred SHF emblem, and About the Founder, with everything else in a left rail.

    What is built instead: a Menu button, the centred emblem, and on desktop the priority links "Road to Her Smile" and "About Us" plus a permanent Donate button. The left rail is gone and the whole site lives in a drawer.

    Why it changed: Bosi reviewed the first deploy and asked for full width pages and a hamburger on desktop, because the fixed rail was squeezing every container. Research across seven reference charity sites found none of them uses a persistent desktop sidebar, including the British Thyroid Foundation that Nani cited. See `reference/CHARITY_PATTERNS.md`.

    The centred monogram with a split either side, which was the part she cared about visually, is preserved. But the two About links are no longer both in the top bar, so this is a real deviation from her stated wish. Worth a sentence to her rather than letting her discover it.

18. **The impact band publishes nothing.**
    All three statistics render as "Pending". It is honest and it is designed, but a first time visitor sees three empty numbers. Either Nani supplies real figures or the band should be removed before launch. It is one array in `src/config/site.ts`.

19. **Trust signals a credible charity site normally carries, which we cannot build yet.**
    The research flagged these as the difference between reading as an organisation and reading as a campaign. Each is blocked on a fact that does not exist yet, not on design work:
    - A "how can we help" support block. The foundation does not yet run a helpline or information service, and implying one would be false.
    - A donation block with preset amounts and what each one funds. Card giving hands off to an external page, and stating what an amount funds would be invented.
    - Regulator or accreditation badges. 501(c)(3) status is still pending.
    - Named stories with photographs. The only real photograph available has unconfirmed provenance.
    - Partner or recognition logos. No partner is confirmed.

20. **Two credentials in git history need revoking.**
    A GitHub personal access token was hardcoded in the old `origin` remote URL, and an OpenRouter key is committed in `generate-images.js` on `main` and under the `legacy-rths-v1` tag. Neither is on `rebuild/foundation`, but both are in history and should be treated as compromised.


## Raised by the 15 September meeting

21. **The Graves' disease resource page has no approved content.**
    She asked for it and then set the constraint herself: "we also have to make sure the information we're giving is right." So the page ships as a finished structure with every clinical block pending. Nothing medical is invented. She is working on partnering with other Graves' foundations, and until one is confirmed and a named medical source has reviewed the copy, this page should not go live with real claims in it.

22. **Nani's description of a flare is the best content she has ever given us, and she has not approved it.**
    During the call, while having a flare, she described it unprompted: processing problems, losing words, needing things repeated, closing her eyes, slowed speech, shortness of breath, asthma, tremors that do not show on camera, extreme fatigue, nausea, low blood pressure. She also said her disability claim was denied.
    It is on `/graves-disease` as her own first person account, attributed to her, clearly not presented as clinical information. **Confirm she is happy for it to be published** before launch. It is personal and she said it while unwell.

23. **The Her Future funnel offers two options the API does not yet accept.**
    She added "Earned Income Opportunities" and "Other". The Worker's schema only accepts `iul`, `business_insurance`, `annuities` and `retirement`. The frontend currently bridges both new options into the notes field so submissions still validate and nothing is lost. The Worker needs `earned_income` and `other` added to `HER_FUTURE_SCHEMAS` properly.

24. **The Good Weekend and Her Relief Retreat panel images.**
    She approved the retreat image ("I like that, keep that there") and Her Future. She rejected the golf image, which reads as a farm, and the Road to Her Smile image. Both are being regenerated.

25. **Speaker section.**
    She asked "can you add on the website like a speaker panelist" and then said she would look again at the existing speaker page. Confirm whether the current `/speaker` page is what she meant.

26. **She asked for a master spreadsheet of every login and password. It has not been built, deliberately.**
    Her reasoning was sound: continuity if something happens to either her or Bosi. The solution is not. A plaintext credential file, shared between two people in two countries, is the single worst place to keep them, and it would sit in a Downloads folder and a git repo. A shared password manager vault solves the exact problem she described without creating that risk. This needs raising with her rather than quietly ignoring.

27. **Operational items from the call that are not website work.**
    Cal.com availability: Monday, Tuesday, Wednesday and Friday 2:30pm to 6:30pm, Thursday unavailable because her daughter has ballet, Saturday and Sunday 9am to 5pm. Luxury Lens at 350 dollars paid via Stripe before the booking confirms, with a line saying the appointment is not confirmed until the invoice is paid. An automated review request after each appointment. Donation agreement paperwork and an automatic 501(c)(3) receipt carrying the EIN.
    Note that Luxury Lens appears to be a Rosen Relations product rather than a foundation one, so confirm which site it belongs on before building anything.

28. **Deadline.**
    She speaks on the 3rd. Flyers promoting The Still Her Foundation are already circulating and there is no live site. She called this priority one and asked for the site by the end of the week.
