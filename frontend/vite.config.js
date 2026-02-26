import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    proxy: {
      "/api": {
        target: "https://blog-application-with-ai-content.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
