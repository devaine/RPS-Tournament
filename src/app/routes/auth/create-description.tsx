import React from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

const CreateDescription = () => {
  return (
    <AuthLayout>
      <Input label="Provide Visual Description" placeholder="I'm a boy / girl with -" />

      <Button link="/app" text="Submit" />
    </AuthLayout>
  );
};

export default CreateDescription;
