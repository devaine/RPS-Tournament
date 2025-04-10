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

  useEffect(() => {
    const onWin = () => {
      setDecisionState("YOU WON !!!");
    };
    const onLose = () => {
      setDecisionState("YOU LOSE !!!");
    };
    const onTied = () => {
      setDecisionState("YOU TIED !!!");
    };

    const onDecision = () => {
      socket.on("gameResult", (response: string) => {
        switch (response) {
          case "winner":
            onWin();
            break;
          case "loser":
            onLose();
            break;
          case "tie":
            onTied();
            break;
        }
      });
    };

    onDecision();

    // Cleanup for event listeners
    return () => {
      socket.off("gameResult");
    };
  }, [decisionState]);

  const handleSetDecisionState = (newDecision: GameDecision) => {
    setDecisionState(newDecision);
    // Notify server about the screen change
    socket.emit("decision_update", newDecision);
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
