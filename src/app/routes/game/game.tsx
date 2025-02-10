import React from "react";
import paper from "@/assets/icons/paper.svg"
import scissors from "@/assets/icons/scissors.svg"
import rock from "@/assets/icons/rock.svg"

function RockPaperScissors() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Please Wait...</div>
      <div>
        <button>
          <img
            src={paper}
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
        <button>
          <img
            src={rock}
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
        <button>
          <img
            src={scissors}
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
      </div>
    </div>
  );
}
export default RockPaperScissors;
