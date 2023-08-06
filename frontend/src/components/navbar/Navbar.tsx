import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "./Settings";
import CreatePost from "../Forms/createPost";
import logo from "../../c637fc51e3174133b678daa8979e1bee.png";
import "./navbar.css";
import { BigNavButton, SmallNavButton } from "../common/button/NavbarButtons";

const Navbar = () => {
	const isAuth = useAppSelector((state) => state.user);
	const navigation = [
		{ name: "feed", path: "/feed", symbol: <HomeRoundedIcon /> },
		{ name: "profile", path: `/profile/${isAuth.username}`, symbol: <AccountCircleIcon /> },
		{ name: "explore", path: "/explore", symbol: <SearchIcon /> },
	];

	return (
		<Box sx={{ display: "flex", flexDirection: { xs: "row", sm: "column" }, height: "100%" }}>
			<Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "block" } }}>
				<img
					className="logo"
					src={logo}
					alt=""
					style={{ height: "6rem", width: "6rem" }}
				/>
				{navigation.map((item) => {
					return (
						<NavLink
							state={item.name === "profile" ? isAuth.id : ""}
							key={item.name}
							to={item.path}
							style={{ textDecoration: "none", color: "white" }}>
							{/* (medium+) screen size button */}
							<BigNavButton
								name={item.name}
								symbol={item.symbol}
							/>
							{/* (medium-) screen size button */}
							<SmallNavButton symbol={item.symbol} />
						</NavLink>
					);
				})}
				<CreatePost />
			</Box>
			<Settings />
		</Box>
	);
};

export default Navbar;
