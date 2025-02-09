import React from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

const Description = () => {
  return (
    <AuthLayout>
      <Input title="Provide Visual Description" />

      <Button link="/app" text="Submit" />
    </AuthLayout>
  );
};

export default Description;
