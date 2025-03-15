import React from "react";
import { Title } from "@/components/ui/text";
import { ProgressButtons } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Avatar } from "@/components/ui/avatar";

const CreateAvatar = () => {
  const player = ""

  return (
    <RegisterLayout>
      <Title text="Do you want to use this picture?" />
      <Avatar src={player} />
      <ProgressButtons forward="/game" back="/register" />
    </RegisterLayout>
  );
};

export default CreateAvatar;
