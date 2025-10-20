import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import auth from "auth-astro";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [db(), auth(), react()],
  output: "server",
  adapter: netlify({
    // Ensure we're not targeting Netlify Edge Functions runtime
    edge: false,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  compilerOptions: {
    jsx: "react-jsx",
    jsxImportSource: "react",
  },
});
