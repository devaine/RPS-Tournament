// SERVER VARIABLES
export const PORT = 3001;
export const FRONTEND_PORT = 5173;
export const URL = "http://localhost";
// const URL = "http://10.162.167.86"; // For LSC testing

export type LandingScreen = "Register" | "Game Started";
export type GameDecision =
  | "YOU WON !!!"
  | "YOU LOSE !!!"
  | "YOU TIED !!!"
  | "Loading...";

// Global variable for setting landing screen
export let landingScreen: LandingScreen = "Register";

export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export type GameChoices = "rock" | "paper" | "scissors" | "";
