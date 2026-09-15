// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The domain is not purchased yet. Update `site` once stillherfoundation.org is live.
const SITE = process.env.PUBLIC_SITE_URL || 'https://stillherfoundation.org';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
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
