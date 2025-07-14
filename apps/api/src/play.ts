import { Socket } from "socket.io";
import { io } from "./index";
import { sendListsAnyway } from "./list";

/* NOTE: This file:
 * Serves actual game functionality of Rock-Paper-Scissors
 * And does the handing of player ID's and player movement
 * based off the determine() method.
 */

var decisionCount = 0;
var playerArray: string[] = [];

export function playRPS(socket: Socket) {
  // NOTE: Listens to input of choices for RPS & emits results to clients
  socket.on("Play", async (choice: string) => {
    decisionCount++;
    socket.data.choice = choice;

    // Waits until both players have made their choice
    if (decisionCount === 2) {
      // Determines winner and loser and socket movement to rooms
      await getPlayerIDs();
      await determine();

      // Updates the lists.
      sendListsAnyway();

      // Cleanup, empty everything
      decisionCount = 0;
      playerArray = [];
    }
  });
}

async function getPlayerIDs() {
  const getSockets = await io.in("game_room").fetchSockets();
  for (let players of getSockets) {
    playerArray.push(String(players.id));
  }
}

// NOTE: Functionality of Rock-Paper-Scissors with movement to rooms respective to
// whether they won or lost or if they tied.
async function determine() {
  const player1 = io.of("/").sockets.get(String(playerArray[0]));
  const player2 = io.of("/").sockets.get(String(playerArray[1]));

  if (player1 && player2) {
    // Handles ties.
    if (player1.data.choice === player2.data.choice) {
      player1.data.status = "Tie";
      player2.data.status = "Tie";

      player1.emit("decisionResult", player1.data.status);
      player2.emit("decisionResult", player2.data.status);
    } else if (
      // Handles winners and losers on both ends.
      (player1.data.choice === "Rock" && player2.data.choice === "Scissors") ||
      (player1.data.choice === "Paper" && player2.data.choice === "Rock") ||
      (player1.data.choice === "Scissors" && player2.data.choice === "Paper")
    ) {
      player1.data.status = "Winner";
      player2.data.status = "Loser";

      player1.emit("decisionResult", player1.data.status);
      player2.emit("decisionResult", player2.data.status);

      player1.join("contestant_room");
      player2.join("loser_room");

      io.socketsLeave("game_room");
    } else {
      player1.data.status = "Loser";
      player2.data.status = "Winner";

      player1.emit("decisionResult", player1.data.status);
      player2.emit("decisionResult", player2.data.status);

      player1.join("loser_room");
      player2.join("contestant_room");

      io.socketsLeave("game_room");
    }
  }
}
