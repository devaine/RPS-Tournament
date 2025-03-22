import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";

export const ActionButton = ({
  text,
  onclick,
}: {
  text: string;
  onclick: () => void;
}) => {
  return (
    <motion.button
      className="bg-accent py-2 px-4 border-box box-shadow-extend"
      whileTap={{ scale: 0.9 }}
      onClick={onclick}
    >
      <Text text={text} />
    </motion.button>
  );
};

export const RouteButton = ({ text, link }: { text: string; link: string }) => {
  return (
    <div>
      <Link to={link}>
        <ActionButton text={text} onclick={() => {}} />
      </Link>
    </div>
  );
};

export const BackButton = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link to={link}>
      <motion.button
        className="bg-background py-2 px-4 border-box box-shadow-extend"
        whileTap={{ scale: 0.9 }}
      >
        <Text text={text} />
      </motion.button>
    </Link>
  );
};

export const Button = ({ text, link }: { text: string; link: string }) => {
  return (
    <div>
      <Link to={link}>
        <ActionButton text={text} onclick={() => {}} />
      </Link>
    </div>
  );
};

export function ProgressButtons({
  forward,
  back,
}: {
  forward: string;
  back: string;
}) {
  return (
    <div className="flex gap-4">
      <BackButton text="Back" link={back}></BackButton>
      <RouteButton text="Continue" link={forward}></RouteButton>
    </div>
  );
}

export const IconButton = ({
  src,
  onclick,
}: {
  src: string;
  onclick: () => void;
}) => {
  return (
    <motion.button
      className="bg-accent border-box-xl box-shadow-extend-xl"
      whileTap={{ scale: 0.9 }}
      onClick={onclick}
    >
      <img src={src} alt="rock" className="size-32"></img>
    </motion.button>
  );
};
