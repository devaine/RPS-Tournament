import { Socket } from "socket.io";
import { io } from "./index"

export function gameManager(socket: Socket) {

	// FOR ADMIN PAGE
	// Fetch all socket ids 
	socket.on("startRound", async (callback) => {
		const getSockets = await io.in("contestant_room").fetchSockets()
		const listSockets: string[] = []
	
		function randomNumber(min: number, max: number) {
			return Math.floor(Math.random() * (max - min) + min);
		}
	
		// Sends all socket ids into a array
		for(const socket of getSockets) {
			listSockets.push(socket.id)
		}

		const player1 = listSockets[randomNumber(0, getSockets.length)]
		const player2 = listSockets[randomNumber(0, getSockets.length)]


	})
}



function decideWinner(choice1: string, choice2: string) {
  if (choice1 === choice2) {
    return "tie";
  } else if (
    (choice1 === "rock" && choice2 === "scissors") ||
    (choice1 === "paper" && choice2 === "rock") ||
    (choice1 === "scissors" && choice2 === "paper")
  ) {
    return "player1";
  } else {
    return "player2";
  }
}
