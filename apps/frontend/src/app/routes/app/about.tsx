import React from "react";
import { Heading, TextBox } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";

const About = () => {
  return (
    <TextLayout>
      <div className="flex flex-col items-center gap-4 p-4">
        <Heading text="Developed by:" />
        <TextBox text="Justin Kondratenko" />
        <TextBox text="Rafael Rojas" />
        <TextBox text="Lance Finke" />
        <Heading text="Contributers:" />
        <TextBox text="Art by Taylor Wiedeman" />
        <Heading text="Special Thanks:" />
        <TextBox text="American Society of Mechnical Engineers (ASME) Club" />
        <TextBox text="Robotics Club" />
        <TextBox text="AANHPI" />
        <TextBox text="Tabletop Club" />
        <TextBox text="Computer Science Club (obv)" />
      </div>
    </TextLayout>
  );
};

export default About;
