import React from "react";
import { useEffect, useState } from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// NOTE: Backend not done yet, soz

import { socket } from "@/features/socketio/init";
import { useDecisionContext } from "@/features/play/decision-context";

type DecisionProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

async function tester() {
	const promise = () => new Promise((resolve) => {
		socket.on("gameResult", async (response: string) => {
			console.log(response)
			resolve(response)
		})
	})
	console.log(await promise())
	}


function Decision({ enterOnClick, leaveOnClick }: DecisionProps) {
  const { decisionState } = useDecisionContext();

  // Use effect for handing decision useState using socketio event listeners
  // when [var] changes, executes useEffect
  // when [] is empty with every component update, executes useEffect
  // react will not return a promise as a function
  // async always returns promises

	useEffect(() => {
		tester()
	}, [decision])
	

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
      <Announce text={decisionState} />
      <MultiButtonLayout>
        {decisionState === "YOU LOSE !!!" && (
          <Button
            text="Go to Dashboard"
            link="/dashboard"
            onClick={() => {
              localStorage.setItem("status", "loser");
            }}
          />
        )}
        {decisionState === "YOU TIED !!!" && (
          <Button
            text="Ready to go again?"
            onClick={async () => {
              socket.emit("readyAgain");
              enterOnClick();
            }}
          />
        )}
        {decisionState === "YOU WON !!!" && (
          <Button text="Return to Lobby" onClick={leaveOnClick} />
        )}
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Decision;
