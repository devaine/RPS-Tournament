import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";
import type { GameDecision } from "@/types/gameAPI";

type DecisionContextType = {
	decisionState: GameDecision;
	setDecisionState: (newDecision: GameDecision) => void;
};

export const DecisionContext = createContext<DecisionContextType | undefined>(
	undefined,
);

export function DecisionProvider({ children }: { children: React.ReactNode }) {
	const [decisionState, setDecisionState] = useState<GameDecision>("...");

	// NOTE: This waits for a response from the backend
	// to determine the Winner and Loser
	useEffect(() => {
		const onResult = (response: string) => {
			switch (response) {
				case "Winner":
					setDecisionState("YOU WON !!!");
					break;
				case "Loser":
					setDecisionState("YOU LOSE !!!");
					break;
				case "Tie":
					setDecisionState("YOU TIED !!!");
					break;
			}
		}

		socket.on("decisionResult", onResult)

		return () => {
			socket.off("decisionResult", onResult);
		};
	}, []);

	const handleSetDecisionState = (newDecision: GameDecision) => {
		setDecisionState(newDecision);
	};

	return (
		<DecisionContext.Provider
			value={{ decisionState, setDecisionState: handleSetDecisionState }}
		>
			{children}
		</DecisionContext.Provider>
	);
}

export const useDecisionContext = () => {
	const context = useContext(DecisionContext);
	if (context === undefined) {
		throw new Error("useDecisionContext must be used within a LandingProvider");
	}
	return context;
};
