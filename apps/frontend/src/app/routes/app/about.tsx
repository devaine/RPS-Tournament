import React from "react";
import { Heading, TextBox } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import { BackButton } from "@/components/ui/button";

const About = () => {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <Heading text="Developed by:" />
        <TextBox text="Justin Kondratenko" />
        <TextBox text="Rafael Rojas" />
        <TextBox text="Lance Finke" />
        <Heading text="Icon Art by:" />
        <TextBox text="Taylor Wiedeman " />
        <Heading text="Avatar Art by:" />
        <TextBox text="Angel Huerta " />
        <Heading text="Special Thanks:" />
        <TextBox text="American Society of Mechnical Engineers (ASME) Club" />
        <TextBox text="Robotics Club" />
        <TextBox text="AANHPI" />
        <TextBox text="Tabletop Club" />
        <TextBox text="Computer Science Club (obviously)" />
        <BackButton />
      </div>
    </TextLayout>
  );
};

export default About;
