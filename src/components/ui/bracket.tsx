import React from "react";
import { Heading, Versus } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

const Bracket = ({
  bracketText,
  playerList,
}: {
  bracketText: string;
  playerList: Map<string, string>;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <Heading text={bracketText} />
        </div>
        <TextBoxLayout>
          {playerList.map((player1, player2) => {
            return <Versus key={player1} text1={player1} text2={player2} />;
          })}
        </TextBoxLayout>
      </div>
    </div>
  );
};

export default Bracket;
