import React from "react";
import { Link } from "react-router";
import { Text } from "@/components/ui/text";

export const TextButton = ({
  text,
  link,
}: {
  text: string;
  link: string;
}) => {
  return (
    <div>
      <Link to={link}>
        <button className="bg-black/25 p-2">
          <Text text={text} />
        </button>
      </Link>
    </div>
  );
}

export function ProgressButtons({
  forward,
  back,
}: {
  forward: string;
  back: string;
}) {
  return (
    <div className="flex gap-4">
      <TextButton text="Back" link={back}></TextButton>
      <TextButton text="Continue" link={forward}></TextButton>
    </div>
  )

}

export const IconButton = ({ src }: { src: string }) => ({

})
