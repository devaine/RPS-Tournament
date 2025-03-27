import React from "react";
import { Title, Heading, Text, Statistic } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Dashboard from "@/app/routes/game/dashboard";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

// NOTE: This is a placeholder
export const Admin = () => {
  return (
    <div className="flex flex-col items-between">
      <div className="text-center">
        <Title text="ROCK PAPER SCISSORS ADMIN" />
      </div>
      <div className="flex min-w-screen gap-8 p-4">
        <div className="flex flex-col basis-2/3 gap-4">
          <Heading text="Management" />
          <div className="flex flex-col gap-2">
            <Text text="Round" />
            <div className="flex gap-4">
              <Button text="Start Round" onClick={() => {}} />
              <Button text="Fix Tie" onClick={() => {}} />
            </div>
            <Text text="Game" />
            <div className="flex gap-4">
              <Button text="Start" onClick={() => {}} />
              <Button text="Pause" onClick={() => {}} />
              <Button text="End" color="background" onClick={() => {}} />
            </div>
          </div>
          <Heading text="Statistics" />
          <TextBoxLayout>
            <Statistic text="Round" text2="0" />
            <Statistic text="Players in Winners's Bracket" text2="0" />
            <Statistic text="Current Ties in Winner's Bracket" text2="0" />
            <Statistic text="Players in Loser's Bracket" text2="0" />
            <Statistic text="Current Ties in Loser's Bracket" text2="0" />
            <Statistic text="Lost Players" text2="0" />
          </TextBoxLayout>
        </div>
        <div className="basis-full">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Admin;
