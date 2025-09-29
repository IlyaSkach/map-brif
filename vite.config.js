const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  base: "/", // Для Netlify используем корневой путь
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
