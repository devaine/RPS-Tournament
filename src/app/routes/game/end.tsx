import React from "react";
import { Title, Heading } from "@/components/ui/text";
import Divider from "@/components/ui/divider";

const End = () => {
  const winners = ["Player 1", "Player 2", "Player 3"];

  return (
    <div className="flex min-h-screen flex-col gap-8 items-center justify-center ">
      <div>
        <Title text="WINNERS" />
        <Divider />
      </div>
      <Heading text={winners[0]} />
      <Heading text={winners[1]} />
      <Heading text={winners[2]} />
    </div>
  );
};

export default End;
