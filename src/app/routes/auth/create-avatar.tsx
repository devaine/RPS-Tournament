import React from "react";
import { Title } from "@/components/ui/text";
import Button from "@/components/ui/button";
import { AuthLayout } from "@/components/layouts/auth-layout";
import Picture from "@/components/ui/avatar";
import player from "@/assets/img/players/player1.png"

const CreateAvatar = () => {

  return (
    <AuthLayout>
      <Title text="Do you want to use this picture?" />
      <Picture src={player} />
      <div className="flex gap-4">
        <Button text="Yes" link="/app"></Button>
        <Button text="No" link="/register"></Button>
      </div>
    </AuthLayout>
  );
};

export default CreateAvatar;
