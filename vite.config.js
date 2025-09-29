const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig({
  plugins: [react()],
  base: "/map-brif/", // Репозиторий: IlyaSkach/map-brif
  server: {
    port: 3002,
    open: true,
  },
});
