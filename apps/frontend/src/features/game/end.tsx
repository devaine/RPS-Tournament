import React from "react";
import { Title, Heading } from "@/components/ui/text";
import Divider from "@/components/ui/divider";
import { TextLayout } from "@/components/layouts/text-layout";
import { Button } from "@/components/ui/button";

const End = () => {
  const winners = ["Player 1", "Player 2", "Player 3"];

  return (
    <TextLayout>
      <div>
        <Title text="WINNERS" />
        <Divider />
      </div>
      <div>
        <Heading text={winners[0]} />
        <Heading text={winners[1]} />
        <Heading text={winners[2]} />
      </div>
      <Button text="About" link="/about" />
    </TextLayout>
  );
};

export default End;
