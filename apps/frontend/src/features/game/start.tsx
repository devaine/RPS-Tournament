import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export const GameStartedScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading text="The tournament has begun!" />
      <Button text="View Dashboard" link="/dashboard" />
    </div>
  );
};
