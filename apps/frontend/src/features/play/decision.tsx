import React from "react";
import { useEffect, useState } from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import type { GameDecision } from "@/types/gameAPI";
import type { GameScreen } from "@/types/gameAPI";
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

  // Use effect for handing decision useState using socketio event listeners
		
	useEffect(() => {
		const promise = () => new Promise((resolve) => {
			socket.on("game_outcome", (response: string) => {
				resolve(response)
			})
		})

		const turnout = async () => {
			setDecision((await promise() as GameDecision))
		}
		turnout()
	})


  //useEffect(() => {
  //  const onWin = () => {
  //    setDecision("YOU WON !!!");
  //  };
  //  const onLose = () => {
  //    setDecision("YOU LOSE !!!");
  //  };
  //  const onTied = () => {
  //    setDecision("YOU TIED !!!");
  //  };

  //  socket.on("win", onWin);
  //  socket.on("lose", onLose);
  //  socket.on("tied", onTied);

  //  // Cleanup for event listeners
  //  return () => {
  //    socket.off("win", onWin);
  //    socket.off("lose", onLose);
  //    socket.off("tied", onTied);
  //  };
  //}, [decision]);

  return (
    <GameLayout key="Decision">
      <Announce text={decision} />
      <MultiButtonLayout>
        {decision === "YOU LOSE !!!" && (
          <Button
            text="Go to Dashboard"
            link="/dashboard"
            onClick={() => {
              localStorage.setItem("status", "loser");
            }}
          />
        )}
        {decision === "YOU TIED !!!" && (
          <Button
            text="Ready to go again?"
            onClick={async () => {
              socket.emit("readyAgain");
              enterOnClick();
            }}
          />
        )}
        {decision === "YOU WON !!!" && (
          <Button text="Return to Lobby" onClick={leaveOnClick} />
        )}
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Decision;
