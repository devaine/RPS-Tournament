import React from "react";
import { Heading } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { RouteButton, BackButton } from "@/components/ui/button";

const Register = () => {
  return (
    <RegisterLayout>
      <Heading text="To help people identify you, would you rather..." />
      <RouteButton link="/register/confirm-avatar" text="Take a photo" />
      <RouteButton
        link="/register/confirm-avatar"
        text="Select from Camera Roll"
      />
      <BackButton text="Back" link="/" />
    </RegisterLayout>
  );
};

export default Register;
