import React from "react";
import { motion } from "framer-motion";

export const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex h-svh gap-8 flex-col items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1.0 }}
      exit={{ opacity: 0, scale: 1.1 }}
    >
      {children}
    </motion.div>
  );
};
