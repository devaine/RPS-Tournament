import React from "react";

export default function Input({ title }: { title: string }) {
  return <input type="text" placeholder={title} />;
}
