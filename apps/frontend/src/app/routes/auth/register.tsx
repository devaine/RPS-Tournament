import React from "react";
import { Title } from "@/components/ui/text";
import { AuthLayout } from "@/components/layouts/auth-layout";
import Button from "@/components/ui/button";

const CreateId = () => {
  return (
    <AuthLayout>
      <Title text="To help people identify you, would you rather..." />
      <Button link="" text="Take a photo" />
      <Button link="" text="Select from Camera Roll" />
      <Button link="/description" text="Provide Visual Description" />
    </AuthLayout>
  );
};

export default CreateId;
