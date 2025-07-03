import React from "react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { type User } from "@/types/gameAPI";
import { useNavigate } from "react-router";
import { useGameContext } from "@/hooks/game-context";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

// NOTE: Backend: Figure out what to do here on the props
type QueuedProps = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

function Waiting({ enterOnClick, leaveOnClick }: QueuedProps) {
  // TODO: This should be moved to game-context or to a different hook file.

  const [isPlayer, setPlayer] = useState(true);
  const navigate = useNavigate();

  // Helps change the state of gameState to "Ready" when
  // chonen contestant presses "Ready"
  const { setGameState } = useGameContext();

  const handleGameState = () => {
    setGameState("Ready");
  };

  const matchPlayerName = (players: User[]) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === userData.name) {
        return true;
      }
    }
    return false;
  };

  // TODO: This could be much more efficient, especially for kicking players
  // could be a try-catch statement
  useEffect(() => {
    const checkQueue = () => {
      socket.emit("playerList", (players: User[]) => {
        if (matchPlayerName(players)) {
          setPlayer(true);
        }
      });

      socket.on("kickPlayer", (firstName: string) => {
        const user_firstName = userData.name;
        if (user_firstName === firstName) {
          localStorage.clear();
          navigate("/");
        }
      });
    };

    setInterval(checkQueue, 100);
  }, [isPlayer]);

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
      <Heading text={"YOU'RE IN QUEUE BUDDY BOY"} />
      <MultiButtonLayout>
        <Button
          text="Ready?"
          onClick={() => {
            handleGameState();
          }}
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
