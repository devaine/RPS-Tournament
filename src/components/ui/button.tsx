import React from "react";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";

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
        <button className="bg-green p-4 shadow-shadow stroke-black">
          <Text text={title} />
        </button>
      </Link>
    </div>
  );
}
