import Navbar from "../components/navbar/Navbar";

interface HeaderProps {
	user: {
		id: string;
		username: string;
		role: string;
	};
}

const Header = ({ user }: HeaderProps) => {
	return <div style={{ height:"100%" }}>{user?.id?.length > 0 ? <Navbar /> : ""}</div>;
};
export default Header;
