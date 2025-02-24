import React from "react";
import { Announce } from "@/components/ui/text";

function Decision() {
  const decision = ["YOU WON", "YOU LOST", "DRAW"];

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Announce text={decision[0]} />
    </div>
  );
}
export default Decision;
