import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.callums.blog",
  experimental: {
    assets: true
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  integrations: [sitemap()]
});