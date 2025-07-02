import { Socket } from "socket.io";
import { io, player1, player2 } from "./index";

// TODO: Practically just improve this by choosing two random players, (could be imported from index.ts)

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// NOTE: Moves two random players from "contestant_room" to "game_room"
function getRandomPlayer(array: string[]) {
  let randomPlayer1 = array[randomNumber(0, array.length - 1)];
  let randomPlayer2 = array[randomNumber(0, array.length - 1)];

  if (randomPlayer1 === randomPlayer2 || randomPlayer2 === randomPlayer1) {
    getRandomPlayer(array);
  }

  io.to(String(randomPlayer1)).socketsJoin("game_room");
  io.to(String(randomPlayer1)).socketsLeave("contestant_room");

  io.to(String(randomPlayer2)).socketsJoin("game_room");
  io.to(String(randomPlayer2)).socketsLeave("contestant_room");
}

export function admin(socket: Socket) {
  // NOTE: Fetches sockets and moves them to "game_room"
  socket.on("startRound", async () => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const listSockets: string[] = [];

    // Sends all socket ids into a array
    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    getRandomPlayer(listSockets);
  });

  // TODO: I want to change this
  // perhaps we could try to rename this as "movePlayer"
  // so we can move players to different rooms as the admin pleases
  socket.on("removePlayer", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];

    // Sends all socket ids into a array
    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    const player = listSockets[randomNumber(0, getSockets.length)];

    io.to(String(player)).socketsLeave("game_room");
    io.to(String(player)).socketsJoin("contestant_room");

    const check = await io.in("game_room").fetchSockets();
    const list = check.map(function (data) {
      console.log(data.id);
      return data.id;
    });
    callback(list);
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
