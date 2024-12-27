import React from "react";
import Signup from "@/app/routes/Signup";
import CreateId from "@/app/routes/CreateID";
import NotFound from "@/app/routes/NotFound";
import App from "@/app/routes/RockPaperScissors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
    errorElement: <NotFound />,
  },
  {
    path: "/create-id",
    element: <CreateId />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);

function Router() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default Router;
