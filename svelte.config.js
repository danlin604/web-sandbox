import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import dotenv from 'dotenv';

// Detect mode from process.argv
const modeIndex = process.argv.indexOf('--mode');
const mode = modeIndex !== -1 ? process.argv[modeIndex + 1] : null;

// Load environment file based on mode
if (mode === 'github') {
  dotenv.config({ path: '.env.github' });
} else {
  dotenv.config({ path: '.env' }); // or just dotenv.config() for default
}

const config = {
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],
  kit: {
    adapter: adapter({
      fallback: '404.html',
      pages: process.env.BUILD_OUTPUT_DIRECTORY || 'build',
    }),
    paths: {
        base: process.env.BASE_PATH || '',
    },
  },
  extensions: ['.svelte', '.svx', '.md'],
};

export default config;