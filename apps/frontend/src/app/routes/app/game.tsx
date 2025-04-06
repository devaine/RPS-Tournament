import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import End from "@/features/game/end";
import type { GameScreen } from "@/types/gameAPI";
import type { GameDecision } from "@/types/gameAPI";

// TODO: Add user as parameter for game to function
const Game = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("Waiting");
  const [currentDecision, setCurrentDecision] =
    useState<GameDecision>("YOU WON !!!");

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <Waiting
          key="Waiting"
          leaveOnClick={() => {}}
          enterOnClick={() => setCurrentScreen("Play")}
        />
      )}
      {currentScreen === "Play" && (
        <Play
          key="Play"
          rockOnClick={() => {
            setCurrentScreen("Decision");
            setCurrentDecision("YOU WON !!!");
            console.log(currentDecision);
          }}
          paperOnClick={() => {
            setCurrentScreen("Decision");
            setCurrentDecision("YOU LOSE !!!");
            console.log(currentDecision);
          }}
          scissorsOnClick={() => {
            setCurrentScreen("Decision");
            setCurrentDecision("YOU TIED !!!");
            console.log(currentDecision);
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
      {currentScreen === "End" && <End />}
    </AnimatePresence>
  );
};

export default Game;
