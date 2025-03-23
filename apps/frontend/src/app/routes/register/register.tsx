import React from "react";
import { Heading } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Button } from "@/components/ui/button";

const Register = () => {
  return (
    <RegisterLayout>
      <Heading text="To help people identify you, would you rather..." />
      <Button link="/register/confirm-avatar" text="Take a photo" />
      <Button link="/register/confirm-avatar" text="Select from Camera Roll" />
      <Button text="Back" link="/" color="background" />
    </RegisterLayout>
  );
};

export default Register;
