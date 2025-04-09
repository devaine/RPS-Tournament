import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import End from "@/features/game/end";
import Ready from "@/features/play/ready";
import type { GameScreen } from "@/types/gameAPI";

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

                socket.on("tie_retry", () => {});
              });

            const promiseRetry = () =>
              new Promise((resolve) => {
                socket.on("retrySync", (response): GameScreen => {
                  resolve(response);
                  return response;
                });
              });

            setCurrentScreen("Ready");
            setCurrentScreen((await promise()) as GameScreen); // Settles for one game
            setCurrentScreen((await promiseRetry()) as GameScreen); // Settles for ties
          }}
        />
      )}
      {currentScreen === "Ready" && <Ready key="Ready" />}
      {currentScreen === "Play" && (
        /* All onCLicks set user choice, activate play socket event listener, and set screen to decision */
        <Play
          key="Play"
          // TODO: Backend: Refactor for promises
          rockOnClick={async () => {
						const promise = () => new Promise((resolve) => {
							userData.choice = "rock"
							socket.emit("play", userData.choice, (response: string) => {
								resolve(response)
							});
						})
							
            setCurrentScreen("Decision");
						socket.emit("gameResult", (await promise()))
          }}
          paperOnClick={async () => {
            const promise = () => new Promise((resolve) => {
							userData.choice = "paper"
							socket.emit("play", userData.choice, (response: string) => {
								resolve(response)
							});
						})

            setCurrentScreen("Decision");
						socket.emit("gameResult", (await promise()))
          }}
          scissorsOnClick={async () => {
            const promise = () => new Promise((resolve) => {
							userData.choice = "scissors"
							socket.emit("play", userData.choice, (response: string) => {
								resolve(response)
							});
						})

            setCurrentScreen("Decision");
						socket.emit("gameResult", (await promise()))
          }}
        />
      )}
      {currentScreen === "Decision" && (
        <Decision
          key="Decision"
          enterOnClick={() => {
            setCurrentScreen("Ready");
          }}
          leaveOnClick={() => {
            setCurrentScreen("Waiting");
          }}
        />
      )}
      {currentScreen === "End" && <End key="End" />}
    </AnimatePresence>
  );
};

export default Game;
