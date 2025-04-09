import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file is mostly used as functions to provide a universal way to access landing state (whether it should be set to register or game started)

import type { LandingScreen } from "@/types/gameAPI";

type LandingContextType = {
  landingState: LandingScreen;
  setLandingState: React.Dispatch<React.SetStateAction<LandingScreen>>;
  // Add other context values here if needed
};

export const LandingContext = createContext<LandingContextType | undefined>(
  undefined,
);

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [landingState, setLandingState] = useState<LandingScreen>("Register");

  useEffect(() => {
    socket.on("landing_update", (newLanding) => {
      setLandingState(newLanding);
    });

    return () => {
      socket.off("landing_update");
    };
  }, [landingState]);

  return (
    <LandingContext.Provider value={{ landingState, setLandingState }}>
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
