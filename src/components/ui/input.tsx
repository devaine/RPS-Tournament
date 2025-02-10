import React from "react";

export function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-paragraph drop-shadow-shadow text-3xl text-stroke jersey-10">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-green text-paragraph text-3xl p-2 border-primary placeholder-paragraph jersey-10"
      />
    </div>
  );
}
