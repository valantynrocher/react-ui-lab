/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Permet d'importer par ex. import X from '@/components/X'
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    global: "globalThis",
  },
  server: {
    port: 3000,
    // Port local par défaut
    open: true, // Ouvre automatiquement dans le navigateur
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
