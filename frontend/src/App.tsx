import axios from "axios";
// import "./App.css";
import General_Layout from "./app_layout/index_layout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { login } from "./redux/features/user/userSlice";
import { useEffect } from "react";

const App = () => {
	console.log("app level 2");

	const dispatch = useAppDispatch();

	const user_state = useAppSelector((state) => state.user);

	useEffect(() => {
		if (user_state.id.length > 0) {
			return;
		}
		const token = localStorage.getItem("JWT");
		if (token) {
			try {
				checkJWT(token);
			} catch (error: any) {
				console.log(error);
			}
		}
	}, []);

	const checkJWT = async (token: string) => {
		await axios
			.post(
				"http://localhost:3001/auth/check-jwt",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				dispatch(login(response.data));
			});
	};

	return (
		<div className="App">
			<General_Layout user={user_state} />
		</div>
	);
};

export default App;
