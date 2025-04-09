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
  const [decisionState, setDecisionState] =
    useState<GameDecision>("Loading...");

  useEffect(() => {
    socket.on("set_decision", (newLanding) => {
      setDecisionState(newLanding);
    });

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
