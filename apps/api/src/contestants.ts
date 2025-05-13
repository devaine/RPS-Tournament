import { Socket } from "socket.io";
import { io } from "./index";

// NOTE: This file helps handle contestant movement between rooms

export function contestantHandler(socket: Socket) {
	// NOTE: Listener "join_event" is for people who are joining the event
	// for the first fime (it can also be for rejoins)
	socket.on("join_event", async function(data) {
		if (!socket.rooms.has("contestant_room")) {
			socket.join("contestant_room")

			// Assign the data from emit to socket
			socket.data.name = data.name;
			socket.data.id = data.id;
			socket.data.avatar = data.avatar;

			const fetchSockets = await io.in("contestant_room").fetchSockets();
			const socketList: string[] = [];

			// Sends all socket ids into socketList
			for (const socket of fetchSockets) {
				socketList.push(socket.data.name);
			}

			console.log(socket.data.name + " has joined \"contestant_room\" ")
			console.log("active players: " + socketList + "\n")
		}
	});

	// NOTE: Listener "leave_event" is for people who
	// press the "Leave Game" button in the UI
	socket.on("leave_event", function(data) {
		if (socket.rooms.has("contestant_room")) {
			socket.leave("contestant_room");
		}

		console.log("a user " + socket.id + " left the event!");
		console.log(data.name + " is the name");
		console.log(data.id + " is the student id");

		socket.disconnect();
	});

	// Handles genuine disconnection (refreshes + crashes etc.)
	socket.on("disconnect", () => {
		console.log("user: " + socket.id + " disconnected!");
	});

}
