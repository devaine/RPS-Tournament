import { Socket } from "socket.io";
import { type LandingScreen, type GameScreen } from "./config";
import {
  io,
  updateLandingState,
  currentLandingState,
  currentGameState,
  updateGameState,
} from "./index";

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

function gameStateManager(socket: Socket) {
  // Send current state to new connections
  socket.emit("game_update", currentGameState);

  io.emit("game_update", currentGameState);

  socket.on("get_initial_game", () => {
    socket.emit("set_game", currentGameState);
  });

  socket.on("end_game", async () => {
    currentGameState = "End";
    io.emit("game_update", currentGameState);
  });

  // Handle state changes from clients
  socket.on("set_game", (newGame: GameScreen) => {
    // Broadcast to all connected clients
    io.emit("state_update", newGame);
  });
}
