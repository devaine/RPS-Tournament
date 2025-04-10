import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// NOTE: Backend not done yet, soz

import { socket } from "@/features/socketio/init";
import { useDecisionContext } from "@/features/context/decision-context";
import { useNavigate } from "react-router";

type DecisionProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

const navigate = useNavigate()

function Decision({ enterOnClick, leaveOnClick }: DecisionProps) {
  const { decisionState } = useDecisionContext();

  // Use effect for handing decision useState using socketio event listeners
  // when [var] changes, executes useEffect
  // when [] is empty with every component update, executes useEffect
  // react will not return a promise as a function
  // async always returns promises

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
							socket.disconnect()
							navigate("/")
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
