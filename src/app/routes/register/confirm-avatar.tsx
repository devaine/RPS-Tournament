import React from "react";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Avatar } from "@/components/ui/avatar";

const CreateAvatar = () => {
  const player = "";

  return (
    <RegisterLayout>
      <Title text="Do you want to use this picture?" />
      <Avatar src={player} />
      <div className="flex gap-4">
        <Button text="Back" link="/register" color="background"></Button>
        <Button text="Continue" link="/game"></Button>
      </div>
    </RegisterLayout>
  );
};

export default CreateAvatar;
