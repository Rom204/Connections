import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Copyright() {
	return (
		<Typography
			variant="body2"
			color="white"
			align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

interface FooterProps {
	description: string;
	title: string;
	user: {
		id: string;
	};
}

export default function Footer(props: FooterProps) {
	const { description, title } = props;

	return (
		<Box
			component="footer"
			sx={{ position: "fixed", backgroundColor: "#393646" }}>
			{props.user?.id?.length > 0 ? (
				<Container maxWidth="lg">
					<Typography
						variant="h6"
						align="center"
						gutterBottom>
						{title}
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						color="text.secondary"
						component="p">
						{description}
					</Typography>
					<Copyright />
					<Typography align="center">
						<Link
							color="inherit"
							href="https://github.com/Rom204">
							<GitHubIcon />
						</Link>{" "}
						<Link
							color="inherit"
							href="https://mui.com/">
							<LinkedInIcon />
						</Link>{" "}
					</Typography>
				</Container>
			) : (
				""
			)}
		</Box>
	);
}
