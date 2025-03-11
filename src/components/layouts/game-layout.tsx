import React from "react";

export const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh gap-8 flex-col items-center justify-center text-center">
      {children}
    </div>
  );
};
