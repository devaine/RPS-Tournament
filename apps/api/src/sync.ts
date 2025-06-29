import { Socket } from "socket.io";
import { io } from "./index";

/* NOTE: This file:
 * Waits for two chosen players to press the "ready" button from the frontend.
 * If there is a tie, or consecutive ties, then it is also handled here.
 */

// HACK: Alright this looks a little funky
// - The retryCount probably should not exist, could work without it perhaps.
// - Considering this file waits for chosen people to pick their choices
// perhaps we can try to modulate it for not only when players are ready,
// but for the RPS game itself.

// Ready counter for any intial game with two players
var readyCount = 0;
// Ready counter for any secondary or teriary game with two of the same players
var retryCount = 0;

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

    readyCount++;

    if (readyCount === 2) {
      io.to(String(listSockets[0])).emit("gameSync", "Play");
      io.to(String(listSockets[1])).emit("gameSync", "Play");
      readyCount = 0;
    } else {
      null;
    }
  });

  // NOTE: Same as the "playerReady" listener, but only serves for ties.
  socket.on("readyAgain", async () => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];

    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    retryCount++;

    if (retryCount === 2) {
      io.to(String(listSockets[0])).emit("retrySync", "Play");
      io.to(String(listSockets[1])).emit("retrySync", "Play");
      retryCount = 0;
    } else {
      null;
    }
  });
}
