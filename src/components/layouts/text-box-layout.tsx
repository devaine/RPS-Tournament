import React from "react";

export const TextBoxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 p-2 box-trans">
      {children}
    </div>
  );
};
