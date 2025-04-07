import React from "react";
import { useEffect, useState } from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import type { GameDecision } from "@/types/gameAPI";
import type { User } from "@/types/gameAPI";

// NOTE: Backend not done yet, soz

import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

type DecisionProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

function Decision({ enterOnClick, leaveOnClick }: DecisionProps) {
  const [decision, setDecision] = useState<GameDecision>("Loading...");

  socket.emit("play", (response: string) => {
    console.log(response);
  });

  useEffect(() => {
    const onWin = () => {
      setDecision("YOU WON !!!");
    };
    const onLose = () => {
      setDecision("YOU LOSE !!!");
    };
    const onTied = () => {
      setDecision("YOU TIED !!!");
    };

    socket.on("win", onWin);
    socket.on("lose", onLose);
    socket.on("tied", onTied);
    return () => {
      socket.off("win", onWin);
      socket.off("lose", onLose);
      socket.off("tied", onTied);
    };
  }, [decision]);

  // const findDecision = () => {
  //   socket.emit("play", (response: string) => {
  //     if (response === userData.name) setDecision("YOU WON !!!");
  //     else if (response === "tied") setDecision("YOU TIED !!!");
  //     else if (response !== "") setDecision("YOU LOSE !!!");
  //     else setDecision("Loading...");
  //     console.log(response);
  //   });
  //   console.log(userData.choice);
  // };
  // setInterval(findDecision, 1000);

  return (
    <GameLayout key="Decision">
      <Announce text={decision} />
      <MultiButtonLayout>
        {decision === "YOU LOSE !!!" && (
          <Button text="Go to Dashboard" link="/dashboard" />
        )}
        {(decision === "YOU WON !!!" || decision === "YOU TIED !!!") && (
          <Button text="Ready to go again?" onClick={() => enterOnClick} />
        )}
        {decision !== "Loading..." && (
          <Button
            text="Leave Game"
            link="/"
            color="background"
            onClick={leaveOnClick}
          />
        )}
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Decision;
