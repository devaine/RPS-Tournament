import React from "react";
import { motion } from "framer-motion";

export const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex flex-col h-full gap-8 items-center justify-center text-center p-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.0 }}
      exit={{ opacity: 0, scale: 1.1 }}
    >
      {children}
    </motion.div>
  );
};
