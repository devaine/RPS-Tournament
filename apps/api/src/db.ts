import express from "express"
import { Client, Query, Pool } from "pg"
import dotenv from "dotenv" 

dotenv.config({ path: ["../../.env"]})

// NOTE: Client Information and Connection
const pool = new Pool({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
})
pool.connect();


