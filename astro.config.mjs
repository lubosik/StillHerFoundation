// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The domain is not purchased yet. Update `site` once stillherfoundation.org is live.
const SITE = process.env.PUBLIC_SITE_URL || 'https://stillherfoundation.org';

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
