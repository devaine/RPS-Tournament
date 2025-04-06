import { Socket } from "socket.io";

export function gameManager(socket: Socket) {
  socket.on("join_game_room", () => {});
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
