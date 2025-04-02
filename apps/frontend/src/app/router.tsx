import React from "react";
import Landing from "./routes/landing";
import Register from "./routes/register/register";
import ConfirmUser from "./routes/register/confirm-user";
import NotFound from "./routes/not-found";
import Game from "./routes/game/game";
import Dashboard from "./routes/game/dashboard";
import Admin from "./routes/admin/admin";
import TV from "./routes/game/tv";
import End from "./routes/game/end";
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
    path: "/game/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/game/tv",
    element: <TV />,
  },
  {
    path: "/game/end",
    element: <End />,
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
