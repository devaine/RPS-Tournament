import React from "react";

export const Form = ({ label, placeholder }: { label: string, placeholder: string }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-paragraph text-3xl text-stroke jersey-10">{label}</label>
      <input
        id={label}
        type="text"
        placeholder={placeholder}
        className="bg-black/25 text-paragraph text-3xl p-2 border-primary placeholder-paragraph/25 jersey-10 "
      />
    </div>
  );
}

export const TextBox = ({ label, placeholder }: { label: string, placeholder: string }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-paragraph text-3xl text-stroke jersey-10">{label}</label>
      <textarea
        id={label}
        placeholder={placeholder}
        rows="4"
        className="bg-black/25 text-paragraph text-3xl p-2 border-primary placeholder-paragraph/25 jersey-10"></textarea>
    </div >
  );
}
