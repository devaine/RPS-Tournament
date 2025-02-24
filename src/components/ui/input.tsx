import React from "react";

export const Form = ({ label, placeholder, maxLength }: { label: string, placeholder: string, maxLength: number }) => {
  return (
    <div className="flex flex-col text-left gap-2">
      <label htmlFor={label} className="text-paragraph text-3xl text-stroke jersey-10">{label}</label>
      <input
        id={label}
        type="text"
        placeholder={placeholder}
        className="text-paragraph text-3xl px-4 py-2 box-trans placeholder-paragraph/25 jersey-10 "
        maxLength={maxLength}
      />
    </div>
  );
}

export const TextBox = ({ label, placeholder }: { label: string, placeholder: string }) => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <label htmlFor={label} className="text-paragraph text-5xl text-stroke-lg jersey-10">{label}</label>
      <textarea
        id={label}
        placeholder={placeholder}
        rows={4}
        className="text-paragraph text-3xl px-4 py-2 box-trans placeholder-paragraph/25 jersey-10"></textarea>
    </div >
  );
}
