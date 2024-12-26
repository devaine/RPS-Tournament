import React from "react";
import Signup from "./routes/Signup";
import CreateID from "./routes/CreateID";
import Locate from "./routes/Locate";
import Waiting from "./routes/Waiting";
import RockPaperScissors from "./routes/RockPaperScissors";
import Decision from "./routes/Decision";
import NotFound from "./routes/NotFound";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
      errorElement: <NotFound />,
    },
    {
      path: "/create-id",
      element: <CreateID />,
      errorElement: <NotFound />,
    },
    {
      path: "/app",
      element: <App />,
      errorElement: <NotFound />,
    },
  ]);
};  
