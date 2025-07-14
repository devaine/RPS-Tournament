import React from "react";
import { Announce } from "@/components/ui/text";
import { GameLayout } from "@/components/layouts/game-layout";
import { Button } from "@/components/ui/button";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { useDecisionContext } from "@/hooks/decision-context";
import { useGameContext } from "@/hooks/game-context";

type DecisionProps = {
	enterOnClick: () => void;
	leaveOnClick: () => void;
};

function Decision({ leaveOnClick }: DecisionProps) {
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
					<MultiButtonLayout>
						<Button text="Go to Dashboard" link="/dashboard" />
						<Button
							text="Leave Game"
							link="/"
							color="background"
						/>
					</MultiButtonLayout>
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
