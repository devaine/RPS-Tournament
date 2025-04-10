import React from "react";
import { useEffect, useState } from "react";
import { TVLayout } from "@/components/layouts/tv-layout";
import { Announce, Title } from "@/components/ui/text";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";
import type { User } from "@/types/gameAPI";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { Avatar } from "@/components/ui/avatar";
import { PlayerList } from "@/components/ui/lists";

// TODO: Make this prototype actually do stuff
const TV = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [contestants, setContestants] = useState<User[]>([]);

  useEffect(() => {
    const fetchContestants = () => {
      socket.emit("contestantList", (contestants: User[]) => {
        setContestants(contestants);
      });
    };

    const fetchPlayers = () => {
      socket.emit("playerList", (players: User[]) => {
        setPlayers(players);
      });
    };

    fetchContestants();
    fetchPlayers();
  }, [contestants, players]);

  return (
    <div className="flex flex-col h-min-screen justify-evenly">
      <TVLayout>
        {players.length > 0
          ? displayPlayer({ index: 0, players: players })
          : displayEmptyPlayer()}
        <Announce text="VS" />
        {players.length > 1
          ? displayPlayer({ index: 1, players: players })
          : displayEmptyPlayer()}
      </TVLayout>
      <PlayerList header="Spectators" players={contestants} />
    </div>
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
