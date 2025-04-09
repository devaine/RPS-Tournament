import { Socket } from "socket.io";
import { type RemoteSocket, type DefaultEventsMap } from "socket.io"
import { io } from "./index";

var count = 0;

export function playManager(socket: Socket) {
  // Listens to Client Choice
  socket.on("setChoice", (arg) => {
    socket.data.choice = arg;
    console.log(socket.data.choice);
  });

  socket.on("play", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listPlayers: string[] = [];
    const getIDs = getSockets.map(function (value) {
      listPlayers.push(value.id)
    }); getIDs

		count++

		const player1 = io.sockets.sockets.get(String(listPlayers[0]))
		const player2 = io.sockets.sockets.get(String(listPlayers[1]))

		if(count == 2) {
			const winnerList: any = async () => {
				return decideWinner(player1, player2) // socket id
			}

			// Checks for ties
			if (player1?.data.choice === player2?.data.choice){
				if(player1 && player2) {
					player1.data.choice = undefined
					player2.data.choice = undefined
					tieSend(player1, player2)
				}
			}
		}


    if (socket.id == winner) {
      io.to(winner).emit("game_outcome", "YOU WON !!!"); // Emits decision to show who won and who lost
			io.to(winner).socketsJoin("contestant_room")
			io.to(winner).socketsLeave("game_room")
    } else if (socket.id == loser) {
			io.to(loser).emit("game_outcome", "YOU LOSE !!!");
			io.to(loser).socketsLeave("game_room")
			io.to(loser).socketsJoin("loser_room")
    }
  });
}

function decideWinner( player1: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined, player2: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined ) {
  // NOTE: Check if player1 and player2 exist because (like findSocket)
  // they can possibly not exist, also check if `choice` is undefined (as in
  // undecided)
	var orderOfWin: string[] = []

  if (
    !player1 ||
    !player2 ||
    player1.data.choice === undefined ||
    player2.data.choice === undefined
  ) {
    return "";
  }

  // Actual game logic, probably sucks compared to other implementations but who cares
  if (player1.data.choice === player2.data.choice) {
    return "";
  } else if (
    (player1.data.choice === "rock" && player2.data.choice === "scissors") ||
    (player1.data.choice === "paper" && player2.data.choice === "rock") ||
    (player1.data.choice === "scissors" && player2.data.choice === "paper")
  ) {

		orderOfWin.push(player1.id)
		orderOfWin.push(player2.id)

		player1.data.choice = undefined
		player2.data.choice = undefined

    return orderOfWin
  } else {
		orderOfWin.push(player2.id)
		orderOfWin.push(player1.id)

		player1.data.choice = undefined
		player2.data.choice = undefined

    return orderOfWin
  }
}

function tieSend(player1: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined, player2: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined ) {
		if (player1 && player2) {
			io.to(player1.id).emit("game_outcome", "YOU TIED !!!")
			io.to(player2.id).emit("game_outcome", "YOU TIED !!!")

	}
}
