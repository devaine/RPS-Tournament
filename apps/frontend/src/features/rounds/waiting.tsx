import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import type { WaitingParameters } from "@/types/api";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

function Waiting(waitingParameters: WaitingParameters) {
  return (
    <GameLayout>
      <Heading text={"Waiting to enter the ring..."} />
      <MultiButtonLayout>
        <Button text="Ready?" onClick={waitingParameters.enterOnClick} />
        <Button
          text="Go to Dashboard"
          link="/game/dashboard"
          onClick={waitingParameters.leaveOnClick}
        />
        <Button
          text="Leave Game"
          link="/"
          color="background"
          onClick={waitingParameters.leaveOnClick}
        />
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Waiting;
