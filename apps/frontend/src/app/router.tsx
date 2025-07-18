import React from "react";
import Landing from "@/app/routes/landing";
import Register from "@/app/routes/register/register";
import ConfirmUser from "@/app/routes/register/confirm-user";
import NotFound from "@/app/routes/not-found";
import Game from "@/app/routes/app/game";
import Dashboard from "@/app/routes/app/dashboard";
import Admin from "@/app/routes/app/admin";
import TV from "@/app/routes/app/tv";
import About from "@/app/routes/app/about";
import End from "@/features/game/end";
import {
	GameProtectedRoute,
	RegisterProtectedRoute,
} from "@/features/auth/protected-route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameProvider } from "@/hooks/game-context";

/* NOTE: What <Register/GameProtectedRoute> does is
* protect <Register/> & <Game/> pages from unauthorized
* users when game has started by 
* redirecting them to the <Landing/> page
*/

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<RegisterProtectedRoute>
				<Landing />
			</RegisterProtectedRoute>
		),
	},
	{
		path: "/register",
		element: (
			<GameProtectedRoute>
				<Register />
			</GameProtectedRoute>
		),
	},
	{
		path: "/register/confirm-avatar",
		element: (
			<GameProtectedRoute>
				<ConfirmUser />
			</GameProtectedRoute>
		),
	},
	{
		path: "/game",
		element: (
			<GameProtectedRoute>
				<Game />
			</GameProtectedRoute>
		),
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
		path: "/end",
		element: <End />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);

const Router = () => {
	return (
		<GameProvider>
			<RouterProvider router={routes} />
		</GameProvider>
	);
};
export default Router;
