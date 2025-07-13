// UI Imports
import React from "react";
import { useEffect, useState } from "react";

// Screen Imports
import Queued from "@/features/lobby/components/queued";
import Waiting from "@/features/lobby/components/waiting";

// API Imports
import { useGameContext } from "@/hooks/game-context";
import { useLobbyContext } from "@/hooks/lobby-context";
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

const Lobby = () => {
	return (
		<LobbyRouter />
	)
}

const LobbyRouter = () => {
	const { lobbyState } = useLobbyContext();
	const { setGameState } = useGameContext();

	function readyUp() {
		setGameState("Ready")
	}

	function disconnectSocket() {
		socket.emit("leave_event", {
			name: userData.name,
			id: userData.id,
		});

		// Clears out all local browser data
		localStorage.clear();
		console.log('left event!!')
	}

	switch (lobbyState) {
		case "Queued":
			return <Queued readyOnClick={readyUp} leaveOnClick={disconnectSocket} />;
		case "Waiting":
			return <Waiting leaveOnClick={disconnectSocket} />;
		default:
			return <Waiting leaveOnClick={disconnectSocket} />;

	}

}

export default Lobby;
