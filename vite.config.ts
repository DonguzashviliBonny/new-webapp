/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as path from "path";
import react from "@vitejs/plugin-react";
import sass from "sass";
import svgr from "vite-plugin-svgr";
import compress from "vite-plugin-compression";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    compress({
      ext: ".gz", // Use gzip
      algorithm: "gzip",
      threshold: 10240, // Only compress files larger than 10kb
      filter: /\.(js|css|html|ttf|otf|eot|woff|woff2)$/,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["react"],
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("Select") || id.includes("Inputs")) {
            return "reusables";
          }
        },
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "dist/"], // Exclude build directory and node_modules
      include: ["src/**/*.ts", "src/**/*.tsx"],
    },
  },
});
