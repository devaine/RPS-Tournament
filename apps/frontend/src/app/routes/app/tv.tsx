import React from "react";
import { TVLayout } from "@/components/layouts/tv-layout";
import Game from "@/app/routes/app/game";
import { Announce } from "@/components/ui/text";

// TODO: Make this prototype actually do stuff
const TV = () => {
  return (
    <TVLayout>
      <Game />
      <Announce text="VS" />
      <Game />
    </TVLayout>
  );
};

export default TV;
