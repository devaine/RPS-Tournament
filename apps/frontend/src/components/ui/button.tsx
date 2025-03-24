import React from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Text } from "@/components/ui/text";

// Global variables for button parameters and styles

interface ButtonParameters {
  text: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  src?: string;
  link?: string;
  isSubmitting?: boolean;
  onClick?: () => void;
  whileTap?: TargetAndTransition;
}

const defaults: Pick<ButtonParameters, "type" | "link" | "color" | "whileTap"> =
{
  type: "button",
  link: "",
  color: "accent",
  whileTap: { scale: 0.9 },
};

export const Button = (buttonParameters: ButtonParameters) => {
  const buttonValues = {
    ...defaults,
    ...buttonParameters,
  };


  // FIX: Button background color doesn't work on first render
  const className = `bg-${buttonValues.color} py-2 px-4 border-box box-shadow-extend`;

  // link requires non-null assertion operator to declare link as never null
  // type requires ternary statement to make sure it has a defined value

  /* NOTE: If button is for submission,
   * then Link from react-router won't work requires useNavigate to route user,
   * meaning link property no longer works
   * */

  return buttonParameters.type === "submit" ? (
    <div>
      <motion.button
        type={buttonValues.type!}
        className={className}
        whileTap={buttonValues.whileTap}
        disabled={buttonValues.isSubmitting}
        onClick={buttonValues.onClick}
      >
        <Text text={buttonValues.text} />
      </motion.button>
    </div>
  ) : (
    <div>
      <Link to={buttonValues.link!}>
        <motion.button
          type={buttonValues.type!}
          className={className}
          whileTap={buttonValues.whileTap}
          disabled={buttonValues.isSubmitting}
          onClick={buttonValues.onClick}
        >
          <Text text={buttonValues.text} />
        </motion.button>
      </Link>
    </div>
  );
};

export const IconButton = (buttonParameters: ButtonParameters) => {
  const buttonValues = {
    ...defaults,
    ...buttonParameters,
  };

  const className = `bg-${buttonValues.color} border-box-xl box-shadow-extend-xl`;

  return (
    <motion.button
      className={className}
      whileTap={buttonValues.whileTap}
      onClick={buttonValues.onClick}
    >
      <img
        src={buttonValues.src}
        alt={buttonValues.text}
        className="size-32"
      ></img>
    </motion.button>
  );
};
