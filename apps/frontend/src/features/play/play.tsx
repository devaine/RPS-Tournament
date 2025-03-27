import React from "react";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import Countdown from "@/features/play/countdown";
import { icons } from "@/config/icons";

import { AnimatePresence } from "framer-motion";

type PlayProps = {
  rockOnClick: () => void;
  paperOnClick: () => void;
  scissorsOnClick: () => void;
};

export const Play = ({
  rockOnClick,
  paperOnClick,
  scissorsOnClick,
}: PlayProps) => {
  const [showBattle, setShowBattle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBattle(true);
    }, 3000);
  }, [showBattle]);

  return (
    <AnimatePresence>
      {showBattle === false && <Countdown />}
      {showBattle === true && (
        <Battle
          rockOnClick={rockOnClick}
          paperOnClick={paperOnClick}
          scissorsOnClick={scissorsOnClick}
        />
      )}
    </AnimatePresence>
  );
};

export const Battle = ({
  rockOnClick,
  paperOnClick,
  scissorsOnClick,
}: PlayProps) => {
  return (
    <GameLayout>
      <IconButton
        src={icons[0].url}
        size={32}
        text={icons[0].alt}
        onClick={rockOnClick}
      />
      <div className="flex gap-8">
        <IconButton
          src={icons[1].url}
          size={32}
          text={icons[1].alt}
          onClick={paperOnClick}
        />
        <IconButton
          src={icons[2].url}
          size={32}
          text={icons[2].alt}
          onClick={scissorsOnClick}
        />
      </div>
    </GameLayout>
  );
};

export default Play;
