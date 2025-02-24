import React from "react";

export const TextLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen gap-8 flex-col text-center">
      {children}
    </div>
  );
};
