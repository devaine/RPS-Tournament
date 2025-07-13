import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

// NOTE: Backend not done yet, soz

import { socket } from "@/features/socketio/init";
import { useDecisionContext } from "@/hooks/decision-context";
import { useGameContext } from "@/hooks/game-context";

type DecisionProps = {
	enterOnClick: () => void;
	leaveOnClick: () => void;
};

function Decision({ enterOnClick, leaveOnClick }: DecisionProps) {
	const { decisionState } = useDecisionContext();
	const { setGameState } = useGameContext();

	function readyUp() {
		setGameState("Ready")
	}

	return (
		<GameLayout key="Decision">
			<Announce text={decisionState} />
			<MultiButtonLayout>
				{decisionState === "YOU LOSE !!!" && (
					<Button
						text="Leave Game"
						link="/"
						color="background"
						onClick={() => {
							// Resets player's data in frontend 
							// and protected route moves them to Landing
							localStorage.clear()
						}}
					/>
				)}
				{decisionState === "YOU TIED !!!" && (
					<Button
						text="Ready to go again?"
						onClick={readyUp}
					/>
				)}
				{decisionState === "YOU WON !!!" && (
					<Button text="Return to Lobby" onClick={leaveOnClick} />
				)}
			</MultiButtonLayout>
		</GameLayout>
	);
}
export default Decision;
