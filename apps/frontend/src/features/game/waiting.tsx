import React from "react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { type User } from "@/types/gameAPI";
import { useNavigate } from "react-router";

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
	const navigate = useNavigate()

  const matchPlayerName = (players: User[]) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === userData.name) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const checkQueue = () => {
      socket.emit("playerList", (players: User[]) => {
        if (matchPlayerName(players)) {
          setPlayer(true);
        }
      });

			socket.on("kickPlayer", (firstName: string) => {
				const user_firstName = userData.name
				if (user_firstName === firstName) {
					localStorage.clear()	
					socket.disconnect()
					navigate("/")
				}
			})

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
