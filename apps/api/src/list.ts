import {
  io,
  winnersArray,
  losersArray,
  updateLosersArray,
  updateWinnersArray,
} from "./index";
import type { User } from "./config";
import { Socket } from "socket.io";

/* NOTE: This file:
 * 	Purpose: Used for every client (winners, losers, admins, everyone),
 *  to see a "realtime" list of the chosen players as it also listens to
 *  events for when players join, leave, or disconnect from the event.
 */

// INFO: Sends to all sockets a new list of contestants, players, losers.
function sendToFrontend(
  contestantArr: User[],
  playerArr: User[],
  loserArr: User[],
) {
  io.emit("updateContestantList", contestantArr);
  io.emit("updatePlayerList", playerArr);
  io.emit("updateLoserList", loserArr);
}

// INFO: These functions that start with "fetch" basically
// grab all sockets in a specific room and returns each socket's
// data to a User[] array.
async function fetchContestants() {
  const getContestants = await io.in("contestant_room").fetchSockets();
  let contestantArr: User[] = [];
  getContestants.map(function (value) {
    contestantArr.push(value.data);
  });

  return contestantArr;
}

async function fetchPlayers() {
  const getPlayers = await io.in("game_room").fetchSockets();
  let playerArr: User[] = [];
  getPlayers.map(function (value) {
    playerArr.push(value.data);
  });

  return playerArr;
}

async function fetchLosers() {
  const getLosers = await io.in("loser_room").fetchSockets();
  let updatedLoserArr: User[] = [];
  getLosers.map(function (value) {
    updatedLoserArr.push(value.data);
  });

  // Find missing loser users in losersArray from loserArr
  let missingLosersArray = updatedLoserArr.filter(
    (users) => !losersArray.includes(users),
  );

  let newLosersArray = [...losersArray, ...missingLosersArray];

  updateLosersArray(newLosersArray);

  return newLosersArray;
}

async function fetchWinners() {
  const getWinners = await io.in("winner_room").fetchSockets();
  let updatedWinnerArr: User[] = [];

  getWinners.map((value) => {
    updatedWinnerArr.push(value.data);
  });

  // Find missing loser users in losersArray from loserArr
  let missingWinnersArray = updatedWinnerArr.filter(
    (users) => !winnersArray.includes(users),
  );

  let newWinnersArray = [...winnersArray, ...missingWinnersArray];

  updateWinnersArray(newWinnersArray);

  return newWinnersArray;
}

export async function dashboardManager(socket: Socket) {
  // INFO: This manages the listeners of when frontend emits
  // for an instant list of contestants, players, and losers.
  socket.on("contestantList", async (callback) => {
    callback(await fetchContestants());
  });

  socket.on("playerList", async (callback) => {
    callback(await fetchPlayers());
  });

  socket.on("loserList", async (callback) => {
    callback(await fetchLosers());
  });

  // For winners
  socket.on("winnerList", async (callback) => {
    callback(await fetchWinners());
  });

  // INFO: Listens for when contestants join, leave, or disconnect
  // from the event.
  socket.on("join_event", async () => {
    sendToFrontend(
      await fetchContestants(),
      await fetchPlayers(),
      await fetchLosers(),
    );
  });

  socket.on("leave_event", async () => {
    sendToFrontend(
      await fetchContestants(),
      await fetchPlayers(),
      await fetchLosers(),
    );
  });

  socket.on("player_join", async () => {
    sendToFrontend(
      await fetchContestants(),
      await fetchPlayers(),
      await fetchLosers(),
    );
  });

  socket.on("disconnect", async () => {
    sendToFrontend(
      await fetchContestants(),
      await fetchPlayers(),
      await fetchLosers(),
    );
  });
}

// NOTE: In any case, if these lists need to be used by other files.
export async function sendListsAnyway() {
  sendToFrontend(
    await fetchContestants(),
    await fetchPlayers(),
    await fetchLosers(),
  );
}
