import { io } from "./index";
import type { User } from "./config";

/* NOTE: This file:
 * Purpose: Used for every client (winners, losers, admins, everyone),
 *  to see a realtime list of the chosen players
 * Perhaps on a 1 second interval for performance benefits.
 */

async function getInfo() {
  const getContestants = await io.in("contestant_room").fetchSockets();
  let contestantArr: User[] = [];
  getContestants.map(function (value) {
    contestantArr.push(value.data);
  });

  io.emit("contestantList", contestantArr);

  const getPlayers = await io.in("game_room").fetchSockets();
  let playerArr: User[] = [];
  getPlayers.map(function (value) {
    playerArr.push(value.data);
  });

  io.emit("playerList", playerArr);

  const getLosers = await io.in("loser_room").fetchSockets();
  let loserArr: User[] = [];
  getLosers.map(function (value) {
    loserArr.push(value.data);
  });

  io.emit("loserList", loserArr);
}

export async function listClients() {
  getInfo();
  await new Promise((r) => setTimeout(r, 100));
  listClients();
}
