// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical origin — used by Astro for sitemap / RSS / canonical URLs.
  // Custom domain is wired through `public/CNAME`, which Astro copies into
  // the build output so GitHub Pages preserves the ayden.ai binding.
  site: 'https://ayden.ai',
  vite: {
    plugins: [tailwindcss()]
  }
});