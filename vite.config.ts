import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // Main HTML file
        background: path.resolve(__dirname, "src/background.ts"), // Background script
        content: path.resolve(__dirname, "src/content.ts"), // Content script
      },
      output: {
        entryFileNames: "[name].js", // Use [name] to set the file name to what you specify
        format: "esm", // Optional: Specify the format if needed
      },
    },
  },
  plugins: [react()],
});
