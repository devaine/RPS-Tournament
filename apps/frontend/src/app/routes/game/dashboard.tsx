import React from "react";
import { Title } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import { BackButton } from "@/components/ui/button";

const test = [
  {
    name: "Bogus Binted",
    id: "1234567",
  },
  {
    name: "Justin Kondratenko",
    id: "7800189",
  },
  {
    name: "Bogus Binted",
    id: "1234567",
  },
  {
    name: "Justin Kondratenko",
    id: "7800189",
  },
];

// NOTE: This is a placeholder
const Dashboard = () => {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
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
