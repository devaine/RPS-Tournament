import React from "react";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Input } from "@/components/ui/input";
import { TextButton } from "@/components/ui/button";

const CreateDescription = () => {
  return (
    <RegisterLayout>
      <Input label="Provide Visual Description" placeholder="I'm a boy / girl with -" />

      <TextButton link="/app" text="Submit" />
    </RegisterLayout>
  );
};

export default CreateDescription;
