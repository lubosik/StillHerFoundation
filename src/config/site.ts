/**
 * Central configuration for The StillHer Foundation.
 *
 * Every value Nani still needs to supply lives here and nowhere else.
 * Drop her real details in once and the whole site updates.
 *
 * A value marked `pending: true` renders as a tasteful placeholder:
 * a gold dashed outline in dev, a neutral "Coming soon" in production.
 * Every pending value is listed in PLACEHOLDERS.md.
 */

export type Pending<T> = {
  value: T;
  pending: boolean;
  /** Shown to visitors in production while the value is pending. */
  fallback: string;
  /** What Nani needs to send, for PLACEHOLDERS.md. */
  note: string;
};

const p = <T>(value: T, pending: boolean, fallback: string, note: string): Pending<T> => ({
  value,
  pending,
  fallback,
  note,
});

export const IS_DEV = import.meta.env.DEV;

/* ------------------------------------------------------------------ */
/* Organisation                                                        */
/* ------------------------------------------------------------------ */

export const org = {
  name: 'The StillHer Foundation',
  shortName: 'StillHer',
  legalName: p(
    'The StillHer Foundation',
    true,
    'The StillHer Foundation',
    'Confirm the exact registered legal entity name.'
  ),
  /** Domain is assumed, not yet purchased. */
  domain: p(
    'stillherfoundation.org',
    true,
    'stillherfoundation.org',
    'Confirm and purchase the domain. Build assumes stillherfoundation.org.'
  ),
  email: p(
    'hello@stillherfoundation.org',
    true,
    'hello@stillherfoundation.org',
    'Confirm this inbox is live. It is the address used on the current site.'
  ),
  taxStatus: p('', true, '501(c)(3) status: pending', 'Confirm 501(c)(3) status and EIN once filed.'),
  founded: p('', true, '', 'Year the foundation was founded.'),
  address: p('', true, '', 'Registered mailing address for the legal pages.'),
} as const;

export const seo = {
  titleSuffix: 'The StillHer Foundation',
  defaultDescription:
    "The StillHer Foundation raises awareness of Graves' disease, creates a safe space for women in business, and protects her ecosystem.",
  ogImage: '/brand/og-default.png',
  locale: 'en_US',
} as const;

/* ------------------------------------------------------------------ */
/* Mission, verbatim. Do not reword.                                   */
/* ------------------------------------------------------------------ */

export const mission = {
  headline: "I won't let Graves' disease put me in one.",
  statement:
    "The StillHer Foundation raises awareness of Graves' disease, creates a safe space for women in business, and protects her ecosystem.",
  supporting: 'Founding leader of the Protecting Her Ecosystem initiative.',
} as const;

/* ------------------------------------------------------------------ */
/* Social                                                              */
/* ------------------------------------------------------------------ */

export const social = {
  foundationInstagram: p(
    'https://instagram.com/',
    true,
    '',
    'Instagram handle and URL for The StillHer Foundation.'
  ),
  naniInstagram: p(
    'https://instagram.com/',
    true,
    '',
    'Instagram handle and URL for Nani Rosen.'
  ),
} as const;

/* ------------------------------------------------------------------ */
/* Giving                                                              */
/* ------------------------------------------------------------------ */

export type GivingMethod = {
  id: string;
  label: string;
  kind: 'handle' | 'wallet' | 'link';
  /** Handle, wallet address or URL. */
  detail: Pending<string>;
  /** Blockchain network, for crypto only. */
  network?: string;
  /** Generate a QR code for this at build time. */
  qr: boolean;
  hint?: string;
};

export const giving: GivingMethod[] = [
  {
    id: 'card',
    label: 'Card',
    kind: 'link',
    qr: false,
    hint: 'Give by debit or credit card.',
    detail: p(
      'https://stillher-donation-production.up.railway.app/',
      true,
      '',
      'Confirm the Railway card donation link is still the right destination.'
    ),
  },
  {
    id: 'venmo',
    label: 'Venmo',
    kind: 'handle',
    qr: false,
    detail: p('', true, '', 'Venmo handle.'),
  },
  {
    id: 'paypal',
    label: 'PayPal',
    kind: 'handle',
    qr: false,
    detail: p('', true, '', 'PayPal handle or paypal.me link.'),
  },
  {
    id: 'cashapp',
    label: 'Cash App',
    kind: 'handle',
    qr: false,
    detail: p('', true, '', 'Cash App $cashtag.'),
  },
  {
    id: 'zelle',
    label: 'Zelle',
    kind: 'handle',
    qr: false,
    detail: p('', true, '', 'Zelle email or phone number.'),
  },
  {
    id: 'btc',
    label: 'Bitcoin',
    kind: 'wallet',
    network: 'Bitcoin network (BTC)',
    qr: true,
    detail: p('', true, '', 'Bitcoin wallet address. Confirm the network before publishing.'),
  },
  {
    id: 'xrp',
    label: 'XRP',
    kind: 'wallet',
    network: 'XRP Ledger',
    qr: true,
    hint: 'A destination tag may be required.',
    detail: p('', true, '', 'XRP wallet address and destination tag if one is needed.'),
  },
];

/* ------------------------------------------------------------------ */
/* Her Future                                                          */
/* ------------------------------------------------------------------ */

export const herFuture = {
  /** Nani and her partner are creating a joint booking link. */
  bookingUrl: p(
    '',
    true,
    '',
    'Joint booking calendar link for the 20 minute discovery call.'
  ),
  disclaimer:
    'This is a 20-minute discovery call. Please set aside 20 minutes of uninterrupted time. If you are more than 5 minutes late, the call will be cancelled and you will be invited to rebook.',
  compliance:
    'The information on this page is general information only. It is not financial, tax or legal advice, and it is not an offer to sell or a solicitation to buy any product. Speak with a licensed professional about your own circumstances.',
} as const;

/* ------------------------------------------------------------------ */
/* Partnerships                                                        */
/* ------------------------------------------------------------------ */

export const partnerships = {
  sponsorshipDeck: p(
    '',
    true,
    '',
    'Sponsorship deck PDF. Upload to /public/docs/ and set the path here.'
  ),
} as const;

/** Sponsors currently credited on the Road to Her Smile page. */
export const sponsors = ['John Victoria', 'Juliana', 'Pollyanna', 'Your Name Here'] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/** Top bar. Only these three things. Nothing else goes up here. */
export const topNav = [
  { label: 'About Us', href: '/about' },
  { label: 'About the Founder', href: '/founder' },
] as const;

/** Left rail. Order is fixed. Road to Her Smile is always first. */
export const railNav = [
  { label: 'Road to Her Smile', href: '/road-to-her-smile' },
  { label: 'The Good Weekend', href: '/the-good-weekend' },
  { label: 'Her Relief Retreat', href: '/her-relief-retreat' },
  { label: 'Her Future', href: '/her-future' },
  { divider: true },
  { label: 'Speaker', href: '/speaker' },
  { label: 'Support', href: '/support' },
  { label: 'Partnerships & Press', href: '/partnerships' },
] as const;

export const railCta = { label: 'Donate', href: '/support' } as const;

/* ------------------------------------------------------------------ */
/* Initiatives                                                         */
/* ------------------------------------------------------------------ */

export const initiatives = [
  {
    id: 'road-to-her-smile',
    label: 'Current Campaign',
    title: 'Road to Her Smile',
    emphasis: 'Her Smile',
    descriptor: 'A documentary giving the road to redemption back to a woman who had it stolen.',
    href: '/road-to-her-smile',
    image: 'rths-road',
  },
  {
    id: 'the-good-weekend',
    label: 'Spring 2027',
    title: 'The Good Weekend',
    emphasis: 'Good',
    descriptor: 'Three days of sport and company that fund the work of the foundation.',
    href: '/the-good-weekend',
    image: 'good-weekend-course',
  },
  {
    id: 'her-relief-retreat',
    label: 'Coming Soon',
    title: 'Her Relief Retreat',
    emphasis: 'Relief',
    descriptor: "Rest, care and community for women living with Graves' disease.",
    href: '/her-relief-retreat',
    image: 'retreat-spa',
  },
  {
    id: 'her-future',
    label: 'Planning',
    title: 'Her Future',
    emphasis: 'Future',
    descriptor: "Autoimmune or not, a woman's future depends on her.",
    href: '/her-future',
    image: 'her-future-desk',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Impact band. Placeholder only. Never invent a number.               */
/* ------------------------------------------------------------------ */

export const impactStats = [
  { label: 'Women reached', value: p('', true, 'Pending', 'Impact stat: women reached.') },
  { label: 'Raised for the work', value: p('', true, 'Pending', 'Impact stat: funds raised.') },
  { label: 'Communities served', value: p('', true, 'Pending', 'Impact stat: communities served.') },
] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Resolve a pending value for display. Returns null when nothing is showable. */
export function resolve<T>(field: Pending<T>): T | string | null {
  if (!field.pending && field.value) return field.value;
  if (field.fallback) return field.fallback;
  return null;
}

/** True when the field should render in placeholder styling. */
export function isPlaceholder<T>(field: Pending<T>): boolean {
  return field.pending || !field.value;
}
