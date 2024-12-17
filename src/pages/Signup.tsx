import Input from "../components/Input";
import React from "react";

function Signup() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>signup</h1>
      <div className="flex flex-col">
        <Input title="Name" />
        <Input title="Student ID" />
      </div>
    </div>
  );
}
export default Signup;
