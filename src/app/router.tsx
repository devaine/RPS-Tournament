import React from "react";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import NotFound from "./routes/not-found";
import App from "./routes/app/game";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
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
