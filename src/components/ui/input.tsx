import React from "react";

export function Input({ title }: { title: string }) {
  return (
    <input
      type="text"
      placeholder={title}
      className="bg-gray-200/0 text-paragraph text-3xl border-b-2 border-primary placeholder-paragraph focus:outline-none text-stroke shadow-shadow jersey-10"
    />
  );
}
