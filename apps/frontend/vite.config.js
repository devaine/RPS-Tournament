import { defineConfig } from "vite";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// dotenv.config({ path: ["./src/config/.env"] });

export default defineConfig({
	build: {
		rollupOptions: {
			external: ["react", "react-dom"]
		}
	},
  plugins: [tsconfigPaths(), react()],
  server: {
		port: 5173,
		host: true,
		allowedHosts: ["rps-cicd.devdoes.work"]
  },
});
