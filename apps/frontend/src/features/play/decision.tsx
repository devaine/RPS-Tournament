import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// NOTE: Backend not done yet, soz

import { socket } from "@/features/socketio/init";
import { useDecisionContext } from "@/features/context/decision-context";
import { userData } from "@/config/global";

type DecisionProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

async function tester() {
  const promise = () =>
    new Promise((resolve) => {
      socket.on("gameResult", async (response: string) => {
        console.log(response);
        resolve(response);
      });
    });
  console.log(await promise());
}

function Decision({ enterOnClick, leaveOnClick }: DecisionProps) {
  const { decisionState } = useDecisionContext();

  // Use effect for handing decision useState using socketio event listeners
  // when [var] changes, executes useEffect
  // when [] is empty with every component update, executes useEffect
  // react will not return a promise as a function
  // async always returns promises
  const disconnectSocket = () => {
    socket.emit("leave_event", {
      name: userData.name,
      id: userData.id,
    });

    // Clears out all local browser data
    localStorage.clear();
  };

  return (
    <GameLayout key="Decision">
      <Announce text={decisionState} />
      <MultiButtonLayout>
        {decisionState === "YOU LOSE !!!" && (
          <Button
            text="Leave Game"
            link="/"
            color="background"
            onClick={disconnectSocket}
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
