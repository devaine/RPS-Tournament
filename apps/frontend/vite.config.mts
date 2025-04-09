import { defineConfig } from "vite";
//import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path";

//dotenv.config({ path: ["./src/config/.env"] });

export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
	build: {
		rollupOptions: {
			input : {
				app: resolve(__dirname, "src/main.js")
			}
		}
	}
});
