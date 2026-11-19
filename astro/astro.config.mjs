import { defineConfig } from 'astro/config';

// A minimal Astro site shaped like the developer's real client sites:
// content collections, RU/UK/EN folders, Sveltia at /admin/.
export default defineConfig({
  site: 'https://moonlite-test-pages.pages.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
