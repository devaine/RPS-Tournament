import React from "react";

function App() {
  return <RockPaperScissors />;
}

function RockPaperScissors() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Please Wait...</div>
      <div>
        <button>
          <img
            src="https://clipart-library.com/img/1603206.png"
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
        <button>
          <img
            src="https://webstockreview.net/images/paper-icon-png-3.png"
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
        <button>
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/664/151/original/scissor-icon-transparent-free-png.png"
            alt="rock"
            className="w-48 h-48"
          ></img>
        </button>
      </div>
    </div>
  );
}
export default App;
