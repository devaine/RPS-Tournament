import React from "react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen gap-8 flex-col items-center justify-center text-center">
      {children}
    </div>
  );
};
