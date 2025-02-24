import React from "react";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { TextBox } from "@/components/ui/input";
import { BackButton, RouteButton } from "@/components/ui/button";

const CreateDescription = () => {
  return (
    <RegisterLayout>
      <TextBox label="Provide Visual Description" placeholder="I'm a human being with human hair and..."></TextBox>
      <div className="flex gap-4">
        <BackButton
          text="Back"
          link="/register/"
        />
        <RouteButton
          link="/game"
          text="Continue"
        />

      </div>
    </RegisterLayout>
  );
};

export default CreateDescription;
