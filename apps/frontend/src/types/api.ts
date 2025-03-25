import { type TargetAndTransition } from "framer-motion";

export type User = {
  name: string;
  id: string;
  avatar?: string;
};

export type Icon = {
  id: string;
  url: string;
  alt: string;
};

export type GameScreen = "Waiting" | "Play" | "Decision";

export type GameDecision = "YOU WON !!!" | "YOU LOSE !!!" | "YOU TIED !!!";

export type WaitingParameters = {
  enterOnClick: () => void;
  leaveOnClick: () => void;
};

export type DecisionParameters = WaitingParameters & {
  decision: GameDecision;
};

export type PlayParameters = {
  rockOnClick: () => void;
  paperOnClick: () => void;
  scissorsOnClick: () => void;
};

export type ButtonParameters = {
  text: string;
  type?: "button" | "submit" | "reset";
  color?: "accent" | "background";
  src?: string;
  link?: string;
  size?: 24 | 32;
  isSubmitting?: boolean;
  onClick?: () => void;
  whileTap?: TargetAndTransition;
};
