import React from "react";

export const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen gap-8 flex-col items-center justify-center text-center">
      {children}
    </div>
  );
};
