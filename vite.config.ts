import { defineConfig } from "vite"
import dotenv from 'dotenv'

dotenv.config({ path: ['./src/config/.env']})

export default defineConfig({
	server: {
		//port: Number(process.env.VITE_PORT) // Converted into a number
		port: Number(process.env.VITE_PORT)
	}
})
