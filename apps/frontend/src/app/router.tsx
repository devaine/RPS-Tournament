import React from "react";
import Landing from "./routes/landing";
import Register from "./routes/register/register";
import ConfirmUser from "./routes/register/confirm-user";
import NotFound from "./routes/not-found";
//import Game from "./routes/app/game";
//import Dashboard from "./routes/app/dashboard";
const Game = React.lazy(() => import("./routes/app/game"))
const Dashboard = React.lazy(() => import("./routes/app/dashboard"))
import Admin from "./routes/app/admin";
import TV from "./routes/app/tv";
import About from "./routes/app/about";
import {
	GameProtectedRoute,
	RegisterProtectedRoute,
} from "@/features/auth/protected-route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
			<React.Suspense>
				<GameProtectedRoute>
					<Game />
				</GameProtectedRoute>
			</React.Suspense>
		),
	},
	{
		path: "/dashboard",
		element: (
			<React.Suspense>
				<Dashboard />
			</React.Suspense>
		)
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
