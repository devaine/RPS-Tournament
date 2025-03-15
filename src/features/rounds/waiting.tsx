import React from "react";
import { Heading } from "@/components/ui/text";
import { ActionButton } from "@/components/ui/button";

function Waiting() {
  const name = "justink";
  const text = "Waiting for " + { name } + "...";

  return <Heading text={`${text}`} />;
}
export default Waiting;
