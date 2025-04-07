import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import End from "@/features/game/end";
import Ready from "@/features/play/ready";
import type { GameScreen } from "@/types/gameAPI";
import type { GameDecision } from "@/types/gameAPI";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

// TODO: Add user as parameter for game to function
const Game = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("Waiting");

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          // enterOnClick={() => setCurrentScreen("Ready")}
          enterOnClick={() => setCurrentScreen("Play")}
        />
      )}
      {currentScreen === "Ready" && (
        <Ready
          key="Ready"
          onReady={() => {
            setCurrentScreen("Play");
          }}
        />
      )}
      {currentScreen === "Play" && (
        <Play
          key="Play"
          rockOnClick={() => {
            userData.choice = "rock";
            socket.emit("setChoice", userData.choice);
            setCurrentScreen("Decision");
          }}
          paperOnClick={() => {
            userData.choice = "paper";
            socket.emit("setChoice", userData.choice);
            setCurrentScreen("Decision");
          }}
          scissorsOnClick={() => {
            userData.choice = "scissors";
            socket.emit("setChoice", userData.choice);
            setCurrentScreen("Decision");
          }}
        />
      )}
      {currentScreen === "Decision" && (
        <Decision
          key="Decision"
          enterOnClick={() => setCurrentScreen("Play")}
          leaveOnClick={() => {}}
        />
      )}
      {currentScreen === "End" && <End key="End" />}
    </AnimatePresence>
  );
};

export default Game;
