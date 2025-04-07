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
  const [currentDecision, setCurrentDecision] =
    useState<GameDecision>("Loading...");
  let intervalID: undefined | ReturnType<typeof setTimeout>;

  useEffect(() => {
    const pushDecision = () => {
      // socket.on("decision", () => {
      //   setCurrentDecision("YOU WON !!!");
      // });
      setCurrentDecision("YOU WON !!!");
    };

    intervalID = setInterval(pushDecision, 1000);

    return () => clearInterval(intervalID);
  }, [socket]);

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          enterOnClick={() => setCurrentScreen("Ready")}
        />
      )}
      {currentScreen === "Ready" && <Ready key="Ready" />}
      {currentScreen === "Play" && (
        <Play
          key="Play"
          rockOnClick={() => {
            userData.choice = "rock";
            setCurrentScreen("Decision");
            console.log(userData);
          }}
          paperOnClick={() => {
            userData.choice = "paper";
            setCurrentScreen("Decision");
            console.log(userData);
          }}
          scissorsOnClick={() => {
            userData.choice = "scissors";
            setCurrentScreen("Decision");
            console.log(userData);
          }}
        />
      )}
      {currentScreen === "Decision" && (
        <Decision
          key="Decision"
          decision={currentDecision}
          enterOnClick={() => setCurrentScreen("Play")}
          leaveOnClick={() => {}}
        />
      )}
      {currentScreen === "End" && <End key="End" />}
    </AnimatePresence>
  );
};

export default Game;
