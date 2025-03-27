import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

type WaitingProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

function Waiting({ enterOnClick, leaveOnClick }: WaitingProps) {
  return (
    <GameLayout>
      <Heading text={"Waiting to enter the ring..."} />
      <MultiButtonLayout>
        <Button text="Ready?" onClick={enterOnClick} />
        <Button
          text="Go to Dashboard"
          link="/game/dashboard"
          onClick={leaveOnClick}
        />
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
export default Waiting;
