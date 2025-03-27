import React from "react";
import { Title } from "@/components/ui/text";
import { BackButton, Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Avatar } from "@/components/ui/avatar";
import type { User } from "@/types/api";

const ConfirmUser = ({ name, id, avatar }: User) => {
  return (
    <RegisterLayout>
      <Title text="Do you want to join with this Name, ID, and Avatar?" />
      <Title text={name} />
      <Title text={id} />
      <Avatar src={avatar!} />
      <div className="flex gap-4">
        <BackButton />
        <Button text="Confirm" link="/game"></Button>
      </div>
    </RegisterLayout>
  );
};

export default ConfirmUser;
