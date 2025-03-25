import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/rounds/play";
import Waiting from "@/features/rounds/waiting";
import Decision from "@/features/rounds/decision";
import type { GameScreen } from "@/types/api";
import type { GameDecision } from "@/types/api";

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("Waiting");
  const [currentDecision, setCurrentDecision] =
    useState<GameDecision>("YOU WON !!!");

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <Waiting
          key="Waiting"
          leaveOnClick={() => { }}
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
          leaveOnClick={() => { }}
        />
      )}
    </AnimatePresence>
  );
};

export default Game;
