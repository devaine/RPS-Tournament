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
  playerStateManager(socket);
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

// FOR: game-context.tsx & protected-routes.tsx
function gameStateManager(socket: Socket) {
  // Send current state to new connections
  socket.on("endGame", async () => {
    console.log("listener endgame ping");
    updateGameState("End");
    io.emit("updateGameState", currentGameState);
  });

  // For protected-routes.tsx for "End"-ing the game.
  socket.on("getGameState", (callback) => {
    callback(currentGameState);
  });
}

// FOR player-context.tsx AND lobby-context.tsx
function playerStateManager(socket: Socket) {
  socket.on("player_join", async (data) => {
    // Assign the data from emit to socket
    socket.data.name = data.name;
    socket.data.id = data.id;
    socket.data.avatar = data.avatar;

    socket.join("game_room");
  });
}

export function lobbyStateManger(id: string, chosenStatus: LobbyScreen) {
  io.to(id).emit("updateLobbyState", chosenStatus);
}
