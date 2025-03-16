import React from "react";
import { motion } from "framer-motion";

export const TextBoxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex flex-col gap-4 p-2 box-trans radius-none"
      drag
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
    >
      {children}
    </motion.div>
  );
};
