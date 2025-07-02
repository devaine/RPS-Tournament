export type User = {
  name: string;
  id: number;
  avatar: string;
  status?: UserStatus;
  choice?: GameChoices;
};

export type Icon = {
  id: number;
  url: string;
  alt: string;
};

export type UserStatus = "Player" | "Contestant" | "Loser" | "Admin" | "Winner";

export type AdminScreen = "Login" | "Admin";

export type LandingScreen = "Register" | "Game Started";

export type GameScreen = "Waiting" | "Play" | "Decision" | "Ready";

export type GameDecision =
  | "YOU WON !!!"
  | "YOU LOSE !!!"
  | "YOU TIED !!!"
  | "...";

export type GameChoices = "Rock" | "Paper" | "Scissors" | "";
