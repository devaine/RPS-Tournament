import React from "react";
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

function disconnectSocket() {
  socket.emit("leave_event", {
    name: userData.name,
    id: userData.id,
  });

	// Disconnect
	socket.disconnect()

  // Clears out all local browser data
  localStorage.clear();
}

function Waiting({ enterOnClick, leaveOnClick }: WaitingProps) {
	// If not connected, connect automatically
	if(socket.disconnect()) {
		socket.connect();
		socket.emit("join_event", {
			name: userData.name,
			id: userData.id
	})
}

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
          onClick={disconnectSocket}
        />
      </MultiButtonLayout>
    </GameLayout>
  );
}
export default Waiting;
