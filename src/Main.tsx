import React from "react";
import Signup from "./pages/Signup";
import CreateId from "./pages/CreateId";
import NotFound from "./pages/NotFound";
import App from "./pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Main() {
  const router = createBrowserRouter([
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

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default Main;
