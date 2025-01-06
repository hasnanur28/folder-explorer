import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to the src directory
    },
  },
  server: {
    proxy: {
      "/folders": {
        target: "http://localhost:3000", // Replace with your API URL
        changeOrigin: true,
      },
    },
  },
});
