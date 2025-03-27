import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import type { GameDecision } from "@/types/api";

type DecisionProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
  decision: GameDecision;
};

function Decision({ enterOnClick, leaveOnClick, decision }: DecisionProps) {
  return (
    <GameLayout key="Decision">
      <Announce text={decision} />
      <MultiButtonLayout>
        {decision === "YOU LOSE !!!" ? (
          <Button text="Go to Dashboard" link="/game/dashboard" />
        ) : (
          <Button text="Ready to go again?" onClick={() => enterOnClick} />
        )}
        <Button
          text="Leave Game"
          link="/"
          color="background"
          onClick={leaveOnClick}
        />
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Decision;
