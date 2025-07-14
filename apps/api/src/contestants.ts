import { Socket } from "socket.io";
import { io, readyArray } from "./index";
import { type User } from "./config";
// NOTE: This file helps handle contestant movement between rooms

export function contestantHandler(socket: Socket) {
  // NOTE: Listener "join_event" is for people who are joining the event
  // for the first fime (it can also be for rejoins)
  socket.on("join_event", async function (data) {
    if (!socket.rooms.has("contestant_room")) {
      socket.join("contestant_room");

      // Assign the data from emit to socket
      socket.data.name = data.name;
      socket.data.id = data.id;
      socket.data.avatar = data.avatar;

      const fetchSockets = await io.in("contestant_room").fetchSockets();
      let socketList: string[] = [];

      // Sends all socket ids into socketList
      for (const socket of fetchSockets) {
        socketList.push(socket.data.name);
      }

      let contestantArr: User[] = [];
      fetchSockets.map(function (value) {
        contestantArr.push(value.data);
      });

      console.log(socket.data.name + ' has joined "contestant_room" ');
      console.log("active players: " + socketList + "\n");
    }
  });

  // NOTE: Listener "leave_event" is for people who
  // press the "Leave Game" button in the UI
  socket.on("leave_event", function (data) {
    // Leave all possible rooms available.
    socket.leave("contestant_room");
    socket.leave("game_room");
    socket.leave("loser_room");

    console.log("a user " + socket.id + " left the event!");
    console.log(data.name + " is the name");
    console.log(data.id + " is the student id");
  });

  // Handles genuine disconnection (refreshes + crashes etc.)
  socket.on("disconnect", () => {
    if (readyArray.includes(socket.id)) {
      readyArray.pop();
    }
    console.log("user: " + socket.id + " disconnected!");
  });
}
