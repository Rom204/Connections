import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect, useState } from "react";
import General_Layout from "./app_layout/index_layout";
import { login, logout } from "./redux/features/user/userSlice";
import ApiService from "./services/api_service";
import { Button, Modal, Typography } from "@mui/material";

const App = () => {
	console.log("render stage: app");
	const apiService = new ApiService();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const handleModalClose = () => {
		dispatch(logout());
		localStorage.removeItem("JWT");
		setModalOpen(false);
	};
	useEffect(() => {
		if (user.id.length > 0) return;

		const token = localStorage.getItem("JWT");
		if (token) {
			apiService
				.isJwtValid()
				.then((response) => dispatch(login(response.data)))
				.catch(function (error) {
					switch (error.response.status) {
						case 404:
							setModalMessage("It seems like we have a problem to authenticate you , please try and login again.");
							break;
						case 500:
							setModalMessage("Please come later and try again :)");
							break;
					}
					setModalOpen(true);
				});
		}
	}, []);

	return (
		<div className="App">
			<General_Layout user={user} />
			<Modal
				open={modalOpen}
				onClose={handleModalClose}
				aria-labelledby="error-modal-title"
				aria-describedby="error-modal-description">
				<div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, backgroundColor: "white", padding: 20 }}>
					<Typography
						id="error-modal-title"
						variant="h6"
						component="h2">
						Oops
					</Typography>
					<Typography
						id="error-modal-description"
						sx={{ mt: 2 }}>
						{modalMessage}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{ mt: 2 }}
						onClick={handleModalClose}>
						Move to login page
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default App;
