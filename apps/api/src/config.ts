// SERVER VARIABLES
export const PORT = 3002;
export const URL = "https://rps.devdoes.work";
//export const URL = "http://localhost:5173"

export type LandingScreen = "Register" | "Game Started";

export type GameScreen = "Waiting" | "Play" | "Decision" | "End" | "Ready";

export type GameDecision =
  | "YOU WON !!!"
  | "YOU LOSE !!!"
  | "YOU TIED !!!"
  | "...";

export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export type GameChoices = "rock" | "paper" | "scissors" | "";
