/* INFO: This file:
 * Initializes socket.io and the components available in src/
 * Statically links built frontend code to backend code
 * Starts HTTP server when deployed to prod / when started by turbo
 */

// COMPONENT IMOPRTS
import { playRPS } from "./play";
import { syncClient } from "./sync";
import { contestantHandler } from "./contestants";
import { dashboardManager } from "./list";
import { contextManager } from "./context";
import { admin } from "./admin";
import { LandingScreen, GameScreen, PORT, URL, type User } from "./config";

// PACKAGE IMPORTS
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { join } from "path";

// REFERENCES
// Assigning clients with data: https://stackoverflow.com/questions/53602435/assigning-usernames-to-socket-io-ids

const app = express();
const httpServer = createServer(app);

// Initializes SocketIO (Server-Side)
export const io = new Server(httpServer, {
  cors: {
    origin: URL,
  },
  connectionStateRecovery: { maxDisconnectionDuration: 120000 },
});

// Statically use the built code from Vite from the Frontend
app.use(express.static(join(__dirname, "../../frontend/dist")));
app.get("/*", (req, res) => {
  // Handles the HTML file across the entire website
  res.sendFile("index.html", { root: "../frontend/dist" });
});

// SocketIO Main Initialization
io.on("connection", (socket) => {
  console.log(socket.id + " has connected to the server!");

  // Initializes Components
  syncClient(socket);
  contestantHandler(socket);
  playRPS(socket);
  contextManager(socket);
  admin(socket);
  dashboardManager(socket);
});

// Uses `config.ts` to host backend.
httpServer.listen(PORT, () => {
  console.log("Server listening on " + URL);
  console.log(URL + " is the url");
  console.log(PORT + " is the port");
});

// EXPORTS

// CONTEXT EXPORTS
// Initial state of the landing page
export let currentLandingState: LandingScreen = "Register";

// Mutator method for changing the variable of currentLandingState across backend code
export const updateLandingState = (newState: LandingScreen) => {
  currentLandingState = newState;
};

// Initial state of the <Game/> page, not to be confused with
export let currentGameState: GameScreen = "Lobby";

// Mutator method for changing the variable of currentGameState across backend code
// Options: ("Lobby" | "Play" | "Decision" | "End" | "Ready")
export const updateGameState = (newState: GameScreen) => {
  currentGameState = newState;
};

// This array will determines is both players are ready,
// the syncronization functionality, and if there is a need
// for a player to be removed.
export let readyArray: string[] = [];

export const emptyReadyArray = () => {
  readyArray = [];
};

// Winner ID
export let thirdWinnerID: string = "";
export let secondWinnerID: string = "";
export let firstWinnerID: string = "";

export const updateID = (id: string, placement: number) => {
  switch (placement) {
    case 1:
      firstWinnerID = id;
      break;

    case 2:
      secondWinnerID = id;
      break;

    case 3:
      thirdWinnerID = id;
      break;

    default:
      break;
  }
};

// Winners Array
export let winnersArray: User[] = [];

export const updateWinnersArray = (newWinnersArray: User[]) => {
  winnersArray = newWinnersArray;
};

// Losers Array
export let losersArray: User[] = [];

export const updateLosersArray = (newLosersArray: User[]) => {
  losersArray = newLosersArray;
};
