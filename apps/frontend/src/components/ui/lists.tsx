import React from "react";
import { Heading, Text } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";
import type { User } from "@/types/gameAPI";
import { SmallAvatar } from "@/components/ui/avatar";

export const PlayerList = ({
  header: header,
  players: players,
}: {
  header: string;
  players: User[];
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
              <div className="flex flex-col items-center gap-4">
                <SmallAvatar src={player.avatar} />
                <Text text={formatPlayerName(player.name)} />
              </div>
            </TextBoxLayout>
          ))
        }
      </div>
    </div>
  );
};

function formatPlayerName(name: string) {
  const splitName = name.split(" ");
  const splitNameLength = splitName.length;
  let formattedName = splitName[0];

  if (splitNameLength < 2) {
    return name;
  }

  for (let i = 1; i < splitNameLength; i++) {
    formattedName += " " + splitName[i].slice(0, 1);
  }

  return formattedName;
}
