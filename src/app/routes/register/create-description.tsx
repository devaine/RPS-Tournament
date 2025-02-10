import React from "react";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { TextBox } from "@/components/ui/input";
import { TextButton } from "@/components/ui/button";

const CreateDescription = () => {
  return (
    <RegisterLayout>
      <TextBox label="Provide Visual Description" placeholder="I'm a boy / girl with -" />

      <TextButton link="/game" text="Submit" />
    </RegisterLayout>
  );
};

export default CreateDescription;
