import React from "react";

export const TextLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh gap-8 flex-col text-center">{children}</div>
  );
};
