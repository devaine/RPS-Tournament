import React from "react";
import { Title, Heading, Versus } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

// NOTE: This is a placeholder
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-2 m-4">
      <div className="text-center">
        <Title text="Dashboard" />
      </div>
      <div className="border-box my-2">
        <hr className="h-1 border-t-0 bg-neutral-100 dark:bg-accent" />
      </div>
      <div className="flex flex-col gap-4 max-w-screen">
        <div className="flex flex-col gap-2">
          <div className="text-center">
            <Heading text="Winner's Bracket" />
          </div>
          <TextBoxLayout>
            <Versus text1="Player 1" text2="Player 2" />
            <Versus text1="Player 1" text2="Player 2" />
            <Versus text1="Player 1" text2="Player 2" />
          </TextBoxLayout>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-center">
            <Heading text="Loser's Bracket" />

          </div>
          <TextBoxLayout>

            <Versus text1="Player 1" text2="Player 2" />
            <Versus text1="Player 1" text2="Player 2" />
            <Versus text1="Player 1" text2="Player 2" />
          </TextBoxLayout>

        </div>

      </div>
    </div>
  )
}

export default Dashboard;
