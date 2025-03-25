import React from "react";

export const MultiButtonLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-center gap-4 p-4">{children}</div>
  );
};
