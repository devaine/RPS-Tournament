import React from "react";
import Play from "@/features/play/play";
import Waiting from "@/features/game/waiting";
import Decision from "@/features/play/decision";
import End from "@/features/game/end";
import Ready from "@/features/play/ready";
import type { GameScreen } from "@/types/gameAPI";
import type { GameChoices } from "@/types/gameAPI";
import { GameProvider, useGameContext } from "@/features/context/game-context";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import { DecisionProvider } from "@/features/context/decision-context";

// TODO: Add user as parameter for game to function
const Game = () => {
	return (
		<GameProvider>
			<GameRouter />
		</GameProvider>
	);
};

const GameRouter = () => {
	const { gameState, setGameState } = useGameContext();

	switch (gameState) {
		case "Waiting":
			return (
				<Waiting
					key="Waiting"
					leaveOnClick={() => { }}
					enterOnClick={async () => {
						setGameState("Ready");
						socket.emit("set_decision", "YOU WON !!!");
						setGameState((await gameSync()) as GameScreen); // Settles for one game
						setGameState((await gameSyncRetry()) as GameScreen); // Settles for ties
					}}
				/>
			);
		case "Ready":
			return <Ready />;
		case "Play":
			/* All onCLicks set user choice, activate play socket event listener, and set screen to decision */
			return (
				<Play
					key="Play"
					// TODO: Backend: Refactor for promises
					rockOnClick={() => {
						getPlayerChoice("rock");
						setGameState("Decision");
					}}
					paperOnClick={() => {
						getPlayerChoice("paper");
						setGameState("Decision");
					}}
					scissorsOnClick={() => {
						getPlayerChoice("scissors");
						setGameState("Decision");
					}}
				/>
			);
		case "Decision":
			return (
				<DecisionProvider>
					<Decision
						key="Decision"
						enterOnClick={() => {
							setGameState("Ready");
						}}
						leaveOnClick={() => {
							setGameState("Waiting");
						}}
					/>
				</DecisionProvider>
			);
		case "End":
			return <End />;
		default:
			return (
				<Waiting
					key="Waiting"
					leaveOnClick={() => { }}
					enterOnClick={async () => {
						setGameState("Ready");
						socket.emit("set_decision", "YOU WON !!!");
						setGameState((await gameSync()) as GameScreen); // Settles for one game
						setGameState((await gameSyncRetry()) as GameScreen); // Settles for ties
					}}
				/>
			);
	}
};

function gameSync() {
	return new Promise((resolve) => {
		socket.emit("playerReady");
		socket.on("gameSync", (response): GameScreen => {
			resolve(response);
			return response;
		});

		socket.on("tie_retry", () => { });
	});
}

function gameSyncRetry() {
	return new Promise((resolve) => {
		socket.on("retrySync", (response): GameScreen => {
			resolve(response);
			return response;
		});
	});
}

function getPlayerChoice(choice: GameChoices) {
	userData.choice = choice;
	socket.emit("play", userData.choice);
}

export default Game;
