import Input from "../components/Input";
import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>signup</div>
      <div className="flex flex-col">
        <Input title="Name" />
        <Input title="Student ID" />
      </div>
      <Link to="/create-id">test</Link>
    </div>
  );
}

export default Signup;
