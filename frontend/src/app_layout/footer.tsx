import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Button, Divider, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/user/userSlice";

const Copyright = () => {
	return (
		<Typography
			variant="body2"
			color="inherit"
			align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// ________________________________drawer_________________________________________
	const [drawer, setDrawer] = useState(false);
	const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;
		setDrawer(!drawer);
	};

	const logoutAction = () => {
		dispatch(logout());
		localStorage.removeItem("JWT");
		navigate("/login");
	};

	const list = () => (
		<Box
			sx={{ width: "100%" }}
			role="presentation"
			onClick={toggleDrawer()}
			onKeyDown={toggleDrawer()}>
			<Button
				sx={{ margin: 1 }}
				variant="contained"
				onClick={() => logoutAction()}>
				Logout
				<LogoutIcon />
			</Button>
			<Divider sx={{ width: "100%", marginTop: 1 }} />
			<Typography
				sx={{ margin: 1 }}
				align="left"
				variant="body1">
				<Link
					color="inherit"
					href="https://github.com/Rom204">
					<GitHubIcon />
				</Link>{" "}
				<Link
					color="inherit"
					href="https://www.linkedin.com/in/rom-guyer-93136a240/">
					<LinkedInIcon />
				</Link>{" "}
			</Typography>
			<Copyright />
		</Box>
	);
	// ________________________________drawer_________________________________________

	return (
		<Box
			component="footer"
			sx={{ backgroundColor: "#393646" }}>
			<Box sx={{ display: { xs: "none", sm: "block" } }}>
				<Copyright />
				<Typography align="center">
					<Link
						color="inherit"
						href="https://github.com/Rom204">
						<GitHubIcon />
					</Link>{" "}
					<Link
						color="inherit"
						href="https://www.linkedin.com/in/rom-guyer-93136a240/">
						<LinkedInIcon />
					</Link>{" "}
				</Typography>
			</Box>
			<Box sx={{ display: { xs: "block", sm: "none" }, position: "relative" }}>
				<h1>Connections</h1>
				<Button 
				sx={{ position: "absolute", top: 0, right: 0 }}
				onClick={toggleDrawer()}>
					<MenuIcon />
				</Button>
				<Drawer
					anchor="top"
					open={drawer}
					onClose={toggleDrawer()}>
					{list()}
				</Drawer>
			</Box>
		</Box>
	);
}
