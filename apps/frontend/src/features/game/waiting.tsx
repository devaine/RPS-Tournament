import React from "react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { type User } from "@/types/gameAPI";
import { useNavigate } from "react-router";
import { useGameContext } from "@/hooks/game-context";
import { PlayerProvider, usePlayerContext } from "@/hooks/player-context";
// TODO: Implement hook to kick the player out once player context = loser
// useEffect to keep track of the player

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

type WaitingProps = {
	enterOnClick: () => void;
	leaveOnClick: () => void;
};

function Waiting({ enterOnClick, leaveOnClick }: WaitingProps) {
	const navigate = useNavigate();

	// Helps change the state of gameState to "Ready" when
	// chonen contestant presses "Ready"
	const { setGameState } = useGameContext();

	const handleGameState = () => {
		setGameState("Ready");
	};

	const handlePlayerState = "Contestant" || "Admin";

	const matchPlayerName = (players: User[]) => {
		for (let i = 0; i < players.length; i++) {
			if (players[i].name === userData.name) {
				return true;
			}
		}
		return false;
	};

	/* Uses previous implementation using useState and sockets to check player state */
	// useEffect(() => {
	// 	const checkQueue = () => {
	// 		socket.emit("playerList", (players: User[]) => {
	// 			if (matchPlayerName(players)) {
	// 				setPlayer(true);
	// 			}
	// 		});
	//
	// 		socket.on("kickPlayer", (firstName: string) => {
	// 			const user_firstName = userData.name;
	// 			if (user_firstName === firstName) {
	// 				localStorage.clear();
	// 				navigate("/");
	// 			}
	// 		});
	// 	};
	//
	// 	setInterval(checkQueue, 100);
	// }, [isPlayer]);

	const disconnectSocket = () => {
		socket.emit("leave_event", {
			name: userData.name,
			id: userData.id,
		});

		// Clears out all local browser data
		localStorage.clear();
	};

	return (
		<PlayerProvider>
			<WaitingRouter />
		</PlayerProvider>
	);
}

const WaitingRouter = () => {
	const { playerState } = usePlayerContext();

	switch (playerState) {
		case "Player":
			return <PlayerScreen />;
		case "Contestant":
			return <ContestantScreen />;
		case "Loser":
			return <LoserScreen />;
	}
};

const PlayerScreen = () => {
	return (
		<GameLayout>
			<Heading text={"Waiting to enter the ring..."} />
			<MultiButtonLayout>
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
};

const ContestantScreen = () => {
	return (
		<GameLayout>
			<Button
				text="Ready?"
				onClick={() => {
					handleGameState();
				}}
			/>
		</GameLayout>
	);
};

const LoserScreen = () => {
	return (
		<GameLayout>
			<Heading text={"It's your time to go..."} />
			<Button
				text="Leave Game"
				onClick={() => {
					nagigate("/");
				}}
			/>
		</GameLayout>
	);
};

export default Waiting;
