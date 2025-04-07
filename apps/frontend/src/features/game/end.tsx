import React from "react";
import { useEffect, useState } from "react";
import { Title, Heading } from "@/components/ui/text";
import Divider from "@/components/ui/divider";
import { TextLayout } from "@/components/layouts/text-layout";
import { Button } from "@/components/ui/button";
import { PlayerList } from "@/components/ui/lists";

// Backend Imports
import { socket } from "@/features/socketio/init";

// Needed for reconnecting

// WARNING: Might not load on current players device,
// fixed by adding emit("join_event") but that might cause the current player to be
// contestant room

if (socket.disconnected) {
  socket.connect();
}

const End = () => {
  const [winners, setWinners] = useState<string[]>([]);

  useEffect(() => {
    const fetchWinners = () => {
      socket.emit("contestantList", (contestantNames: string[]) => {
        setWinners(contestantNames);
      });
    };

    setInterval(fetchWinners, 1000);
  }, [socket]);
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div>
          <Title text="WINNERS" />
          <Divider />
        </div>
        <div className="flex flex-col gap-4">
          {winners.length > 0 ? (
            <PlayerList header="WINNERS" players={winners} />
          ) : (
            <Heading text="Loading Winner Data" />
          )}
        </div>
        <Button text="About" link="/about" />
      </div>
    </TextLayout>
  );
};

export default End;
