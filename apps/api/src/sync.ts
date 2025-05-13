import { Socket } from "socket.io";
import { io } from "./index";

// NOTE: This file serves for SYNCHRONIZING clients from this backend.

var count = 0;
var retryCount = 0;

export function syncClient(socket: Socket) {
	// NOTE: Listens to two glients in "game_room", after both have called on this listener
	// (a.k.a pressed the "Ready" button), backend emits a listener on the frontend 
	// this helps for "synchronization" for both clients
	socket.on("playerReady", async () => {
		const getSockets = await io.in("game_room").fetchSockets();
		const listSockets: string[] = [];

		for (const socket of getSockets) {
			listSockets.push(socket.id);
		}

		count++;

		if (count === 2) {
			io.to(String(listSockets[0])).emit("gameSync", "Play");
			io.to(String(listSockets[1])).emit("gameSync", "Play");
			count = 0;
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
