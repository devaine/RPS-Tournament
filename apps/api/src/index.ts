// NOTE: Initialization
import dotenv from "dotenv"
import express from "express"

dotenv.config({ path: ["../../.env"] })

const app = express()
const port = process.env.EXPRESS_PORT


// NOTE: Middleware
app.use(express.json())

// NOTE: Use database router
app.use('/db',)

app.get('/', (req, res) => {
	res.send("Hello World!\n")
})

app.listen(port, () => {
	console.log("[server]: Listening at port " + port + " at http://localhost:" + port)
})
