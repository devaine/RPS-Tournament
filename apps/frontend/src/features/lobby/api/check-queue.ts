import { type User } from "@/types/gameAPI";

import { useNavigate } from "react-router";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

const navigate = useNavigate();

const matchPlayerName = (players: User[]) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].name === userData.name) {
      return true;
    }
  }
  return false;
};

// TODO: This could be much more efficient, especially for kicking players
// could be a try-catch statement
export const checkQueue = () => {
  socket.emit("playerList", (players: User[]) => {
    if (matchPlayerName(players)) {
      return "Queued";
    } else {
      return "Waiting";
    }
  });

  socket.on("kickPlayer", (firstName: string) => {
    const user_firstName = userData.name;
    if (user_firstName === firstName) {
      localStorage.clear();
      navigate("/");
    }
  });
};
