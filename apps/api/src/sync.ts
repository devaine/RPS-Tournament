import { Socket } from "socket.io";
import { io, emptyReadyArray, readyArray } from "./index";

/* NOTE: This file:
 * Waits for two chosen players to press the "ready" button from the frontend.
 * If there is a tie, or consecutive ties, then it is also handled here.
 */

// TODO: Update, retrySync is removed, will work on doing that once
// RPS functionality is finished for sending/recieving messages.

// Ready counter for any intial game with two players

export function syncClient(socket: Socket) {
  // NOTE: Listens to two clients in "game_room", after both have called on this listener
  // (a.k.a pressed the "Ready" button), backend emits a listener on the frontend
  // this helps for "synchronization" for both clients
  socket.on("playerReady", async () => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];

    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    readyArray.push(socket.id);

    if (readyArray.length === 2) {
      io.to(String(listSockets[0])).emit("updateGameState", "Play");
      io.to(String(listSockets[1])).emit("updateGameState", "Play");
      emptyReadyArray();
    } else {
      null;
    }
  });
}
