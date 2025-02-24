import React from "react";
import { Text } from "@/components/ui/text";
import { RouteButton } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <Text text="404 Not Found" />
      <RouteButton text="Home" link="/"></RouteButton>
    </div>
  );
};

export default NotFound;
