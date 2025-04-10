import React from "react";
import Router from "./router";
import { LandingProvider } from "@/features/context/landing-context";
import { DecisionProvider } from "@/features/context/decision-context";
import { GameProvider } from "@/features/context/game-context";

const App = () => {
  return (
    <div>
		<LandingProvider>
			<DecisionProvider>
				<GameProvider>
					<Router />
				</GameProvider>
			</DecisionProvider>
		</LandingProvider>
    </div>
  );
};

export default App;
