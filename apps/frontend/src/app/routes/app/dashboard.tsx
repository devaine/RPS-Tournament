import React from "react";
import { useEffect, useState } from "react";
import { Title, Statistic, Heading } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import { BackButton } from "@/components/ui/button";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";

// NOTE: Backend: Make sure that when proctected routes are in place
// that players without user data are sent to "/"
if (socket.disconnected) {
  socket.connect();
  if (userData.name != undefined && userData.id != undefined) {
    socket.emit("join_event", {
      name: userData.name,
      id: userData.id,
    });
  }
}

const Dashboard = () => {
  const [contestants, setContestants] = useState<string[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [losers, setLosers] = useState<string[]>([]);

  // If socket isn't connected, connect & join event as contestant
  if (socket.disconnected) {
    socket.connect();
    socket.emit("join_event", {
      name: userData.name,
      id: userData.id,
    });
  }

  // UseEffect runs when [socket] changes, fetching contestants each time
  // TODO: Make string of contestants return ALL contestants
  useEffect(() => {
    const fetchContestants = () => {
      socket.emit("contestantList", (contestantNames: string[]) => {
        setContestants(contestantNames);
      });
    };

    const fetchPlayers = () => {
      socket.emit("playerList", (playerNames: string[]) => {
        setPlayers(playerNames);
      });
    };

    const fetchLosers = () => {
      socket.emit("loserList", (loserNames: string[]) => {
        setLosers(loserNames);
      });
    };

    setInterval(fetchContestants, 1000);
    setInterval(fetchPlayers, 1000);
    setInterval(fetchLosers, 1000);
  }, [socket]);

  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
          <TextBoxLayout>
            <Statistic text="Round" text2="0" />
          </TextBoxLayout>
        </div>
        <div className="flex flex-col gap-4">
          {players.length > 0 ? (
            <PlayerList header="Players in Combat" players={players} />
          ) : (
            <Heading text="No Players Found" />
          )}
          {contestants.length > 0 ? (
            <PlayerList header="Contestants Remaining" players={contestants} />
          ) : (
            <Heading text="No Contestants Found" />
          )}
          {losers.length > 0 ? (
            <PlayerList header="Lost Contestants" players={contestants} />
          ) : (
            <Heading text="No Losers Found :D" />
          )}
        </div>
        <BackButton />
      </div>
    </TextLayout>
  );
};

export default Dashboard;
