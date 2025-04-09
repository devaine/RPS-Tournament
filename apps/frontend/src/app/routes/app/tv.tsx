import React from "react";
import { useEffect, useState } from "react";
import { TVLayout } from "@/components/layouts/tv-layout";
import Game from "@/app/routes/app/game";
import { Announce, Heading, Title } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";
import type { User } from "@/types/gameAPI";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import { Avatar } from "@/components/ui/avatar";

// TODO: Make this prototype actually do stuff
const TV = () => {
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPlayers = () => {
      socket.emit("playerList", (players: User[]) => {
        setPlayers(players);
      });
    };
    setInterval(fetchPlayers, 1000);
    console.log(players);
  }, [socket]);

  return (
    <TVLayout>
      {players.length > 0
        ? displayPlayer({ index: 0, players: players })
        : displayEmptyPlayer()}
      <Announce text="VS" />
      {players.length > 1
        ? displayPlayer({ index: 1, players: players })
        : displayEmptyPlayer()}
    </TVLayout>
  );
};

type DisplayPlayerProps = {
  index: number;
  players: User[];
};

const displayPlayer = ({ index, players }: DisplayPlayerProps) => (
  <div className="flex flex-col gap-4">
    <Avatar src={players[index].avatar} />
    <TextBoxLayout>
      <Title text={players[index].name} />
    </TextBoxLayout>
  </div>
);

const displayEmptyPlayer = () => (
  <div className="flex flex-col gap-4">
    <Avatar src={""} />
    <TextBoxLayout>
      <Title text={""} />
    </TextBoxLayout>
  </div>
);

export default TV;
