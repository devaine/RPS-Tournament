import React from "react";
import { Title, Heading, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Dashboard from "@/app/routes/game/dashboard";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

export const Admin = () => {
  /* NOTE: Start not only starts the game but prevents new players from joining */

  return (
    <div className="flex flex-col items-between">
      <div className="text-center">
        <Title text="ROCK PAPER SCISSORS ADMIN" />
      </div>
      <div className="flex min-w-screen gap-8 p-4">
        <div className="flex flex-col basis-1/3 gap-4">
          <Heading text="Management" />
          <div className="flex flex-col gap-2">
            <Text text="Round" />
            <MultiButtonLayout horizontal={true}>
              <Button text="Start Round" onClick={() => { }} />
              <Button text="Fix Tie" onClick={() => { }} />
            </MultiButtonLayout>
            <Text text="Game" />
            <MultiButtonLayout horizontal={true}>
              <Button text="Start" onClick={() => { }} />
              <Button text="Pause" onClick={() => { }} />
              <Button text="End" color="background" onClick={() => { }} />
            </MultiButtonLayout>
          </div>
        </div>
        <div className="basis-full">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Admin;
