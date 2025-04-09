import React, { useState, createContext, useContext } from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

// NOTE: This file is mostly used as functions relating to what happens when game is starting + tsx for what to show when it starts
// Mostly affects landing page

import type { LandingScreen } from "@/types/gameAPI";

type LandingContextType = {
  updateLanding: (newValue: LandingScreen) => void; // Adjust the type as needed
  // Add other context values here if needed
};

export const LandingContext = createContext<LandingContextType | undefined>(
  undefined,
);

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [landingState, setLandingState] = useState<LandingScreen>("Register");

  const updateLanding = (newValue: LandingScreen) => {
    setLandingState(newValue);
    // Add any socket.io logic here if needed
  };

  return (
    <LandingContext.Provider value={{ updateLanding }}>
      {children}
    </LandingContext.Provider>
  );
}

export const GameStartedScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading text="The tournament has begun!" />
      <Button text="View Dashboard" link="/dashboard" />
    </div>
  );
};

export const useLandingContext = () => {
  const context = useContext(LandingContext);
  if (context === undefined) {
    throw new Error("useLandingContext must be used within a LandingProvider");
  }
  return context;
};
