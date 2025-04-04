import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import helmet from "helmet";

// REFERENCES
// Assigning clients with data: https://stackoverflow.com/questions/53602435/assigning-usernames-to-socket-io-ids
// Finding values

/* NOTE: FOR PRODUCTION
 * Instead of a URL + PORT seperately,
 * just create a domain to connect to
 */

// SERVER VARIABLES
const PORT = 3001;
const FRONTEND_PORT = 5173;
const URL = "http://localhost";

const app = express();
const httpServer = createServer(app);

// NOTE: Initializes SocketIO (Server-Side)
const io = new Server(httpServer, {
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
var contestantList = {};

/* NOTE: When there's a connection ("connection") open up listeners
 *	 If "join_event" is true (from client-end) grab data from client
 */
io.on("connection", (socket) => {
  socket.on("join_event", function (data) {
    console.log("a user " + socket.id + " connected!");
    console.log("playerCount: " + playerCount);
    console.log(data.name + " is the name");
    console.log(data.id + " is the student id");

    // Join a room (participant_room) with all other clients...
    socket.join("contestant_room");

    // Assign the data from emit to socket
    socket.data.name = data.name;
    socket.data.id = data.id;
    playerCount++;
  });

  // NOTE: Listener "leave_event" is for people who
  // press the "Leave Game" button in the UI
  socket.on("leave_event", function (data) {
    if (socket.rooms.has("contestant_room")) {
      socket.leave("contestant_room");
    }

    console.log("a user " + socket.id + " disconnected!");
    console.log("playerCount: " + playerCount);
    console.log(data.name + " is the name");
    console.log(data.id + " is the student id");

    socket.data.name = "placeholder";
    socket.data.id = 1234567;
    playerCount--;
  });

  // Handles genuine disconnection (refreshes + crashes etc.)
  socket.on("disconnect", () => {
    playerCount--;
    console.log("user: " + socket.id + " disconnected!");
    console.log("playerCount: " + playerCount);
  });

  // Fetch data for all sockets in contestant_room & find their data
  socket.on("contestantCount", async (callback) => {
    const contestant_sockets = await io.in("contestant_room").fetchSockets();
    const contestant_names = contestant_sockets.map(function (value) {
      return value.data.name;
    });

    callback(contestant_names);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server listening on " + URL + ":" + PORT);
});
