// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';

// astro.config runs before Vite loads .env, so read it explicitly here.
// PUBLIC_SITE_URL drives canonical tags, the sitemap, Open Graph URLs and
// robots.txt. Change it in .env when the real domain goes live.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE = PUBLIC_SITE_URL || 'https://stillherfoundation.org';

export default defineConfig({
  site: SITE,
  output: 'static',
  // Must match "html_handling": "drop-trailing-slash" in wrangler.jsonc.
  // The Worker serves /about and redirects /about/, so the canonical tag and
  // every sitemap entry have to be the slashless form too.
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
