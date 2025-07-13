import React from "react";
import Play from "@/features/play/play";

import Lobby from "@/features/lobby/components/lobby";
import Decision from "@/features/play/decision";
import type { GameChoices } from "@/types/gameAPI";
import { DecisionProvider } from "@/hooks/decision-context";
import { LobbyProvider } from "@/hooks/lobby-context";
import { useGameContext } from "@/hooks/game-context";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import Ready from "@/features/play/ready";

/* NOTE: What this file does:
 * Basically, its a subrouter for the other pages of the website.
 * Uses the context from `hooks/game-context`
 * to determine the current state of the page
 */

// TODO: Add user as parameter for game to function
const Game = () => {
	return <GameRouter />;
};

// TODO: This is messy. Try to use hooks for enterOnClick so make it much more readable.

const GameRouter = () => {
	const { gameState, setGameState } = useGameContext();

	switch (gameState) {
		case "Lobby": // Menu for dashboard and Leaving the game... (default)
			return (
				<LobbyProvider>
					<Lobby key="Lobby" />
				</LobbyProvider>
			);
		case "Ready": // "Waiting for Opponent..."
			return (
				<Ready />
			)
		case "Play": // Actual Rock-Paper-Scissors game
			/* All onClicks set user choice, activate play socket event listener, and set screen to decision */
			return (
				<Play
					key="Play"
					rockOnClick={() => {
						sendPlayerChoice("Rock");
						setGameState("Decision");
					}}
					paperOnClick={() => {
						sendPlayerChoice("Paper");
						setGameState("Decision");
					}}
					scissorsOnClick={() => {
						sendPlayerChoice("Scissors");
						setGameState("Decision");
					}}
				/>
			);
		case "Decision": // "..." (waits for backend to declare the winner)
			return (
				<DecisionProvider>
					<Decision
						key="Decision"
						enterOnClick={() => {
							setGameState("Ready");
						}}
						leaveOnClick={() => {
							setGameState("Lobby");
						}}
					/>
				</DecisionProvider>
			);
		default:
			return (
				<LobbyProvider>
					<Lobby key="Lobby" />
				</LobbyProvider>
			);
	}
};

// Emits just to send the choice data.
function sendPlayerChoice(choice: GameChoices) {
	userData.choice = choice;
	socket.emit("Play", userData.choice);
}

export default Game;
