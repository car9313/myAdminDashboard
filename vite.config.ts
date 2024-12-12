import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Carpeta de salida
    sourcemap: false, // Deshabilitar mapas de código fuente
    minify: "esbuild", // Minificación eficiente con esbuild
    cssCodeSplit: true, // Dividir CSS para carga más eficiente
    rollupOptions: {
      output: {
        manualChunks: {
          // Dividir dependencias grandes en chunks separados
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    port: 3001, // Cambia el puerto si es necesario
  },
});
