import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import End from "@/features/game/end";
import Ready from "@/features/play/ready";
import type { GameScreen } from "@/types/gameAPI";
import type { GameChoices } from "@/types/gameAPI";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import { DecisionProvider } from "@/features/play/decision-context";

// TODO: Add user as parameter for game to function
const Game = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("Waiting");
  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          enterOnClick={async () => {
            setCurrentScreen("Ready");
            socket.emit("set_decision", "YOU WON !!!");
            setCurrentScreen((await gameSync()) as GameScreen); // Settles for one game
            setCurrentScreen((await gameSyncRetry()) as GameScreen); // Settles for ties
          }}
        />
      )}
      {currentScreen === "Ready" && <Ready key="Ready" />}
      {currentScreen === "Play" && (
        /* All onCLicks set user choice, activate play socket event listener, and set screen to decision */
        <Play
          key="Play"
          // TODO: Backend: Refactor for promises
          rockOnClick={() => {
            getPlayerChoice("rock");
            setCurrentScreen("Decision");
          }}
          paperOnClick={() => {
            getPlayerChoice("paper");
            setCurrentScreen("Decision");
          }}
          scissorsOnClick={() => {
            getPlayerChoice("scissors");
            setCurrentScreen("Decision");
          }}
        />
      )}
      {currentScreen === "Decision" && (
        <DecisionProvider>
          <Decision
            key="Decision"
            enterOnClick={() => {
              setCurrentScreen("Ready");
            }}
            leaveOnClick={() => {
              setCurrentScreen("Waiting");
            }}
          />
        </DecisionProvider>
      )}
      {currentScreen === "End" && <End key="End" />}
    </AnimatePresence>
  );
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
