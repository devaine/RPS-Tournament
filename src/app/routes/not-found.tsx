import React from "react";
import { Text } from "@/components/ui/text";
import { TextButton } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <Text text="404 Not Found" />
      <TextButton text="Home" link="/"></TextButton>
    </div>
  );
};

export default NotFound;
