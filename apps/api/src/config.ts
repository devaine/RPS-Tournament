// SERVER VARIABLES
export const PORT = 3001;
export const URL = "https://rps-dev.devdoes.work";
// export const URL = "http://10.162.167.86"; // For LSC testing

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
