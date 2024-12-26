import React from "react";

export default function Identification() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>To help people identify you, would you rather...</div>
      <button>Take a photo</button>
      <button>Select from Camera Roll</button>
      <button>Provide Visual Description</button>
    </div>
  );
}
