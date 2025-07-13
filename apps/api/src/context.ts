import { Socket } from "socket.io";
import {
  io,
  updateLandingState,
  currentLandingState,
  currentGameState,
  updateGameState,
} from "./index";
import { type LobbyScreen } from "./config";

export function contextManager(socket: Socket) {
  landingStateManager(socket);
  gameStateManager(socket);
}

// FOR: landing-context.tsx
function landingStateManager(socket: Socket) {
  socket.on("getLandingState", (callback) => {
    callback(currentLandingState);
  });

  // When the game has started, update landing state for all clients
  socket.on("startGame", () => {
    updateLandingState("Game Started");
    io.emit("updateLandingState", currentLandingState);
    console.log(currentLandingState + " - Backend");
  });
}

// FOR: game-context.tsx
function gameStateManager(socket: Socket) {
  // Send current state to new connections
  socket.on("endGame", async () => {
    console.log("listener endgame ping");
    updateGameState("End");
    io.emit("updateGameState", currentGameState);
  });
}

// FOR player-context.tsx
function playerStateManager(socket: Socket) {}

export function lobbyStateManger(id: string, chosenStatus: LobbyScreen) {
  io.to(id).emit("updateLobbyState", chosenStatus);
}
