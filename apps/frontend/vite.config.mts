import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path";

// Try-catch for the environmental file, if not found, continue on...
try {
	process.loadEnvFile("../../.env")
} catch (error) {
	console.log("Env file not found!\n" + error)
}

export default defineConfig({
	plugins: [tsconfigPaths(), react(), tailwindcss()],
	build: {
		rollupOptions: {
			input: {
				app: resolve(__dirname, "index.html")
			}
		}
	},
	// Defines envrionmental files across all src code b/c prefix is usually "VITE"
	define: {
		'import.meta.env.DEV_URL': JSON.stringify(process.env.DEV_URL),
		'import.meta.env.PROD_URL': JSON.stringify(process.env.PROD_URL)
	}
});
