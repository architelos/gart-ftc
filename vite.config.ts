import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "!": __dirname
    }
  },

  // please be worth it :(
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        // bundle the actual service worker
        "avif-sw": resolve(
          __dirname,
          "node_modules/avif.js/avif-sw.js"
        )
      },

      output: {
        entryFileNames: chunk => {
          if (chunk.name === "avif-sw") return "avif-sw.js";
          // default chunk naming for others
          return "[name].[hash].js";
        }
      }
    }
  }
});
