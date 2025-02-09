import React from "react";
import { Title } from "@/components/ui/text";
import Button from "@/components/ui/button";
import { AuthLayout } from "@/components/layouts/auth-layout";

const Picture = () => {
  return (
    <AuthLayout>
      <Title text="Do you want to use this picture?" />
      <div className="flex gap-4">
        <Button text="Yes" link="/app"></Button>
        <Button text="No" link="/register"></Button>
      </div>
    </AuthLayout>
  );
};

export default Picture;
