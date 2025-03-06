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
  // const [onHover, setOnHover] = React.useState(false);

  return (
    <motion.button
      className="bg-accent py-2 px-4 border-box"
      layout
      // style={{
      //   border: onHover ? "8px solid black" : "4px solid black",
      //   boxShadow: onHover ? "0px" : "4px 4px 0px 0px black",
      // }}
      // onTapStart={() => setOnHover(true)}
      // onTapCancel={() => setOnHover(false)}
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
        <ActionButton text={text} onclick={() => { }} />
      </Link>
    </div>
  );
};

export const BackButton = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link to={link}>
      <button className="bg-background py-2 px-4 border-box">
        <Text text={text} />
      </button>
    </Link>
  );
};

export const Button = ({ text, link }: { text: string; link: string }) => {
  return (
    <div>
      <Link to={link}>
        <ActionButton text={text} onclick={() => { }} />
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
      <RouteButton text="Back" link={back}></RouteButton>
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
    <button className="bg-accent border-box-xl" onClick={onclick}>
      <img src={src} alt="rock" className="size-40"></img>
    </button>
  );
};
