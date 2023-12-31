import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Explore from "../pages/explore";
import Feed from "../pages/feed";
import Profile from "../pages/profile";
import Register from "../pages/register";
import Login from "../pages/login";
import Private_router from "../services/Private_route";
import RouteNotFound from "../pages/route_not_found";

interface MainProps {
	user: {
		id: string;
		username: string;
		role: string;
	};
}
const Main = ({ user }: MainProps) => {
	console.log(user);
	console.log("main level 4");
	return (
		<Box sx={{ height: "100%" }}>
			{/* PROTECTED ROUTES */}
			<Routes>
				<Route
					path="/"
					element={<Private_router />}>
					<Route
						path="/"
						element={<Feed />}
					/>
					<Route
						path="feed"
						element={<Feed />}
					/>

					<Route
						path="profile/:username"
						element={<Profile />}
					/>
					<Route
						path="explore"
						element={<Explore />}
					/>
				</Route>
				{/* _________________________________ */}
				{/* PUBLIC ROUTES */}
				<Route
					path="/register"
					element={<Register />}></Route>
				<Route
					path="/login"
					element={<Login />}></Route>
				<Route
					path="*"
					element={<RouteNotFound />}></Route>
			</Routes>
		</Box>
	);
};

export default Main;
