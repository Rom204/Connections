import { Box } from "@mui/material";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

interface LayoutProps {
	user: {
		id: string;
		username: string;
		role: string;
	};
}

const General_Layout = ({ user }: LayoutProps) => {
	console.log("layout level 3");

	if (user.id.length === 0) {
		return (
			<main style={{ height: "100%", width:"100%" }}>
				<Main user={user} />
			</main>
		)
	}

	return (
		<Box sx={{ display: "flex", height:'100%' }}>
			<header style={{ width:"20%" }}>
				<Header user={user} />
			</header>

			<main style={{ width:"60%" }}>
				<Main user={user} />
			</main>

			<footer style={{ width:"30%" }}>
				<Footer
					description={"nothing at all"}
					title={"extra"}
					user={user}
				/>
			</footer>
		</Box>
	);
};

export default General_Layout;
