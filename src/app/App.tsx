import React from "react";
import Signup from "./routes/Signup";
import CreateID from "./routes/CreateID";
import Locate from "./routes/Locate";
import Waiting from "./routes/Waiting";
import RockPaperScissors from "./routes/RockPaperScissors";
import Decision from "./routes/Decision";

// Testing the prototype components
// TODO: Add router that navigages between routes but keeps app as SPA
function App() {
  return (
    <div>
      <Signup />
      <CreateID />
      <Locate />
      <Waiting />
      <RockPaperScissors />
      <Decision />
    </div>
  );
}
export default App;
