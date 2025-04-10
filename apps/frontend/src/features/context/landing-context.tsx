import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file is mostly used as functions to provide a universal way to access landing state (whether it should be set to register or game started)

import type { LandingScreen } from "@/types/gameAPI";

type LandingContextType = {
  landingState: LandingScreen | undefined;
  setLandingState: (newLanding: LandingScreen | undefined) => void;
};

export const LandingContext = createContext<LandingContextType | undefined>(
  undefined,
);

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [landingState, setLandingState] = useState<LandingScreen>();

  useEffect(() => {
    socket.on("landing_update", (newLanding) => {
      setLandingState(newLanding);
    });

    // Get initial state from server
    socket.emit("get_initial_landing");

    return () => {
      socket.off("landing_update");
    };
  }, [landingState]);

  const handleSetLandingState = (newLanding: LandingScreen | undefined) => {
    setLandingState(newLanding);
    // Notify server about the screen change
    socket.emit("decision_update", newLanding);
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
