import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router";
import { socket } from "@/features/socketio/init";
import { LobbyScreen, type UserStatus } from "@/types/gameAPI";
import { userData } from "@/config/global";

// NOTE: This file manages the state of playerState in order to determine
// whether is a player's constant data (from localStorage) determines if they're a
// contestant or not.

type PlayerContextType = {
	playerState: UserStatus | undefined;
	setPlayerState: (newPlayer: UserStatus) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
	const [playerState, setPlayerState] = useState<UserStatus>();
	// FIX: useNavigate() may be used only in the context of a <Router> component.
	//const navigate = useNavigate();

	admitUser();

	// TODO: Kicking players should be here, as it kicks players across the entire
	// application, although it should refined more.
	socket.on("kickPlayer", (firstName: string) => {
		const user_firstName = userData.name;
		if (user_firstName === firstName) {
			localStorage.clear();
			//navigate("/");
		}
	});

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

const admitUser = () => {
	// ("Loser", "Admin", "Contestant", "Winner")

	try {
		// Status begings as null, breaks program if it doesn't exist
		const status: UserStatus = localStorage.getItem("status") as UserStatus;
		const queueStatus = localStorage.getItem("queueStatus") as LobbyScreen;

		const ifNotAdmin = !status.includes("Admin");
		const ifNotLoser = !status.includes("Loser");
		const ifContestant = status.includes("Contestant");
		const ifPlayer = queueStatus.includes("Queued")

		if ((ifNotAdmin || ifNotLoser) && ifContestant && !(ifPlayer)) {
			socket.emit("join_event", {
				name: userData.name,
				id: userData.id,
				avatar: userData.avatar,
				choice: userData.choice,
				status: status,
			});
			console.log("joined game!!");
		}

		if (ifPlayer && ifNotLoser) {
			socket.emit("player_join", {
				name: userData.name,
				id: userData.id,
				avatar: userData.avatar,
				choice: userData.choice,
				status: userData.status
			})
			console.log("joined as contestant!")
		}
	} catch {
		console.log("Client doesn't have any player data! Resuming...");
	}
};

export const usePlayerContext = () => {
	const context = useContext(PlayerContext);
	return context;
};
