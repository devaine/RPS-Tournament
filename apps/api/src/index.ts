import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import helmet from "helmet";
import { PORT, URL, FRONTEND_PORT } from "./config";
import { gameManager } from "./game";
import { contestantManager } from "./contestants";

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
    origin: URL + ":" + FRONTEND_PORT, // References Frontend
    methods: ["GET", "POST"],
  },
});

app.use(helmet(), express.json());

// NOTE: Express Stuff, not used yet
app.get("/", (req, res) => {
  res.json("hello");
});

var playerCount = 0;

/* NOTE: When there's a connection ("connection") open up listeners
 *	 If "join_event" is true (from client-end) grab data from client
 */
io.on("connection", (socket) => {
  // Functions for handling game and contestants
  gameManager(socket);
  contestantManager(socket, playerCount);

  // Handles genuine disconnection (refreshes + crashes etc.)
  socket.on("disconnect", () => {
    playerCount--;
    console.log("user: " + socket.id + " disconnected!");
    console.log("playerCount: " + playerCount);
  });

  // Fetch data for all sockets in contestant_room & find their data
  socket.on("contestantCount", async (callback) => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const getNames = getSockets.map(function (value) {
      return value.data.name;
    });

    callback(getNames);
  });
	
	// FOR ADMIN PAGE
	// Fetch all socket ids 
	socket.on("startRound", async (callback) => {
		const getSockets = await io.in("contestant_room").fetchSockets()
		const getIDs = getSockets.map(function (value) {
			return value.id; // IDs of the sockets
		})
		callback(getIDs)

		function randomNumber(min: number, max: number) {
			return Math.floor(Math.random() * (max - min) + min);
		}

		console.log(randomNumber(0, getSockets.length))
	})
});

httpServer.listen(PORT, () => {
  console.log("Server listening on " + URL + ":" + PORT);
});
