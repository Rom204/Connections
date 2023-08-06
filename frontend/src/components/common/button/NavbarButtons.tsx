import { Button } from "@mui/material";

interface NavbarButtonProps {
	name?: string;
	symbol?: any;
}

const SmallNavButton = (props: NavbarButtonProps): JSX.Element => {
	return (
		<Button
			color="inherit"
			sx={{ display: { xs: "block", sm: "none" }, fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
			{props.symbol}
		</Button>
	);
};
const BigNavButton = (props: NavbarButtonProps): JSX.Element => {
	return (
		<Button
			color="inherit"
			sx={{ display: { xs: "none", sm: "block" }, fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
			{props.symbol}
			{props.name}
		</Button>
	);
};

export { SmallNavButton, BigNavButton };
