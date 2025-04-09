import { Socket } from "socket.io";
import { type RemoteSocket, type DefaultEventsMap } from "socket.io"
import { io } from "./index";

var decisionCount = 0;

export function playManager(socket: Socket) {
  socket.on("play", async (arg: string, callback) => {
		decisionCount = decisionCount + 1

    const getSockets = await io.in("game_room").fetchSockets();
    const listPlayers: string[] = [];
    const getIDs = getSockets.forEach(function(value) {
			listPlayers.push(value.id)
		})

		getIDs

		// Secures the choice in client data
		console.log(socket.id)
		socket.data.choice = arg

		if(decisionCount === 2) {
			const player1ID = String(listPlayers[0])
			const player2ID = String(listPlayers[1])

			console.log(player1ID)
			console.log(player2ID)


			socket.emit("gameResult", "testeste")

			decisionCount = 0
		} else {
			null
		}


   // if (socket.id == winner) {
   //   io.to(winner).emit("game_outcome", "YOU WON !!!"); // Emits decision to show who won and who lost
	 // 	io.to(winner).socketsJoin("contestant_room")
	 // 	io.to(winner).socketsLeave("game_room")
   // } else if (socket.id == loser) {
	 // 	io.to(loser).emit("game_outcome", "YOU LOSE !!!");
	 // 	io.to(loser).socketsLeave("game_room")
	 // 	io.to(loser).socketsJoin("loser_room")
   // }
  });
}

function decideWinner( player1: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined, player2: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined ): Promise<string[]> {
  // NOTE: Check if player1 and player2 exist because (like findSocket)
  // they can possibly not exist, also check if `choice` is undefined (as in
  // undecided)
	var orderOfWin: string[] = []

  if (
    !player1 ||
    !player2 ||
    player1.data.choice === undefined ||
    player2.data.choice === undefined
  )

  // Actual game logic, probably sucks compared to other implementations but who cares
  if (player1 && player2) { // Ties
		if (player1.data.choice === player2.data.choice) {
			player1.data.choice = undefined
			player2.data.choice = undefined
			tieSend(player1, player2)
		}
		else if (
			(player1.data.choice === "rock" && player2.data.choice === "scissors") ||
			(player1.data.choice === "paper" && player2.data.choice === "rock") ||
			(player1.data.choice === "scissors" && player2.data.choice === "paper")
		) {
			orderOfWin.push(player1.id)
			orderOfWin.push(player2.id)

			player1.data.choice = undefined
			player2.data.choice = undefined
			console.log(orderOfWin)

			return orderOfWin
		} else {
			orderOfWin.push(player2.id)
			orderOfWin.push(player1.id)

			player1.data.choice = undefined
			player2.data.choice = undefined

			console.log(orderOfWin)
			return orderOfWin
		}
	}
	return []
}

function tieSend(player1: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined, player2: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined ) {
		if (player1 && player2) {
			io.to(player1.id).emit("game_outcome", "YOU TIED !!!")
			io.to(player2.id).emit("game_outcome", "YOU TIED !!!")

	}
}
