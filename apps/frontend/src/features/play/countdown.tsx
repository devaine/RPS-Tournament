import React from "react";
import { useEffect, useState } from "react";
import { GameLayout } from "@/components/layouts/game-layout";
import { Battle } from "@/features/play/play";
import { SplashAnnounce } from "@/components/ui/text";
import { AnimatePresence, motion } from "framer-motion";

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

export default Countdown;
