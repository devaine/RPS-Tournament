import React from "react";

export function Input({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="flex flex-col items-left">
      <label className="text-paragraph drop-shadow-shadow text-3xl jersey-10">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-green text-paragraph text-3xl border-b-2 border-primary placeholder-paragraph  text-stroke jersey-10"
      />
    </div>
  );
}
