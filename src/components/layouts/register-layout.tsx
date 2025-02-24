import React from "react";

export const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen gap-8 items-center justify-center text-center">
      {children}
    </div>
  );
};
