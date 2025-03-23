import { defineConfig } from "vite";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

dotenv.config({ path: ["./src/config/.env"] });

export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  server: {
    //port: Number(process.env.VITE_PORT) // Converted into a number
    port: Number(process.env.VITE_PORT),
  },
});
