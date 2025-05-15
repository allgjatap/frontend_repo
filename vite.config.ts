import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  envPrefix: 'REACT_',
  plugins: [tsconfigPaths(), react(), splitVendorChunkPlugin(), svgr()],
});
