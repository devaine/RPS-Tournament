import { Socket } from "socket.io";
import { io } from "./index";

export function listManager(socket: Socket) {
  // Fetch data for all sockets in rooms & find their data
  socket.on("contestantList", async (callback) => {
    const getSockets = await io.in("contestant_room").fetchSockets();
    const getContestants = getSockets.map(function (value) {
      return value.data;
    });

    callback(getContestants.filter(Boolean));
  });

  socket.on("playerList", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const getPlayers = getSockets.map(function (value) {
      return value.data;
    });

    callback(getPlayers.filter(Boolean));
  });

  socket.on("loserList", async (callback) => {
    const getSockets = await io.in("loser_room").fetchSockets();
    const getLosers = getSockets.map(function (value) {
      return value.data;
    });

    callback(getLosers.filter(Boolean));
  });
}
