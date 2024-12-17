import React from "react";
import Signup from "./pages/Signup";
import Identification from "./pages/Identification";

// Testing the prototype components
// TODO: Add router that navigages between pages but keeps app as SPA
function App() {
  return (
    <div>
      <Signup />
      <Identification />
    </div>
  );
}
export default App;
