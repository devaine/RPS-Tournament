import React from "react";
import { Announce } from "@/components/ui/text";

function Decision({ decision }: { decision: string }) {
  return <Announce text={decision} />;
}
export default Decision;
