import React, { useEffect, useState } from "react";
import { Title, Heading } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import type { User } from "@/types/gameAPI";
import { useNavigate } from "react-router";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { userData } from "@/config/global";
import { Button } from "@/components/ui/button";

// NOTE: Backend: Make sure that when proctected routes are in place
// that players without user data are sent to "/"
if (socket.disconnected && userData.status != "loser") {
  socket.connect();
  if (userData.name != undefined && userData.id != undefined) {
    socket.emit("join_event", {
      name: userData.name,
      id: userData.id,
      avatar: userData.avatar,
      status: userData.status,
    });
  }
}

const Dashboard = () => {
  const [contestants, setContestants] = useState<User[]>([]);
  const [players, setPlayers] = useState<User[]>([]);
  const [losers, setLosers] = useState<User[]>([]);
  const navigate = useNavigate();

  // UseEffect runs when [socket] changes, fetching contestants each time
  // TODO: Make string of contestants return ALL contestants
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

    const fetchLosers = () => {
      socket.emit("loserList", (losers: User[]) => {
        setLosers(losers);
      });
    };

    fetchContestants();
    fetchPlayers();
    fetchLosers();
  }, [contestants, players, losers]);

  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
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
        {localStorage.getItem("status") !== "loser" && (
          <Button
            text="Back"
            color="background"
            onClick={() => {
              navigate("/");
            }}
          />
        )}
      </div>
    </TextLayout>
  );
};

export default Dashboard;
