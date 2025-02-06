import { Title, Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import React from "react";
import Button from "@/components/ui/button";

function Signup() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Title text="ROCK PAPER SCISSORS TOURNAMENT" />
      <div className="flex flex-col">
        <Input title="Name" />
        <Input title="Student ID" />
      </div>
      <Button title="Submit" link="/register"></Button>
    </div>
  );
}
export default Signup;
