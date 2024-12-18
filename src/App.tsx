import React from "react";
import Signup from "./pages/Signup";
import Identification from "./pages/Identification";
import VisualDescription from "./pages/VisualDescription";
import Locate from "./pages/Locate";

// Testing the prototype components
// TODO: Add router that navigages between pages but keeps app as SPA
function App() {
  return (
    <div>
      <Signup />
      <Identification />
      <VisualDescription />
      <Locate />
    </div>
  );
}
export default App;
