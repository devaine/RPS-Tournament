import React from "react";
import { motion } from "framer-motion";

export const Input = ({
  id,
  type,
  label,
  onChange,
  value,
  placeholder,
  maxLength,
}: {
  id: string;
  type: string;
  label: string;
  onChange: () => void;
  value: string;
  placeholder: string;
  maxLength: number;
}) => {
  return (
    <div className="flex flex-col text-left gap-2">
      <label
        htmlFor={label}
        className="text-paragraph text-3xl text-stroke font-jersey-10"
      >
        {label}
      </label>
      <motion.input
        id={id}
        name={id}
        type={type}
        onChange={onChange}
        value={value}
        whileFocus={{ scale: 1.1 }}
        placeholder={placeholder}
        className="text-paragraph text-3xl px-4 py-2 box-shadow-trans-retract placeholder-paragraph/25 bg-secondary/75 font-jersey-10 "
        maxLength={maxLength}
      />
    </div>
  );
};

export const TextBox = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <label
        htmlFor={label}
        className="text-paragraph text-5xl text-stroke-lg font-jersey-10"
      >
        {label}
      </label>
      <textarea
        id={label}
        placeholder={placeholder}
        rows={4}
        className="text-paragraph text-3xl px-4 py-2 box-shadow-trans-retract placeholder-paragraph/25 bg-secondary/75 font-jersey-10"
      ></textarea>
    </div>
  );
};
