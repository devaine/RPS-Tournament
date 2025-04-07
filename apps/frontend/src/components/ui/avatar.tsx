import React from "react";

export const Avatar = ({ src }: { src: string }) => {
  return (
    <div className="size-48 bg-accent border-box box-shadow-extend">
      <img src={src} />
    </div>
  );
};

export const SmallAvatar = ({ src }: { src: string }) => {
  return (
    <div className="size-12 bg-accent border-box box-shadow-extend">
      <img src={src} />
    </div>
  );
};
