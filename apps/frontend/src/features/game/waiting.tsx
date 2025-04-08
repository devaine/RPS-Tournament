import React from "react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

// NOTE: Backend: Figure out what to do here on the props
type WaitingProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

function Waiting({ enterOnClick, leaveOnClick }: WaitingProps) {
  const [isPlayer, setPlayer] = useState(false);

  console.log(userData);

  useEffect(() => {
    const checkQueue = () => {
      socket.emit("playerList", (playerNames: string[]) => {
        if (playerNames.includes(userData.name)) {
          setPlayer(true);
        }
      });
    };

    setInterval(checkQueue, 1000);
  }, [socket]);

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
      <Heading text={"Waiting to enter the ring..."} />
      <MultiButtonLayout>
        {isPlayer && (
          <Button
            text="Ready?"
            onClick={() => {
              enterOnClick();
            }}
          />
        )}
        <Button
          text="Go to Dashboard"
          link="/dashboard"
          onClick={leaveOnClick}
        />
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
export default Waiting;
