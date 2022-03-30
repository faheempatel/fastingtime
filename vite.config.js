import { defineConfig } from 'vite';
import createReScriptPlugin from '@jihchi/vite-plugin-rescript';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createReScriptPlugin()]
});
