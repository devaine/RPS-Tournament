import React from "react";
import { Title } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { TextButton } from "@/components/ui/button";

const Register = () => {
  return (
    <RegisterLayout>
      <Title text="To help people identify you, would you rather..." />
      <TextButton link="" text="Take a photo" />
      <TextButton link="" text="Select from Camera Roll" />
      <TextButton link="/register/create-description" text="Provide Visual Description" />
    </RegisterLayout>
  );
};

export default Register;
