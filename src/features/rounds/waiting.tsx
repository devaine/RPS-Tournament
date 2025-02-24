import React from "react";
import { Heading } from "@/components/ui/text";

function Waiting() {
  const name = "justink";

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Heading text={"Waiting for " + { name } + "..."} />
    </div>
  );
}
export default Waiting;
