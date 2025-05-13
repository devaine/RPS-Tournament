import React from "react";
import { Title } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";
import type { User } from "@/types/gameAPI";

export const Player = (player: IntrinsicAttributes & User) => (
  <div className="flex flex-col gap-4">
    <Avatar src={player.avatar} />
    <TextBoxLayout>
      <Title text={player.name} />
    </TextBoxLayout>
  </div>
);

export const EmptyPlayer = () => (
  <div className="flex flex-col gap-4">
    <Avatar src={""} />
    <TextBoxLayout>
      <Title text={""} />
    </TextBoxLayout>
  </div>
);
