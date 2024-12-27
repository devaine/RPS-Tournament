import React from "react";
import Input from "@/components/input";

export default function CreateId() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>To help people identify you, would you rather...</div>
      <button>Take a photo</button>
      <button>Select from Camera Roll</button>
      <div>
        <div>Provide Visual Description</div>
        <Input title="Visual Description" />
      </div>
    </div>
  );
}
