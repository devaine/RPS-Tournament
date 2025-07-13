/* INFO: This file:
 * Helps modulate the code for hosting the game
 * Defines the types used for sending messages and/or receiving messages from the frontend.
 */

// IMPORTS
import dotenv from "dotenv";

// Grabs from root of project to determine URL and Port used.
dotenv.config({ path: ["../../.env"] });

// NOTE: Hosting Variables
export const PORT = 3002;
export const URL =
  process.env.DEV_URL || process.env.PROD_URL || "http://localhost:5173";

// NOTE: Game Variables
export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export type LandingScreen = "Register" | "Game Started";

export type GameScreen = "Lobby" | "Play" | "Decision" | "End" | "Ready";

export type LobbyScreen = "Waiting" | "Queued" | "Kicked";

export type GameChoices = "Rock" | "Paper" | "Scissors";

export type GameDecision =
  | "YOU WON !!!"
  | "YOU LOSE !!!"
  | "YOU TIED !!!"
  | "...";
