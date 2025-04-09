import { Socket } from "socket.io";
import { io } from "./index";

var count = 0;
var retryCount = 0;

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomPlayer(array: string[]) {
  for (var x = 0; x <= 2; x++) {
    const player = array[randomNumber(0, array.length)];
    io.to(String(player)).socketsJoin("game_room");
    io.to(String(player)).socketsLeave("contestant_room");
  }
}

export function gameManager(socket: Socket) {
  // NOTE: Fetches sockets and move sthem to "game_room"
  socket.on("startRound", async (callback) => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const listSockets: string[] = [];

    // Sends all socket ids into a array
    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    getRandomPlayer(listSockets);
  });

  // NOTE: Removes Players
  socket.on("removePlayer", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];
    function randomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    // Sends all socket ids into a array
    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }
    const player = listSockets[randomNumber(0, getSockets.length)];
    io.to(String(player)).socketsLeave("game_room");
    io.to(String(player)).socketsJoin("contestant_room");
    const check = await io.in("game_room").fetchSockets();
    const list = check.map(function(data) {
      console.log(data.id);
      return data.id;
    });
    callback(list);
  });

  // NOTE: Basically just waits for a both sockets to answer
  socket.on("playerReady", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];

    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    count++;

    if (count === 2) {
      io.to(String(listSockets[0])).emit("gameSync", "Play");
      io.to(String(listSockets[1])).emit("gameSync", "Play");
      count = 0;
    } else {
      null;
    }
  });

  // NOTE: Basically just waits for a both sockets to answer BUT FOR TIES
  socket.on("readyAgain", async () => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listSockets: string[] = [];

    for (const socket of getSockets) {
      listSockets.push(socket.id);
    }

    retryCount++;

    if (retryCount === 2) {
      io.to(String(listSockets[0])).emit("retrySync", "Play");
      io.to(String(listSockets[1])).emit("retrySync", "Play");
      retryCount = 0;
    } else {
      null;
    }
  });
}
