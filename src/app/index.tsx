import React from "react";
import Router from "./router";
import ThemeToggle from "@/components/ui/theme-toggle";

// Testing the prototype components
// TODO: Add router that navigages between routes but keeps app as SPA
function App() {

  ThemeToggle();

  return (
    <div>
      <Router />
    </div>
  );
}
export default App;
