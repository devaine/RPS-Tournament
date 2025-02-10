import { Title } from "@/components/ui/text";
import { Form } from "@/components/ui/input";
import React from "react";
import { TextButton } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";

function Signup() {
  return (
    <RegisterLayout>
      <Title text="ROCK" />
      <Title text="PAPER" />
      <Title text="SCISSORS" />
      <Title text="TOURNAMENT" />
      <div className="flex flex-col">
        <Form label="Name" placeholder="Bogos Binted" />
        <Form label="Student ID" placeholder="1234567" />
      </div>
      <TextButton text="Submit" link="/register"></TextButton>
    </RegisterLayout>
  );
}
export default Signup;
