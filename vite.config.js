import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path for the GitHub Pages project site:
// https://zabeeh-ullah-dev.github.io/FixNear/
export default defineConfig({
  plugins: [react()],
  base: '/FixNear/',
});
