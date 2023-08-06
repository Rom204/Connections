import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import UserModel from "../models/user_model";
import User_interaction from "../components/common/user_Interaction/user_interaction";

const Explore = () => {
	const user_state = useAppSelector((state) => state.user);
	const [allUsers, setAllUsers] = useState<UserModel[]>([]);
	console.log("this is the Explore component");
	console.log(user_state);
	useEffect(() => {
		if (user_state.id.length > 0) {
			try {
				getUsers();
			} catch (error) {
				console.log(error);
			}
		}
	}, [user_state]);

	const getUsers = async () => {
		const response = await axios.post("http://localhost:3001/user/all-users", {
			id: user_state.id,
		});

		let data = response.data;
		setAllUsers(data);
	};
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				position: "relative",
				display: "flex",
				flexWrap: "wrap",
				overflowY: "scroll",
				"&::-webkit-scrollbar": { display: "none" },
				justifyContent: "center",
				textAlign: "center",
				alignItems: "center",
			}}>
			<h1>This is the Explore page, here you can follow people and see what they are up to !</h1>
			{allUsers.map((interactedUser) => {
				return (
					<User_interaction
						key={interactedUser.id}
						interactedUser={interactedUser}
						user_id={user_state.id}
					/>
				);
			})}
		</Box>
	);
};

export default Explore;
