import React from "react";
import { motion } from "framer-motion";
import { TextBoxLayout } from "../layouts/text-box-layout";

type TextProps = {
  text: string | undefined;
  text2?: string;
  scale?: number[];
};

export function TextBox({ text }: TextProps) {
  return (
    <TextBoxLayout>
      <Text text={text} />
    </TextBoxLayout>
  );
}

export function Statistic({ text, text2 }: TextProps) {
  return (
    <div className="flex justify-between">
      <Text text={text} />
      <Text text={text2} />
    </div>
  );
}

export function Versus({ text, text2 }: TextProps) {
  return (
    <div className="flex justify-between">
      <div className="basis-1/2 text-left">
        <Text text={text} />
      </div>
      <div className="basis-0">
        <Text text="VS" />
      </div>
      <div className="basis-1/2 text-right">
        <Text text={text2} />
      </div>
    </div>
  );
}

export function Announce({ text }: TextProps) {
  return (
    <p className="text-paragraph text-9xl text-stroke-xl stroke-black font-jersey-15">
      {text}
    </p>
  );
}

export function SplashAnnounce({ text, scale }: TextProps) {
  return (
    <motion.div
      key={text}
      animate={{
        scale: scale,
        transition: { times: [0, 0.2, 1], duration: 1 },
      }}
    >
      <Announce text={text} />
    </motion.div>
  );
}

export function Title({ text }: TextProps) {
  return (
    <p className="text-paragraph text-7xl text-stroke-xl stroke-black font-jersey-15">
      {text}
    </p>
  );
}

export function Heading({ text }: TextProps) {
  return (
    <p className="text-paragraph text-5xl text-stroke-lg stroke-black font-jersey-10">
      {text}
    </p>
  );
}

export function ErrorText({ text }: TextProps) {
  return (
    <p className="text-background text-3xl text-stroke stroke-black font-jersey-10">
      {text}
    </p>
  );
}

export function Text({ text }: TextProps) {
  return (
    <p className="text-paragraph text-3xl text-stroke stroke-black font-jersey-10">
      {text}
    </p>
  );
}
