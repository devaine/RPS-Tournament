import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Title } from "@/components/ui/text";

export default function Versus({
  player1,
  player2,
}: {
  player1: string;
  player2: string;
}) {
  return (
    <div className="flex justify-between">
      <Avatar src={player1} />
      <Title text="VS" />
      <Avatar src={player2} />
    </div>
  );
}
