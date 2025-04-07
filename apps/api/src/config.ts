// SERVER VARIABLES
export const PORT = 3001;
export const FRONTEND_PORT = 5173;
export const URL = "http://localhost";

export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export type GameChoices = "rock" | "paper" | "scissors" | "";
