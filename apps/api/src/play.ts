import { Socket } from "socket.io";
import { io } from "./index";

// NOTE: This serves actual game functionality of Rock-Paper-Scissors

var decisionCount = 0;
var playerArray: string[] = [];

export function playRPS(socket: Socket) {
	// NOTE: Listens to input of choices for RPS & emits results to clients
	socket.on("Play", async (choice: string) => {
		decisionCount++;
		socket.data.choice = choice;

		// Waits until both players have made their choice
		if (decisionCount === 2) {
			const getSockets = await io.in("game_room").fetchSockets();

			for (let players of getSockets) {
				playerArray.push(String(players.id)); // Gets IDs for both players
			}

			// Socket Objects
			// Gets the socket based off ID
			const player1_socket = io.of("/").sockets.get(String(playerArray[0]));
			const player2_socket = io.of("/").sockets.get(String(playerArray[1]));

			// Determines winner and loser and socket movement to rooms
			await determine(player1_socket, player2_socket);

			// Debugging
			console.log(player1_socket?.data.status + " is " + player1_socket?.id);
			console.log(player2_socket?.data.status + " is " + player2_socket?.id);

			if (player1_socket && player2_socket) {
				// Send results with a small delay (prevent bugs)
				setTimeout(() => {
					player1_socket.emit("gameResult", player1_socket?.data.status);
					player2_socket.emit("gameResult", player2_socket?.data.status);
				}, 100);
			}

			// Cleanup, empty everything
			decisionCount = 0;
			playerArray = [];
		}
	});
}

// NOTE: Functionality of Rock-Paper-Scissors with movement to rooms respective to
// whether they won or lost
async function determine(
	player1: Socket | undefined,
	player2: Socket | undefined,
): Promise<void> {
	if (player1 && player2) {
		if (player1.data.choice === player2.data.choice) {
			player1.data.status = "tie";
			player2.data.status = "tie";
			console.log("tie");
		} else if (
			(player1.data.choice === "rock" && player2.data.choice === "scissors") ||
			(player1.data.choice === "paper" && player2.data.choice === "rock") ||
			(player1.data.choice === "scissors" && player2.data.choice === "paper")
		) {
			player1.data.status = "winner";
			player2.data.status = "loser";
			console.log(player1.id + " player1 win");

			player1.join("contestant_room");
			player2.join("loser_room");

			player1.leave("game_room");
			player2.leave("game_room");
		} else {
			player1.data.status = "loser";
			player2.data.status = "winner";
			console.log(player2.id + " player2 win");

			player1.join("loser_room");
			player2.join("contestant_room");

			player1.leave("game_room");
			player2.leave("game_room");
		}
	}
}
