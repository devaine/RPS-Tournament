import { Title, Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import React from "react";
import Button from "@/components/ui/button";
import { AuthLayout } from "@/components/layouts/auth-layout";

function Signup() {
  return (
    <AuthLayout>
      <Title text="ROCK" />
      <Title text="PAPER" />
      <Title text="SCISSORS" />
      <Title text="TOURNAMENT" />
      <div className="flex flex-col">
        <Input title="Name" />
        <Input title="Student ID" />
      </div>
      <Button text="Submit" link="/register"></Button>
    </AuthLayout>
  );
}
export default Signup;
