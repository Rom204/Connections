import Navbar from "../components/navbar/Navbar";

interface HeaderProps {
	user: {
		id: string;
		username: string;
		role: string;
	};
}

const Header = ({ user }: HeaderProps): JSX.Element => {
	return <div>{user.id.length > 0 ? <Navbar /> : ""}</div>;
};
export default Header;
