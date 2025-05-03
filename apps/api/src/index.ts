import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import helmet from "helmet";
import { PORT, URL } from "./config";
import { gameManager } from "./game";
import { contestantManager } from "./contestants";
import { playManager } from "./play";
import { listManager } from "./list";
import { contextManager } from "./context";

import { join } from "path";

// REFERENCES
// Assigning clients with data: https://stackoverflow.com/questions/53602435/assigning-usernames-to-socket-io-ids
// Finding values

const app = express();
const httpServer = createServer(app);

// Initializes SocketIO (Server-Side)
export const io = new Server(httpServer, {
	cors: {
		origin: URL
	},
	connectionStateRecovery: { maxDisconnectionDuration: 120000 },
});

app.use(express.json());

// NOTE: Statically use the built code from Vite from the Frontend
app.use(express.static(join(__dirname, "../../frontend/dist")));
app.get("/*", (req, res) => {
	// Handles the HTML file across the entire website
	res.sendFile(__dirname + "../../frontend/dist/index.html");
});

var playerCount = 0;

// NOTE: SocketIO Main Initialization
io.on("connection", (socket) => {
	// Functions for handling game and contestants
	gameManager(socket);
	contestantManager(socket, playerCount);
	playManager(socket);
	listManager(socket);
	contextManager(socket);
});

httpServer.listen(PORT, () => {
	console.log("Server listening on " + URL);
	console.log(URL + " is the url")
	console.log(PORT + " is the port")
});
