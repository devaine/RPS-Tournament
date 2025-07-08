// UI Imports
import React from "react";
import { useEffect, useState } from "react";

// Screen Imports
import Queued from "@/features/lobby/components/queued";
import Waiting from "@/features/lobby/components/waiting";

// Type Imports
import { LobbyScreen } from "@/types/gameAPI";

// API Imports
import { checkQueue } from "@/features/lobby/api/check-queue";

type LobbyProps = {
  readyOnClick: () => void;
  leaveOnClick: () => void;
};

function Lobby({ readyOnClick, leaveOnClick }: LobbyProps) {
  const [lobbyScreen, setLobbyScreen] = useState<LobbyScreen>("Waiting");

  useEffect(() => {
    setInterval(checkQueue, 100);

    setLobbyScreen(checkQueue());
  }, [lobbyScreen]);

  switch (lobbyScreen) {
    case "Queued":
      return <Queued readyOnClick={readyOnClick} leaveOnClick={leaveOnClick} />;
    case "Waiting":
      return <Waiting leaveOnClick={leaveOnClick} />;
  }
}

export default Lobby;
