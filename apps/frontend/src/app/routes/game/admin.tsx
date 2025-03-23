import React from "react";
import { Title, Heading, Text, Statistic } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Dashboard from "@/app/routes/game/dashboard";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

// NOTE: This is a placeholder
export const Admin = () => {
  return (
    <div className="flex flex-col items-between m-4">
      <div className="text-center">
        <Title text="ROCK PAPER SCISSORS ADMIN" />
      </div>
      <div className="flex min-w-screen gap-8">
        <div className="flex flex-col basis-2/3 gap-4">
          <Heading text="Management" />
          <div className="flex flex-col gap-2">
            <Text text="Round" />
            <div className="flex gap-4">
              <Button text="Start Round" onclick={() => {}} />
              <Button text="Fix Tie(s)" onclick={() => {}} />
            </div>
            <Text text="Game" />
            <div className="flex gap-4">
              <Button text="Start" onclick={() => {}} />
              <Button text="Pause" onclick={() => {}} />
              <Button text="End" onclick={() => {}} />
            </div>
          </div>
          <Heading text="Statistics" />
          <TextBoxLayout>
            <Statistic text1="Round" text2="0" />
            <Statistic text1="Players in Winners's Bracket" text2="0" />
            <Statistic text1="Current Ties in Winner's Bracket" text2="0" />
            <Statistic text1="Players in Loser's Bracket" text2="0" />
            <Statistic text1="Current Ties in Loser's Bracket" text2="0" />
            <Statistic text1="Lost Players" text2="0" />
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
