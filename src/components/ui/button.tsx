import React from "react";
import { Link } from "react-router";

export default function Button({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div>
      <Link to={link}>
        <button>{title}</button>
      </Link>
    </div>
  );
}
