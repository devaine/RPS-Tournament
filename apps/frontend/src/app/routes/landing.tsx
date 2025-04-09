import React from "react";
import { Title } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import RegisterScreen from "@/features/auth/register";
import { GameStartedScreen } from "@/features/game/start";
import {
  LandingProvider,
  useLandingContext,
} from "@/features/game/landing-context";

const Landing = () => {
  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>
      <LandingProvider>
        <LandingRouter />
      </LandingProvider>
    </RegisterLayout>
  );
};

const LandingRouter = () => {
  const { landingState } = useLandingContext();

  switch (landingState) {
    case "Register":
      return <RegisterScreen />;
    case "Game Started":
      return <GameStartedScreen />;
    default:
      return <RegisterScreen />;
  }
};

export default Landing;
