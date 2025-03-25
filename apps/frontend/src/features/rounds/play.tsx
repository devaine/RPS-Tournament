import React from "react";
import { useEffect, useState } from "react";
import { SplashAnnounce } from "@/components/ui/text";
import { IconButton } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import actions from "@/config/actions.json";
import { AnimatePresence, motion } from "framer-motion";

const Play = ({
  rockOnClick,
  paperOnClick,
  scissorsOnClick,
}: {
  rockOnClick: () => void;
  paperOnClick: () => void;
  scissorsOnClick: () => void;
}) => {
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

const Battle = ({
  rockOnClick,
  paperOnClick,
  scissorsOnClick,
}: {
  rockOnClick: () => void;
  paperOnClick: () => void;
  scissorsOnClick: () => void;
}) => {
  return (
    <GameLayout>
      <IconButton
        src={actions[0].url}
        size={32}
        text={actions[0].alt}
        onClick={rockOnClick}
      />
      <div className="flex gap-8">
        <IconButton
          src={actions[1].url}
          size={32}
          text={actions[1].alt}
          onClick={paperOnClick}
        />
        <IconButton
          src={actions[2].url}
          size={32}
          text={actions[2].alt}
          onClick={scissorsOnClick}
        />
      </div>
    </GameLayout>
  );
};

const Countdown = () => {
  const announcements = ["ROCK", "PAPER", "SCISSORS"];
  const [announce, setAnnounce] = useState(announcements[0]);

  let intervalID: undefined | ReturnType<typeof setTimeout>;
  const announcementsLength = announcements.length - 1;
  useEffect(() => {
    if (announce != announcements[announcementsLength]) {
      intervalID = setInterval(() => {
        const index = announcements.indexOf(announce);
        if (index === announcementsLength) {
          setAnnounce(announcements[0]);
        } else {
          setAnnounce(announcements[index + 1]);
        }
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [announce]);

  return (
    <AnimatePresence>
      {announce && (
        <GameLayout>
          <motion.div
            key="Battle"
            className="grayscale"
            animate={{
              scale: [0, 0.8, 1],
              transition: {
                times: [0, 0.1, 1],
                duration: 3,
              },
            }}
          >
            <Battle
              rockOnClick={() => {}}
              paperOnClick={() => {}}
              scissorsOnClick={() => {}}
            />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SplashAnnounce text={announce} key={announce} />
          </div>
        </GameLayout>
      )}
    </AnimatePresence>
  );
};

export default Play;
