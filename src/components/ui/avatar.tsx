import React from "react";

const Avatar = ({ src }: { src: string }) => {
  return (
    <div className="flex justify-center items-center size-52 bg-black">
      <img src={src} className="size-48" />;
    </div>
  );
};

export default Avatar;
