import { Socket } from "socket.io";
import { io } from "./index";

export function gameManager(socket: Socket) {
  socket.on("end_game", async (callback) => {
    const contestant_sockets = await io.in("contestant_room").fetchSockets();
    const contestand_count = contestant_sockets.length;

    if (contestand_count <= 3) {
      return "End";
    }
  });
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
