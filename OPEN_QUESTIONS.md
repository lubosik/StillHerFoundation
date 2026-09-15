# Open questions

Every unresolved decision on The StillHer Foundation rebuild.
Nothing here is invented. Where the build had to choose, the choice is stated so it can be reversed cheaply.

Last updated: 15 September 2026

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
