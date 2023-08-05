import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/user/userSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Settings = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openMenu, setOpenMenu] = useState(false);
	const handleOpenMenu = () => setOpenMenu(true);
	const handleCloseMenu = () => setOpenMenu(false);

	const logoutAction = () => {
		dispatch(logout());
		localStorage.removeItem("JWT");
		navigate("/login");
		handleCloseMenu();
	};
	const actions = [{ icon: <LogoutIcon />, name: "Logout", action: logoutAction }];

	return (
		<Box sx={{ display: { xs: "none", sm: "block" }, height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
			<SpeedDial
				ariaLabel="SpeedDial controlled open example"
				sx={{ position: "absolute", bottom: "3rem", left: "1rem" }}
				icon={<SettingsIcon />}
				onClose={handleCloseMenu}
				onOpen={handleOpenMenu}
				open={openMenu}>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.action}
					/>
				))}
			</SpeedDial>
		</Box>
	);
};

export default Settings;
