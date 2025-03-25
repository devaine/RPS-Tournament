import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";
import type { ButtonParameters } from "@/types/api";

// Global variables for button parameters and styles

const defaults: Pick<ButtonParameters, "type" | "color" | "link" | "whileTap"> =
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

  const { className } = buttonConfig(buttonValues);

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

  const { className, size } = buttonConfig(buttonValues);

  return (
    <motion.button
      className={className}
      whileTap={buttonValues.whileTap}
      onClick={buttonValues.onClick}
    >
      <img
        src={buttonValues.src}
        alt={buttonValues.text}
        className={size}
      ></img>
    </motion.button>
  );
};

const buttonConfig = (buttonParameters: ButtonParameters) => {
  const buttonValues = {
    ...defaults,
    ...buttonParameters,
  };

  let className;
  let size;

  switch (buttonValues.color) {
    case "accent":
      className = `bg-accent py-2 px-4 border-box box-shadow-extend`;
      break;
    case "background":
      className = `bg-background py-2 px-4 border-box box-shadow-extend`;
      break;
  }

  switch (buttonValues.size) {
    case 24:
      size = "size-24";
      className = `bg-accent border-box box-shadow-extend`;
      break;
    case 32:
      size = "size-32";
      className = `bg-accent border-box-xl box-shadow-extend-xl`;
      break;
  }

  return { className, size };
};
