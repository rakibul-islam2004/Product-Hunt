import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Ensuring proper headers to handle Cross-Origin-Opener-Policy issues
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    host: true, // Allow access from network (useful for testing on other devices)
    port: 5173, // Default Vite development port
  },
  define: {
    "process.env": {}, // Polyfill for process.env in Vite
  },
});
