import { defineConfig } from "vite";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// dotenv.config({ path: ["./src/config/.env"] });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
		host: true,
		allowedHosts: [".localhost", "rps-cicd.devdoes.work"],
		port: 5173,
  },
});
