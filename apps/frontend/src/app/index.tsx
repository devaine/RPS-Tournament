import React from "react";
import Router from "./router";
import { DecisionProvider } from "@/hooks/decision-context";
import { GameProvider } from "@/hooks/game-context";

const App = () => {
	return (
		<div>
			<DecisionProvider>
				<GameProvider>
					<Router />
				</GameProvider>
			</DecisionProvider>
		</div>
	);
};

export default App;
