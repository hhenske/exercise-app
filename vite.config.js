import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // React plugin goes at the top level
  server: {
    proxy: {
      "/api": {
        target: "https://v2.exercisedb.dev/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

