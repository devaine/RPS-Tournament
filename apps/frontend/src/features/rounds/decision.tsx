import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import type { DecisionParameters } from "@/types/api";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

function Decision(decisionParameters: DecisionParameters) {
  return (
    <GameLayout key="Decision">
      <Announce text={decisionParameters.decision} />
      <MultiButtonLayout>
        {decisionParameters.decision === "YOU LOSE !!!" ? (
          <Button text="Go to Dashboard" link="/game/dashboard" />
        ) : (
          <Button
            text="Ready to go again?"
            onClick={() => decisionParameters.enterOnClick}
          />
        )}
        <Button
          text="Leave Game"
          link="/"
          color="background"
          onClick={decisionParameters.leaveOnClick}
        />
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Decision;
