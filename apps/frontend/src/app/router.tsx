import React from "react";
import Landing from "./routes/landing";
import Register from "./routes/register/register";
import ConfirmUser from "./routes/register/confirm-user";
import NotFound from "./routes/not-found";
import Game from "./routes/app/game";
import Dashboard from "./routes/app/dashboard";
import Admin from "./routes/app/admin";
import TV from "./routes/app/tv";
import About from "./routes/app/about";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// TODO: Protect all routes after registration so users need to login to see rest

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/confirm-avatar",
    element: <ConfirmUser />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/tv",
    element: <TV />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};
export default Router;
