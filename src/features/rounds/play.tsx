import React from "react";
import { Title } from "@/components/ui/text";
import { IconButton } from "@/components/ui/button";
import paper from "@/assets/icons/paper.svg";
import scissors from "@/assets/icons/scissors.svg";
import rock from "@/assets/icons/rock.svg";

const Play = () => {
  return (
    <div className="flex h-screen flex-col gap-8 items-center justify-center">
      <div className="text-center">
        <Title text="CHOOSE YOUR WEAPON" />
      </div>
      <div className="flex flex-col gap-8">
        <IconButton src={rock} onclick={() => { }} />
        <IconButton src={paper} onclick={() => { }} />
        <IconButton src={scissors} onclick={() => { }} />
      </div>
    </div>
  );
};

export default Play;
