import React from "react";
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
    <button className="bg-accent p-2 border-box" onClick={onclick}>
      <Text text={text} />
    </button>
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

// export const IconButton = ({ src }: { src: string }) => ({});
