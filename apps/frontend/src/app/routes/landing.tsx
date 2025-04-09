import React, { useEffect, useState } from "react";
import { Title } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import RegisterScreen from "@/features/auth/register";
import { GameStartedScreen, LandingContext } from "@/features/game/start";

// Backend Imports
import { socket } from "@/features/socketio/init";
import type { LandingScreen } from "@/types/gameAPI";

const Landing = () => {
  const [landingScreen, setLandingScreen] = useState<LandingScreen>("Register");

  useEffect(() => {
    socket.on("landing_update", (newLanding) => {
      setLandingScreen(newLanding);
    });

    return () => {
      socket.off("landing_update");
    };
  }, [landingScreen]);

  const updateLanding = (newLanding: LandingScreen) => {
    socket.emit("set_landing", newLanding);
  };

  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>
      <LandingContext.Provider value={{ updateLanding }}>
        {landingScreen === "Register" && <RegisterScreen />}
        {landingScreen === "Game Started" && <GameStartedScreen />}
      </LandingContext.Provider>
    </RegisterLayout>
  );
};

export default Landing;
