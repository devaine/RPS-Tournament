import { Socket } from "socket.io";
import { io } from "./index";

export function gameManager(socket: Socket) {
  // FOR ADMIN PAGE
  // Fetch all socket ids
	let readyCount = 0

	// FOR ADMIN PAGE
	// Fetch all socket ids 
	//
	// NOTE: Fetches sockets and move sthem to "game_room"
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

    // Sends all socket ids into a array
    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    const player = listSockets[randomNumber(0, getSockets.length)];

    io.to(String(player)).socketsJoin("game_room");
    io.to(String(player)).socketsLeave("contestant_room");

    // FIX: Can't put second player in queue

    // const player2 = listSockets[randomNumber(0, getSockets.length)]
    //
    // io.to(String(player2)).socketsJoin("game_room")
    // io.to(String(player2)).socketsLeave("contestant_room")

  });



	// NOTE: Removes Players
  socket.on("removePlayer", async (callback) => {
   // const getSockets = await io.in("game_room").fetchSockets();
   // const listSockets: string[] = [];

   // function randomNumber(min: number, max: number) {
   //   return Math.floor(Math.random() * (max - min) + min);
   // }

   // // Sends all socket ids into a array
   // for (const socket of getSockets) {
   //   listSockets.push(socket.id);
   // }

   // const player = listSockets[randomNumber(0, getSockets.length)];
   // io.to(String(player)).socketsLeave("game_room");
   // io.to(String(player)).socketsJoin("contestant_room");

   // const check = await io.in("game_room").fetchSockets();
   // const list = check.map(function (data) {
   //   console.log(data.id);
   //   return data.id;
   // });

   // callback(list);
  });

	socket.on("playerReady", async (callback) => {
		const getSockets = await io.in("game_room").fetchSockets()
		const listSockets: string[] = []
	
		for(const socket of getSockets) {
			listSockets.push(socket.id)
		}

		console.log(io.listeners("playerReady").length)


		if(io.listeners("playerReady").length === 2) {
			console.log('KJFEJAFOHADOFASFJAFJSF')
			callback("Play")
		}
	}
)}


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
