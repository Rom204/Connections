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

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Box>
				<header>
					<Header user={user} />
				</header>
			</Box>
			<Box>
				<main>
					<Main user={user} />
				</main>
			</Box>
			<Box>
				<footer>
					<Footer
						description={"nothing at all"}
						title={"extra"}
						user={user}
					/>
				</footer>
			</Box>
		</Box>
	);
};

export default General_Layout;
