import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";
import { type UserStatus } from "@/types/gameAPI";
import { userData } from "@/config/global";

// NOTE: This file manages the state of playerState to 

type PlayerContextType = {
	playerState: UserStatus | undefined;
	setPlayerState: (newPlayer: UserStatus) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(
	undefined,
);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
	const [playerState, setPlayerState] = useState<UserStatus>();

	// ("Loser", "Admin", "Contestant", "Winner")
	try {
		const status: UserStatus = localStorage.getItem("status") as UserStatus

		const ifNotAdmin = !(status.includes("Admin"))
		const ifNotLoser = !(status.includes("Loser"))
		const ifContestant = status.includes("Contestant")

		if ((ifNotAdmin || ifNotLoser) && ifContestant) {
			socket.emit("join_event", {
				name: userData.name,
				id: userData.id,
				avatar: userData.avatar,
				choice: userData.choice,
				status: status,
			});
			console.log("joined game!!")
		}

	} catch {
		console.log("Client doesn't have any player data! Resuming...")
	}



	const handleSetPlayerState = (newPlayer: UserStatus | undefined) => {
		setPlayerState(newPlayer);
	};

	return (
		<PlayerContext.Provider
			value={{ playerState: playerState, setPlayerState: handleSetPlayerState }}
		>
			{children}
		</PlayerContext.Provider>
	);
}

export const usePlayerContext = () => {
	const context = useContext(PlayerContext);
	return context;
};
