import React from "react";
import { Title } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Button } from "@/components/ui/button";
import type { Icon } from "@/types/api";
import { IconButton } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Register = () => {
  const avatars: Icon[] = [];
  const navigate = useNavigate();

  for (let index = 1; index <= 12; index++) {
    avatars.push({
      id: index.toString(),
      url: `/img/assets/avatars/Picture${index}.png`,
      alt: `Picture${index}`,
    });
  }

  return (
    <RegisterLayout>
      <Title text="CHOOSE YOUR CHARACTER" />
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(avatars).map(([key, avatar]) => (
          <IconButton
            key={key}
            src={avatar.url}
            text={avatar.alt}
            size={24}
            onClick={() => navigate("/game")}
          />
        ))}
      </div>
    </RegisterLayout>
  );
};

export default Register;
