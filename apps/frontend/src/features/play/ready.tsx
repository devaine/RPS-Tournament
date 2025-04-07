import React from "react";
import { Heading } from "@/components/ui/text";
import { GameLayout as TextLayout } from "@/components/layouts/game-layout";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

import { socket } from "@/features/socketio/init";

export default function Ready() {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="flex">
          <TextBoxLayout>
            <Heading text={"Waiting for opponent..."} />
          </TextBoxLayout>
        </div>
      </div>
    </TextLayout>
  );
}
