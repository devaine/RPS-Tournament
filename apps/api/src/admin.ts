import { Socket } from "socket.io";
import { io, readyArray } from "./index";
import { sendListsAnyway } from "./list";
import { lobbyStateManger } from "./context";

// TODO: Practically just improve this by choosing two random players, (could be imported from index.ts)

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// NOTE: Gets 2 random players, moves them to the contestant room,
// and changes their state to "Queued" in the Frontend

function getRandomPlayers(array: string[]) {
  let randomPlayer1 = String(array[randomNumber(0, array.length)]);
  let randomPlayer2 = String(array[randomNumber(0, array.length)]);

  if (randomPlayer1 === randomPlayer2 || randomPlayer2 === randomPlayer1) {
    getRandomPlayers(array);
    console.log("same player, trying again");
  }

  io.to(randomPlayer1).socketsJoin("game_room");
  io.to(randomPlayer1).socketsLeave("contestant_room");
  lobbyStateManger(randomPlayer1, "Queued");

  io.to(randomPlayer2).socketsJoin("game_room");
  io.to(randomPlayer2).socketsLeave("contestant_room");
  lobbyStateManger(randomPlayer2, "Queued");
}

export function admin(socket: Socket) {
  // NOTE: Fetches sockets and moves them to "game_room" <--- NEEDS UPDATING
  socket.on("startRound", async () => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const listSockets: string[] = [];

    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    // Round starts if more than 1 player
    if (listSockets.length > 1) {
      getRandomPlayers(listSockets);
      sendListsAnyway(); // Manually updates all lists.
    }
  });

  // Removes the latest player from the game_room
  socket.on("removePlayer", async () => {
    const getGameSockets = await io.in("game_room").fetchSockets();
    const listGameSockets: string[] = [];

    for (const socket of getGameSockets) {
      listGameSockets.push(socket.id);
    }

    const lastPlayer: string = String(
      listGameSockets[getGameSockets.length - 1],
    );

    //if (getGameSockets.length > 0 && getReadySockets.includes(lastPlayer)) {
    io.to(lastPlayer).socketsLeave("game_room");
    io.to(lastPlayer).socketsJoin("contestant_room");

    // Updates the screens of a removed player.
    io.to(lastPlayer).emit("updateLobbyState", "Waiting");
    io.to(lastPlayer).emit("updateGameState", "Lobby");

    // If someone has readied then removed from ready array.
    if (readyArray.length > 0) readyArray.pop();

    sendListsAnyway();
    //}
  });

  // NOTE: Removes any contestant in the game
  // TODO: Suggestion: Backend - Return list of names that match input
  // for frontend add another box for a numbered list to select.
  socket.on("removeContestant", async (name: string) => {
    // Get all sockets from the socketio server (except admins / non-players)
    const allSockets = await io
      .of("/")
      .in("contestant_room")
      .in("game_room")
      .in("loser_room")
      .fetchSockets();

    for (const socket of allSockets) {
      const socketName: string = socket.data.name;
      if (socketName.includes(name)) socket.disconnect();
    }
  });
}
