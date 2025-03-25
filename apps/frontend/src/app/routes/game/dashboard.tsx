import React from "react";
import { Title } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

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
  ];
  const navigate = useNavigate();

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
        <Button
          text="Go Back"
          color="background"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </TextLayout>
  );
};

export default Dashboard;
