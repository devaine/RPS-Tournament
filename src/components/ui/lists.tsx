import React from "react";
import { Heading, Text } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

export const PlayerList = ({
  header: header,
  players: players,
}: {
  header: string;
  players: object;
}) => {

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <Heading text={header} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {
          // Use parentheses for returning objects, brackets for functions
          Object.entries(players).map(([key, player]) => (
            <TextBoxLayout key={key}>
              <Text text={player.name} />
            </TextBoxLayout>
          ))
        }
      </div>
    </div>
  );
};

// TODO: Create Statistics component for Admin Dashboard
export const Statistics = ({

})
