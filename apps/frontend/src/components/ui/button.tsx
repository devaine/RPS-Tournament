import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";

interface ButtonParameters {
  text: string;
  color?: string;
  src?: string;
  link?: string;
  onclick?: () => void;
}

export const Button = (buttonParameters: ButtonParameters) => {
  const defaults: Pick<ButtonParameters, "link" | "color"> = {
    link: "",
    color: "accent",
  };

  const buttonValues = {
    ...defaults,
    ...buttonParameters,
  };

  const style = `bg-${buttonValues.color} py-2 px-4 border-box box-shadow-extend`;

  return (
    <div>
      {/* Require non-null assertion operator to declare link as never null */}
      <Link to={buttonValues.link!}>
        <motion.button
          className={style}
          whileTap={{ scale: 0.9 }}
          onClick={buttonValues.onclick}
        >
          <Text text={buttonValues.text} />
        </motion.button>
      </Link>
    </div>
  );
};

export const IconButton = ({
  src,
  onclick,
}: {
  src: string;
  onclick: () => void;
}) => {
  return (
    <motion.button
      className="bg-accent border-box-xl box-shadow-extend-xl"
      whileTap={{ scale: 0.9 }}
      onClick={onclick}
    >
      <img src={src} alt="rock" className="size-32"></img>
    </motion.button>
  );
};
