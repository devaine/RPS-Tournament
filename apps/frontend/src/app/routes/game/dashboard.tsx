import React from "react";
import { Title, Statistic } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import { BackButton } from "@/components/ui/button";
import { TextBoxLayout } from "@/components/layouts/text-box-layout";

// Backend Imports
import { socket } from "@/features/socketio/init";

const test = [
  "Bogus Binted",
  "Justin Kondratenko",
  "Bogus Binted",
  "Justin Kondratenko",
];

console.log(socket.emit("contestantCount"));

// NOTE: This is a placeholder
const Dashboard = () => {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
          <TextBoxLayout>
            <Statistic text="Round" text2="0" />
          </TextBoxLayout>
        </div>
        <div className="flex flex-col gap-4">
          <PlayerList header="Players Remaining" players={test} />
          <PlayerList header="Players Lost" players={test} />
        </div>
        <BackButton />
      </div>
    </TextLayout>
  );
};

export default Dashboard;
