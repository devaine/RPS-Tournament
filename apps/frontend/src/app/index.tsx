import React from "react";
import Router from "./router";
import { DecisionProvider } from "@/hooks/decision-context";
import { GameProvider } from "@/hooks/game-context";
import { PlayerProvider } from "@/hooks/player-context";
/* DecisionProvider to set decisions for each player
 *
 * GameProvider to change game screen for each player when socketio emits changes
 * */

const App = () => {
	return (
		<PlayerProvider>
			<DecisionProvider>
				<GameProvider>
					<Router />
				</GameProvider>
			</DecisionProvider>
		</PlayerProvider>
	);
};

export default App;
