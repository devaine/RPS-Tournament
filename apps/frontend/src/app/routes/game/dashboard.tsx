import React from "react";
import { Title, Heading, Versus } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";

// NOTE: This is a placeholder
const Dashboard = () => {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-2 m-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
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
    </TextLayout>
  );
};

export default Dashboard;
