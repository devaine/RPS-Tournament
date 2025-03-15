import React from "react";
import Router from "./router";

// Testing the prototype components
// TODO: Add router that navigages between routes but keeps app as SPA
const App = () => {
  document.body.classList.add("light");

  return (
    <div>
      <Router />
    </div>
  );
};
export default App;
