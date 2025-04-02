import React from "react";

type ButtonLayoutProperties = {
  children: React.ReactNode;
  horizontal?: boolean;
};

export const MultiButtonLayout = ({
  children,
  horizontal,
}: ButtonLayoutProperties) => {
  return horizontal ? (
    <div className="flex gap-4">{children}</div>
  ) : (
    <div className="flex flex-col justify-center gap-4 p-4">{children}</div>
  );
};
