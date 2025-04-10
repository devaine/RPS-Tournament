import { Socket } from "socket.io";
import { io } from "./index";

let previouslyJoinedRooms: string;

export function updatePreviouslyJoinedRooms(room: string) {
  previouslyJoinedRooms = room;
}

export function contestantManager(socket: Socket, playerCount: number) {
  socket.on("join_event", function (data) {
    console.log("a user " + socket.id + " connected!");
    console.log(data.name + " is the name");
    console.log(data.id + " is the student id");
    console.log(data.avatar + " is the student avatar");

    // // Join a room (participant_room) with all other clients...
    // if (previouslyJoinedRooms) {
    //   socket.emit("rejoin-rooms", previouslyJoinedRooms);
    // } else {
    socket.join("contestant_room");
    previouslyJoinedRooms = "contestant_room";
    // }
    console.log(data.name + " joined contestant room");

    // Assign the data from emit to socket
    socket.data.name = data.name;
    socket.data.id = data.id;
    socket.data.avatar = data.avatar;

    playerCount++;

    console.log(data.status);
  });

  // Server-side
  socket.on("rejoin-rooms", (rooms) => {
    rooms.forEach((room: string) => socket.join(room));
  });

  // NOTE: Listener "leave_event" is for people who
  // press the "Leave Game" button in the UI
  socket.on("leave_event", function (data) {
    if (socket.rooms.has("contestant_room")) {
      socket.leave("contestant_room");
    }

    playerCount--;

    console.log("a user " + socket.id + " left the event!");
    console.log("playerCount: " + playerCount);
    console.log(data.name + " is the name");
    console.log(data.id + " is the student id");

    socket.disconnect();
  });

  socket.on("remove_contestant", function (data) {
    io.to("contestant_room").emit("remove_contestant", data);
  });

  // Handles genuine disconnection (refreshes + crashes etc.)
  socket.on("disconnect", () => {
    console.log("user: " + socket.id + " disconnected!");
  });

  // TODO: Remove Players
}
