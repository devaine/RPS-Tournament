import React from "react";

export const Avatar = ({ src }: { src: string }) => {
  return (
    <div className="flex justify-center items-center size-48 bg-black">
      <img src={src} className="size-40" />;
    </div>
  );
};

export const SmallAvatar = ({ src }: { src: string }) => {
  return (
    <div className="flex justify-center items-center size-14 bg-black">
      <img src={src} className="size-12" />;
    </div>
  );
};
