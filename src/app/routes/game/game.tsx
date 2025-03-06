import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Play from "@/features/rounds/play";
import Waiting from "@/features/rounds/waiting";
import Decision from "@/features/rounds/decision";
import { GameLayout } from "@/components/layouts/game-layout";
import { ActionButton } from "@/components/ui/button";

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState("Waiting");
  const [currentDecision, setCurrentDecision] = useState("");

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Waiting" && (
        <motion.div
          key="Waiting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GameLayout>
            <Waiting />
            <ActionButton
              text="Ready?"
              onclick={() => setCurrentScreen("Play")}
            />
          </GameLayout>
        </motion.div>
      )}
      {currentScreen === "Play" && (
        <motion.div
          key="Play"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
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
        </motion.div>
      )}
      {currentScreen === "Decision" && (
        <motion.div
          key="Decision"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GameLayout>
            <Decision decision={currentDecision} />
            <ActionButton
              text="Ready?"
              onclick={() => setCurrentScreen("Play")}
            />
          </GameLayout>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Game;
