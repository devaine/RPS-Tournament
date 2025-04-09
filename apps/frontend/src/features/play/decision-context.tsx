import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file is mostly used as functions to provide a universal way to access landing state (whether it should be set to register or game started)

import type { GameDecision } from "@/types/gameAPI";

type DecisionContextType = {
  decisionState: GameDecision;
  setDecisionState: (newLanding: GameDecision) => void;
};

export const DecisionContext = createContext<DecisionContextType | undefined>(
  undefined,
);

export function DecisionProvider({ children }: { children: React.ReactNode }) {
  const [decisionState, setDecisionState] =
    useState<GameDecision>("Loading...");

  useEffect(() => {
    socket.on("decision_update", (newLanding) => {
      setDecisionState(newLanding);
    });

    // Get initial state from server
    socket.emit("get_initial_decision");

    return () => {
      socket.off("decision_update");
    };
  }, [decisionState]);

  const handleSetDecisionState = (newDecision: GameDecision) => {
    setDecisionState(newDecision);
    // Notify server about the screen change
    socket?.emit("decision_update", newDecision);
  };

  return (
    <DecisionContext.Provider
      value={{
        decisionState: decisionState,
        setDecisionState: handleSetDecisionState,
      }}
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
