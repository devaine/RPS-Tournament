import { Socket } from "socket.io";
import { io } from "./index";

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

// NOTE: Moves two random players from "contestant_room" to "game_room"
function getRandomPlayer(array: string[]) {
  for (var x = 0; x <= 2; x++) {
    const player = array[randomNumber(0, array.length)];
    io.to(String(player)).socketsJoin("game_room");
    io.to(String(player)).socketsLeave("contestant_room");
  }
}

export function admin(socket: Socket) {
  // NOTE: Fetches sockets and move sthem to "game_room"
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
