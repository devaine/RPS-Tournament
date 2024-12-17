import Input from "../components/Input";
import React from "react";

function VisualDescription() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Provide Visual Description</div>
      <Input title="Visual Description" />
    </div>
  );
}
export default VisualDescription;
