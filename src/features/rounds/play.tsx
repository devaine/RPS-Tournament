import React from "react";
import { useEffect, useState, useRef } from "react";
import { SplashAnnounce, Title } from "@/components/ui/text";
import { IconButton } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import paper from "@/assets/icons/paper.svg";
import scissors from "@/assets/icons/scissors.svg";
import rock from "@/assets/icons/rock.svg";
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
  }, [showBattle])

  return (
    <AnimatePresence>
      {showBattle === false && <Countdown />}
      {showBattle === true && <Battle />}
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
      <div className="text-center">
        <Title text="CHOOSE YOUR WEAPON" />
      </div>
      <div className="flex flex-col gap-8 items-center">
        <IconButton src={rock} onclick={rockOnClick} />

        <div className="flex gap-8">
          <IconButton src={paper} onclick={paperOnClick} />
          <IconButton src={scissors} onclick={scissorsOnClick} />
        </div>
      </div>
    </GameLayout >
  );
}

const Countdown = () => {
  const announcements = ["ROCK", "PAPER", "SCISSORS"];
  const [announce, setAnnounce] = useState(announcements[0]);

  const intervalID = useRef(null);
  const announcementsLength = announcements.length - 1
  useEffect(() => {
    if (announce != announcements[announcementsLength]) {
      intervalID.current = setInterval(() => {
        const index = announcements.indexOf(announce);
        if (index === announcementsLength) {
          setAnnounce(announcements[0]);
        } else {
          setAnnounce(announcements[index + 1]);
        }
      }, 1000);
    }
    return () => clearInterval(intervalID.current);
  }, [announce]);

  return (
    <AnimatePresence>
      {announce && (
        <GameLayout>
          <SplashAnnounce text={announce} key={announce} />
        </GameLayout>
      )}
    </AnimatePresence>


  );
}

export default Play;
