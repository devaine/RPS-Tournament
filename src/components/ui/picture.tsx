import React from "react";

const Picture = ({ src }: { src: string }) => {
  return (
    <div className="flex justify-center items-center size-56 bg-black">
      <img src={src} className="size-48" />;
    </div>
  );
};

export default Picture;
