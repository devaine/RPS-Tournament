import React from "react";
import { Title } from "@/components/ui/text";
import paper from "@/assets/icons/paper.svg";
import scissors from "@/assets/icons/scissors.svg";
import rock from "@/assets/icons/rock.svg";

function RockPaperScissors() {
  return (
    <div className="flex h-screen flex-col gap-8 items-center justify-center">
      <Title text="CHOOSE YOUR WEAPON" />
      <div className="flex flex-col gap-8">
        <button className="bg-black/25">
          <img src={paper} alt="rock" className="w-48 h-48"></img>
        </button>
        <button className="bg-black/25">
          <img src={rock} alt="rock" className="w-48 h-48"></img>
        </button>
        <button className="bg-black/25">
          <img src={scissors} alt="rock" className="w-48 h-48"></img>
        </button>
      </div>
    </div>
  );
}
export default RockPaperScissors;
