import React from "react";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { TextBox } from "@/components/ui/input";
import { ProgressButtons } from "@/components/ui/button";

const CreateDescription = () => {
  return (
    <RegisterLayout>
      <TextBox label="Provide Visual Description" placeholder="I'm a boy / girl with -" />
      <ProgressButtons forward="/game" back="/register" />
    </RegisterLayout>
  );
};

export default CreateDescription;
