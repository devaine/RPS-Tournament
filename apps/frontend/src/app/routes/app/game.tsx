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
          enterOnClick={async () => {
            const promise = () =>
              new Promise((resolve) => {
                socket.emit("playerReady");
                socket.on("gameSync", (response): GameScreen => {
                  resolve(response);
                  return response;
                });
              });

            setCurrentScreen("Ready");
            setCurrentScreen((await promise()) as GameScreen);
          }}
        />
      )}
      {currentScreen === "Ready" && <Ready key="Ready" />}
      {currentScreen === "Play" && (
        /* All onCLicks set user choice, activate play socket event listener, and set screen to decision */
        <Play
          key="Play"
          rockOnClick={() => {
            userData.choice = "rock";
            socket.emit("setChoice", userData.choice);
            socket.emit("play", (response: string) => {
              console.log(response);
            });
            setCurrentScreen("Decision");
          }}
          paperOnClick={() => {
            userData.choice = "paper";
            socket.emit("setChoice", userData.choice);
            socket.emit("play", (response: string) => {
              console.log(response);
            });
            setCurrentScreen("Decision");
          }}
          scissorsOnClick={() => {
            userData.choice = "scissors";
            socket.emit("setChoice", userData.choice);
            socket.emit("play", (response: string) => {
              console.log(response);
            });
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
