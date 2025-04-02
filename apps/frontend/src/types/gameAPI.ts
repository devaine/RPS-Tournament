export type User = {
  name: string;
  id: number;
  avatar?: string;
  status?: string;
  choice?: string;
};

export type Icon = {
  id: number;
  url: string;
  alt: string;
};

export type AdminScreen = "Login" | "Admin";

export type LandingScreen = "Register" | "Game Started";

export type GameScreen = "Waiting" | "Play" | "Decision";

export type GameDecision = "YOU WON !!!" | "YOU LOSE !!!" | "YOU TIED !!!";
