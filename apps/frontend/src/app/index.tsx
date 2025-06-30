import React from "react";
import Router from "./router";
import { DecisionProvider } from "@/hooks/decision-context";
import { GameProvider } from "@/hooks/game-context";

/* DecisionProvider to set decisions for each player
 *
 * GameProvider to change game screen for each player when socketio emits changes
 * */

const App = () => {
  return (
    <DecisionProvider>
      <GameProvider>
        <Router />
      </GameProvider>
    </DecisionProvider>
  );
};

export default App;
