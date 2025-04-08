import { Socket } from "socket.io";
import { io } from "./index";

export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export function playManager(socket: Socket) {
  socket.on("setChoice", (choice: string) => {
    socket.data.choice = choice;
    console.log(socket.data.choice);
  });

  socket.on("play", async (callback) => {
    const getSockets = await io.in("game_room").fetchSockets();
    const listPlayers: User[] = [];
    const getNames = getSockets.map(function (value) {
      listPlayers.push(value.data);
    });
    getNames;

    const player1 = listPlayers[0];
    const player2 = listPlayers[1];

    const winnerString = decideWinner({ player1, player2 });
    const loserString = decideLoser({ player1, player2 });
    const winner = await findUserSocket(winnerString);
    const loser = await findUserSocket(loserString);

    console.log({ player1, player2 });

    if (winner) {
      winner.emit("win");
    }
    if (loser) {
      loser.emit("lose");
    }
    // TODO: Tie
  });
}

// Find user by ID (less efficient)
async function findUserSocket(name: string) {
  const sockets = await io.fetchSockets();
  return sockets.find((s) => s.data.name === name);
}

type DecideWinnerProps = {
  player1?: User;
  player2?: User;
};

function decideWinner({ player1, player2 }: DecideWinnerProps) {
  if (
    !player1 ||
    !player2 ||
    player1.choice === undefined ||
    player2.choice === undefined
  ) {
    return "";
  }

  if (player1.choice === player2.choice) {
    return "tie";
  } else if (
    (player1.choice === "rock" && player2.choice === "scissors") ||
    (player1.choice === "paper" && player2.choice === "rock") ||
    (player1.choice === "scissors" && player2.choice === "paper")
  ) {
    return player1.name;
  } else {
    return player2.name;
  }
}

function decideLoser({ player1, player2 }: DecideWinnerProps) {
  if (
    !player1 ||
    !player2 ||
    player1.choice === undefined ||
    player2.choice === undefined
  ) {
    return "";
  }

  if (player1.choice === player2.choice) {
    return "tie";
  } else if (
    (player1.choice === "rock" && player2.choice === "scissors") ||
    (player1.choice === "paper" && player2.choice === "rock") ||
    (player1.choice === "scissors" && player2.choice === "paper")
  ) {
    return player2.name;
  } else {
    return player1.name;
  }
}
