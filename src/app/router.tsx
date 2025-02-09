import React from "react";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import CreateDescription from "./routes/auth/create-description";
import CreateAvatar from "./routes/auth/create-avatar";
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
    path: "/register/create-description",
    element: <CreateDescription />,
  },
  {
    path: "/register/create-avatar",
    element: <CreateAvatar />,
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
