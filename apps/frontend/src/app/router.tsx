import React from "react";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import Description from "./routes/auth/description";
import Profile from "./routes/auth/profile";
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
    path: "/description",
    element: <Description />,
  },
  {
    path: "/profile",
    element: <Profile />,
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

const Router = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default Router;
