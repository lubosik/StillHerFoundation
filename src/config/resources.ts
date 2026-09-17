/**
 * The resource hub index.
 *
 * One entry per article. The hub page renders cards straight from this list,
 * so publishing the next article means adding an object here and creating the
 * page at `src/pages/graves-disease/<slug>.astro`. Nothing else to touch.
 *
 * `thumb` is an image slot name from `public/images/`.
 */

export type Article = {
  slug: string;
  title: string;
  /** One or two sentences. Used on the card and as the meta description. */
  description: string;
  tags: readonly string[];
  thumb: string;
  thumbAlt: string;
  /** ISO for the time element, plus the human form we print. */
  publishedISO: string;
  published: string;
  /** Rounded up from the word count at roughly 200 words a minute. */
  readingMinutes: number;
};

export const articles: Article[] = [
  {
    slug: 'graves-disease-explained',
    title: "Graves' disease, explained",
    description:
      "What Graves' disease actually is, what it does to a body, how it is diagnosed and what living with it looks like. Written for the newly diagnosed and the people around them, and opening with our founder describing a flare while she was in one.",
    tags: ["Graves' disease", 'Explainer', 'Newly diagnosed', 'Symptoms'],
    thumb: 'graves-body',
    thumbAlt: 'The hollow of a throat and collarbone in soft daylight, a fine gold chain resting there.',
    publishedISO: '2026-09-17',
    published: '17 September 2026',
    readingMinutes: 9,
  },
];

/** Everything published, newest first. */
export const publishedArticles = [...articles].sort((a, b) =>
  b.publishedISO.localeCompare(a.publishedISO)
);

/** Every tag in use, for the hub filter row. */
export const allTags = Array.from(
  new Set(articles.flatMap((a) => a.tags))
).sort((a, b) => a.localeCompare(b));

export const hub = {
  title: "Graves' disease",
  kicker: 'Resources',
  heading: 'Graves. Did you know?',
  lede:
    'A growing library for the people living with it, the people who love them, and the people who have only just heard the name. Everything here is written against named medical sources and cited so you can check it yourself.',
  /** Shown while the library is small, so the page does not pretend to be big. */
  note: 'We are publishing these one at a time and checking each one properly rather than filling the page quickly.',
} as const;
