import React, { useState, createContext, useContext, useEffect } from "react";
import { socket } from "@/features/socketio/init";
import { LobbyScreen } from "@/types/gameAPI";

// NOTE: This file manages the state of lobbyState, in which determines whether the <Lobby/>
// screen is changing from a socket.io listener here.

type LobbyContextType = {
	lobbyState: LobbyScreen | undefined;
	setLobbyState: (newLobby: LobbyScreen) => void;
};

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({ children }: { children: React.ReactNode }) {
	const [lobbyState, setLobbyState] = useState<LobbyScreen>();

	const handleSetLobbyState = (newLobby: LobbyScreen) => {
		setLobbyState(newLobby);
	};

	useEffect(() => {
		const fetchNewState = (newState: LobbyScreen) => {
			localStorage.setItem("queueStatus", newState)
			setLobbyState(newState)
		}

		socket.on("updateLobbyState", fetchNewState)

		return () => {
			socket.off("updateLobbyState", fetchNewState)
		}
	}, [])


	// TODO: Make sure for backend that the queued player rejoins as a player!
	useEffect(() => {
		const queueStatus = localStorage.getItem("queueStatus")
		if (queueStatus === "Queued" || queueStatus === "Waiting") {
			setLobbyState(queueStatus)
		}
	}, [])

	return (
		<LobbyContext.Provider
			value={{ lobbyState: lobbyState, setLobbyState: handleSetLobbyState }}
		>
			{children}
		</LobbyContext.Provider>
	);
}

export const useLobbyContext = () => {
	const context = useContext(LobbyContext);
	if (context === undefined) {
		throw new Error("useLobbyContext() must be used within a LobbyProvider");
	}
	return context;
};
