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

import { join } from "path"

// REFERENCES
// Assigning clients with data: https://stackoverflow.com/questions/53602435/assigning-usernames-to-socket-io-ids
// Finding values

/* NOTE: FOR PRODUCTION
 * Instead of a URL + PORT seperately,
 * just create a domain to connect to
 */

const app = express();
const httpServer = createServer(app);

// NOTE: Initializes SocketIO (Server-Side)
export const io = new Server(httpServer, {
  connectionStateRecovery: { maxDisconnectionDuration: 120000 },
  cors: {
    origin: URL,
    methods: ["GET", "POST"],
  },
});

app.use(helmet(), express.json());

app.use(express.static(join(__dirname, "../../frontend/dist")))

// NOTE: Express Stuff, not used yet
app.get("/*", (req, res) => {
	res.sendFile(join(__dirname, "../../frontend/dist/index.html"))
});

var playerCount = 0;

/* NOTE: When there's a connection ("connection") open up listeners
 *	 If "join_event" is true (from client-end) grab data from client
 */
io.on("connection", (socket) => {
  // Functions for handling game and contestants
  gameManager(socket);
  contestantManager(socket, playerCount);
  playManager(socket);
  listManager(socket);
  contextManager(socket);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on " + URL + ":" + PORT);
});
