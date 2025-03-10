import React from "react";
import { motion, animate, easeIn } from "framer-motion";

export function Statistic({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="flex justify-between">
      <Text text={text1} />
      <Text text={text2} />
    </div>
  );
}

export function Versus({ text1, text2 }: { text1: string; text2: string }) {
  return (
    <div className="flex justify-between">
      <Text text={text1} />
      <Text text="VS" />
      <Text text={text2} />
    </div>
  );
}

export function Announce({ text }: { text: string }) {
  return (
    <p className="text-paragraph text-9xl text-stroke-xl stroke-black jersey-20">
      {text}
    </p>
  );
}

export function SplashAnnounce({ text }: { text: string }) {
  return (
    <motion.div
      key={text}
      animate={{
        scale: [10, 1.25, 1],
        transition: { times: [0, 0.2, 1], duration: 1 }
      }}
    >
      <p className="text-paragraph text-9xl text-stroke-xl stroke-black jersey-20">
        {text}
      </p>
    </motion.div >
  );
}

export function Title({ text }: { text: string }) {
  return (
    <p className="text-paragraph text-7xl text-stroke-xl  stroke-black jersey-15">
      {text}
    </p>
  );
}

export function Heading({ text }: { text: string }) {
  return (
    <p className="text-paragraph text-5xl text-stroke-lg stroke-black jersey-10">
      {text}
    </p>
  );
}

export function Text({ text }: { text: string }) {
  return (
    <p className="text-paragraph text-3xl text-stroke stroke-black jersey-10">
      {text}
    </p>
  );
}
