import React from "react";
import { Heading } from "@/components/ui/text";

export const GameStartedScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading text="The tournament has begun!" />
    </div>
  );
};
