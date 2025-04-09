import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import helmet from "helmet";
import { PORT, URL, FRONTEND_PORT } from "./config";
import { gameManager } from "./game";
import { contestantManager } from "./contestants";
import { playManager } from "./play";

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
let globalLandingState: string = "Register";

/* NOTE: When there's a connection ("connection") open up listeners
 *	 If "join_event" is true (from client-end) grab data from client
 */
io.on("connection", (socket) => {
  // Functions for handling game and contestants
  gameManager(socket);
  contestantManager(socket, playerCount);
  playManager(socket);

  io.emit("landing_update", globalLandingState);

  socket.on("get_initial_state", () => {
    socket.emit("screen-state-update", globalLandingState);
  });

  socket.on("start_game", async (callback) => {
    globalLandingState = "Game Started";
    io.emit("landing_update", globalLandingState);
  });

  // Handles genuine disconnection (refreshes + crashes etc.)
  socket.on("disconnect", () => {
    console.log("user: " + socket.id + " disconnected!");
  });

  // Fetch data for all sockets in rooms & find their data
  socket.on("contestantList", async (callback) => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const getNames = getSockets.map(function (value) {
      return value.data.name;
    });

    callback(getNames);
  });

  socket.on("playerList", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const getNames = getSockets.map(function (value) {
      return value.data.name;
    });

    callback(getNames);
  });

  socket.on("loserList", async (callback) => {
    const getSockets = await io.in("loser_room").fetchSockets();
    const getNames = getSockets.map(function (value) {
      return value.data.name;
    });

    callback(getNames);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server listening on " + URL + ":" + PORT);
});
