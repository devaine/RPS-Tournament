import React from "react";
import { Heading, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

function Locate() {
  const name = "justink";

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Heading text="Locate your opponent:" />
      <Text text={name} />
      <Avatar src="https://w0.peakpx.com/wallpaper/285/845/HD-wallpaper-cursed-cursed-lol-memes-xd.jpg" />
      <Button text="Ready?" />
    </div>
  );
}
export default Locate;
