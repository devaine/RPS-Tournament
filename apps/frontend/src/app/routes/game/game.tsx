import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/rounds/play";
import Waiting from "@/features/rounds/waiting";
import Decision from "@/features/rounds/decision";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState("Waiting");
  const [currentDecision, setCurrentDecision] = useState("");

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <GameLayout key="Waiting">
          <Waiting />
          <Button text="Ready?" onclick={() => setCurrentScreen("Play")} />
        </GameLayout>
      )}
      {currentScreen === "Play" && (
        <GameLayout key="Play">
          <Play
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
        </GameLayout>
      )}
      {currentScreen === "Decision" && (
        <GameLayout key="Decision">
          <Decision decision={currentDecision} />
          {currentDecision === "YOU LOSE !!!" ? (
            <Button text="Go to Dashboard" link="/game/dashboard" />
          ) : (
            <Button text="Ready?" onclick={() => setCurrentScreen("Play")} />
          )}
        </GameLayout>
      )}
    </AnimatePresence>
  );
};

export default Game;
