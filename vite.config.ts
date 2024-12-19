import { defineConfig } from "vite"
import 'dotenv/config'

export default defineConfig({
	server: {
		port: Number(process.env.VITE_PORT) // Converted into a number
	}
})
