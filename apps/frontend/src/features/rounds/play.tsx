import React from "react";
import { useEffect, useState, useRef } from "react";
import { Announce, SplashAnnounce, Title } from "@/components/ui/text";
import { IconButton } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import paper from "@/assets/icons/actions/paper.svg";
import scissors from "@/assets/icons/actions/scissors.svg";
import rock from "@/assets/icons/actions/rock.svg";
// For testing
// import rock from "@/assets/icons/players/player1.svg";
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
      <IconButton src={rock} onclick={rockOnClick} />

      <div className="flex gap-8">
        <IconButton src={paper} onclick={paperOnClick} />
        <IconButton src={scissors} onclick={scissorsOnClick} />
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
