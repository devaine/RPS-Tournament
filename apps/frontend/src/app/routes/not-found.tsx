import React from "react";
import { Heading } from "@/components/ui/text";
import { RouteButton } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col gap-8 items-center justify-center ">
      <Heading text="404 Not Found" />
      <RouteButton text="Home" link="/"></RouteButton>
    </div>
  );
};

export default NotFound;
