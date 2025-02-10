import React from "react";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";

export function TextButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <div>
      <Link to={link}>
        <button className="bg-green p-2 shadow-shadow stroke-black">
          <Text text={text} />
        </button>
      </Link>
    </div>
  );
}

export const IconButton = ({ src }: { src: string }) => ({

})
