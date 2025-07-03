import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import Ready from "@/features/play/ready";
import type { GameScreen } from "@/types/gameAPI";
import type { GameChoices } from "@/types/gameAPI";
import Kicked from "@/features/game/kicked";
import Queued from "@/features/game/queued";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import { DecisionProvider } from "@/hooks/decision-context";
import { GameProvider, useGameContext } from "@/hooks/game-context";
import { PlayerProvider } from "@/hooks/player-context";

/* NOTE: What this file does:
 * Basically, its a subrouter for the other pages of the website.
 * Uses the context from `hooks/game-context`
 * to determine the current state of the page
 */

// TODO: Add user as parameter for game to function
const Game = () => {
  return <GameRouter />;
};

// TODO: This is messy. Try to use hooks for enterOnClick so make it much more readable.

const GameRouter = () => {
  const { gameState, setGameState } = useGameContext();

  switch (gameState) {
    /* For when players have to leave / forced to leave */
    case "Kicked":
      return <Kicked />;
    case "Waiting": // menu for dashboard and leaving the game... (default)
      return (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          enterOnClick={async () => {
            setGameState((await gameSync()) as GameScreen); // Settles for one game
            setGameState((await gameSyncRetry()) as GameScreen); // Settles for ties
          }}
        />
      );
    case "Queued":
      return <Queued />;
    case "Ready": // "Waiting for opponent"
      return <Ready />;
    case "Play": // Actual rock paper scissors game
      /* All onCLicks set user choice, activate play socket event listener, and set screen to decision */
      return (
        <Play
          key="Play"
          rockOnClick={() => {
            getPlayerChoice("Rock");
            setGameState("Decision");
          }}
          paperOnClick={() => {
            getPlayerChoice("Paper");
            setGameState("Decision");
          }}
          scissorsOnClick={() => {
            getPlayerChoice("Scissors");
            setGameState("Decision");
          }}
        />
      );
    case "Decision": // "..." (waits for backend to declare the winner)
      return (
        <DecisionProvider>
          <Decision
            key="Decision"
            enterOnClick={() => {
              setGameState("Ready");
            }}
            leaveOnClick={() => {
              setGameState("Waiting");
            }}
          />
        </DecisionProvider>
      );
    default:
      return (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          enterOnClick={async () => {
            setGameState("Ready");
            setGameState((await gameSync()) as GameScreen); // Settles for one game
            setGameState((await gameSyncRetry()) as GameScreen); // Settles for ties
          }}
        />
      );
  }
};

function gameSync() {
  return new Promise((resolve) => {
    socket.emit("playerReady");
    socket.on("gameSync", (response): GameScreen => {
      resolve(response);
      return response;
    });

    socket.on("tie_retry", () => {});
  });
}

function gameSyncRetry() {
  return new Promise((resolve) => {
    socket.on("retrySync", (response): GameScreen => {
      resolve(response);
      return response;
    });
  });
}

function getPlayerChoice(choice: GameChoices) {
  userData.choice = choice;
  socket.emit("play", userData.choice);
}

export default Game;
