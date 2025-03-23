import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col gap-8 items-center justify-center ">
      <Heading text="404 Not Found" />
      <Button text="Home" link="/" color="background"></Button>
    </div>
  );
};

export default NotFound;
