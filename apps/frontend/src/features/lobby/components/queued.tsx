// UI Imports
import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

type QueuedProps = {
  readyOnClick: () => void;
  leaveOnClick: () => void;
};

function Queued({ readyOnClick, leaveOnClick }: QueuedProps) {
  return (
    <GameLayout>
      <Heading text={"YOU'RE IN QUEUE BUDDY BOY"} />
      <MultiButtonLayout>
        <Button text="Ready?" onClick={readyOnClick} />
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

export default Queued;
