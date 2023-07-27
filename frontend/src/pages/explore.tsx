import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import UserModel from "../models/user_model";
import User_interaction from "../components/common/user_Interaction/user_interaction";

const Explore = (): JSX.Element => {
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
		<div>
			<Box
				sx={{
					width: "100wv",
					height: 500,
					backgroundColor: "primary.dark",
					
				}}>
				<h1>this is the Explore page</h1>
				<div>
					{allUsers.map((interactedUser) => {
						return <User_interaction 
                            key={interactedUser.id}
                            interactedUser={interactedUser} 
                            user_id={user_state.id}
                            followStatus={function (): void {
                            throw new Error("Function not implemented.");
                        } }/>
					})}
				</div>
			</Box>
		</div>
	);
};

export default Explore;
