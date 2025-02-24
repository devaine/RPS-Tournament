import { Title } from "@/components/ui/text";
import { Form } from "@/components/ui/input";
import React from "react";
import { RouteButton } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";

const Landing = () => {
  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>
      <div className="flex flex-col gap-4">
        <Form label="Name" placeholder="Bogos Binted" maxLength={30} />
        <Form label="Student ID" placeholder="1234567" maxLength={7} />
      </div>
      <RouteButton text="Submit" link="/register"></RouteButton>
    </RegisterLayout>
  );
};

export default Landing;
