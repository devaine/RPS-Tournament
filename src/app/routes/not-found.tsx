import React from "react";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <Text text="404 Not Found" />
      <Button text="Home" link="/"></Button>
    </div>
  );
};

export default NotFound;
