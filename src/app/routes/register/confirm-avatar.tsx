import React from "react";
import { Title } from "@/components/ui/text";
import { ProgressButtons } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import Picture from "@/components/ui/avatar";

const CreateAvatar = () => {
  return (
    <RegisterLayout>
      <Title text="Do you want to use this picture?" />
      <Picture src={player} />
      <ProgressButtons forward="/game" back="/register" />
    </RegisterLayout>
  );
};

export default CreateAvatar;
