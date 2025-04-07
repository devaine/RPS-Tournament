import React from "react";
import { Title } from "@/components/ui/text";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { avatars } from "@/config/avatars";
import { IconButton, BackButton } from "@/components/ui/button";
import { useNavigate } from "react-router";

// Backend Imports
import { userData } from "@/config/global"; // Global Variables

const Register = () => {
  const navigate = useNavigate();

  const pickAvatar = (url: string) => {
    userData.avatar = url;
    navigate("/register/confirm-avatar");
  };

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
            onClick={() => {
              pickAvatar(avatar.url);
            }}
          />
        ))}
      </div>
      <BackButton />
    </RegisterLayout>
  );
};

export default Register;
