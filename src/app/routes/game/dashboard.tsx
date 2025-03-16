import React from "react";
import { Title } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";

// NOTE: This is a placeholder
const Dashboard = () => {
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
  ]

  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-2 m-4">
        <div>
          <Title text="Dashboard" />
          <Divider />
        </div>
        <div className="flex flex-col gap-4">
          <PlayerList header="Players Remaining" players={test} />
          <PlayerList header="Players Lost" players={test} />

        </div>
      </div>
    </TextLayout>
  );
};

export default Dashboard;
