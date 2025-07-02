import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file finds the current status of the game,
// which is either "Register" OR "Game Started"
// from the backend

type LandingScreen = "Register" | "Game Started"

type LandingContextType = {
	landingState: LandingScreen | undefined;
	setLandingState: (newLanding: LandingScreen) => void;
};

const LandingContext = createContext<LandingContextType | undefined>(
	undefined,
);

// NOTE: This function creates a socket.io listener AND emits to socket.io backend ONCE
// to grab the current status of the game in case if the game started already.
export function LandingProvider({ children }: { children: React.ReactNode }) {
	const [landingState, setLandingState] = useState<LandingScreen>();

	useEffect(() => {
		// Emits once to grab the current status of the game. 
		// POSSIBLE VALUES: (Register | Game Started)
		socket.emit("getLandingState", (response: LandingScreen) => {
			setLandingState(response)
		});

		// If backend updates the landing state, the updated state goes here:
		socket.on("updateLandingState", (message: LandingScreen) => {
			setLandingState(message)
		})

		return () => {
			socket.off("updateLandingState");
		};
	}, [landingState]);

	const handleSetLandingState = (newLanding: LandingScreen | undefined) => {
		setLandingState(newLanding);
	};

	return (
		<LandingContext.Provider
			value={{ landingState, setLandingState: handleSetLandingState }}
		>
			{children}
		</LandingContext.Provider>
	);
}

export const useLandingContext = () => {
	const context = useContext(LandingContext);
	if (context === undefined) {
		throw new Error("useLandingContext must be used within a LandingProvider");
	}
	return context;
};
