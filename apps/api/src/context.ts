import { Socket } from "socket.io";
import { landingScreen, type LandingScreen } from "./config";
import type { GameDecision } from "./config";
import { io } from "./index";

let globalLandingState: string = "Register";

export function contextManager(socket: Socket) {
  landingStateManger(socket);
  decisionStateManager(socket);
}

function landingStateManger(socket: Socket) {
  // Send current state to new connections
  socket.emit("landing_update", landingScreen);

  io.emit("landing_update", globalLandingState);

  socket.on("get_initial_landing", () => {
    socket.emit("landing-state-update", globalLandingState);
  });

  socket.on("start_game", async () => {
    globalLandingState = "Game Started";
    io.emit("landing_update", globalLandingState);
  });

  // Handle state changes from clients
  socket.on("set_landing", (newLanding: LandingScreen) => {
    // Broadcast to all connected clients
    io.emit("state_update", newLanding);
  });
}

// NOTE: not in use, keeping in case of future use
function decisionStateManager(socket: Socket) {
  socket.on("get_initial_decision", () => {
    socket.emit("win");
  });
}
