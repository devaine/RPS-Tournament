import React from "react";

function Waiting() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Please Wait...</div>
      <img
        src="https://www.komando.com/wp-content/uploads/2021/03/buffering-video.jpg"
        alt="image"
        className="w-48 h-48"
      ></img>
    </div>
  );
}
export default Waiting;
