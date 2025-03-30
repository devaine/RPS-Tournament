export type User = {
  name: string;
  id: number;
  avatar?: string;
};

export type Icon = {
  id: number;
  url: string;
  alt: string;
};

export type GameScreen = "Waiting" | "Play" | "Decision";

export type GameDecision = "YOU WON !!!" | "YOU LOSE !!!" | "YOU TIED !!!";
