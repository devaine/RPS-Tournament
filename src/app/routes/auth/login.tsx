import Input from "@/components/input";
import React from "react";

function Signup() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>signup</div>
      <div className="flex flex-col">
        <Input title="Name" />
        <Input title="Student ID" />
      </div>
    </div>
  );
}
export default Signup;
