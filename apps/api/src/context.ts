import { Socket } from "socket.io";
import { type LandingScreen, type GameScreen } from "./config";
import type {} from "./config";
import { io } from "./index";

let globalLandingState: LandingScreen = "Register";
let globalGameState: GameScreen = "Waiting";

export function contextManager(socket: Socket) {
  landingStateManager(socket);
  gameStateManager(socket);
}

function landingStateManager(socket: Socket) {
  // Send current state to new connections
  socket.emit("landing_update", globalLandingState);

  io.emit("landing_update", globalLandingState);

  socket.on("get_initial_landing", () => {
    socket.emit("set_landing", globalLandingState);
  });

  socket.on("start_game", async () => {
    globalLandingState = "Game Started";
    io.emit("landing_update", globalLandingState);
  });

  // Handle state changes from clients
  socket.on("set_landing", (newLanding: LandingScreen) => {
    // Broadcast to all connected clients
    io.emit("landing_update", newLanding);
  });
}

function gameStateManager(socket: Socket) {
  // Send current state to new connections
  socket.emit("game_update", globalGameState);

  io.emit("game_update", globalGameState);

  socket.on("get_initial_game", () => {
    socket.emit("set_game", globalGameState);
  });

  socket.on("end_game", async () => {
    globalGameState = "End";
    io.emit("game_update", globalGameState);
  });

  // Handle state changes from clients
  socket.on("set_game", (newGame: GameScreen) => {
    // Broadcast to all connected clients
    io.emit("state_update", newGame);
  });
}
