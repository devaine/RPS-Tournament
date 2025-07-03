import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

function Kicked() {
  // TODO: This could be much more efficient, especially for kicking players
  // could be a try-catch statement
  const disconnectSocket = () => {
    socket.emit("leave_event", {
      name: userData.name,
      id: userData.id,
    });

    // Clears out all local browser data
    localStorage.clear();
  };

  return (
    <GameLayout>
      <Heading text={"You've been kicked out of the game."} />
      <MultiButtonLayout>
        <Button
          text="Leave Game"
          link="/"
          color="background"
          onClick={disconnectSocket}
        />
      </MultiButtonLayout>
    </GameLayout>
  );
}

export default Kicked;
