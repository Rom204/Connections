import { useForm } from "react-hook-form";
import { Box, Button, Card, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/user/userSlice";

const Login = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit, watch } = useForm({});
	const navigation = useNavigate();
	const [username, password] = watch(["username", "password"]);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		setErrMsg("");
	}, [username, password]);
	const loginValidation = async (data: any) => {
		if (username && password) {
			try {
				await axios
					.post("http://localhost:3001/user/user-login", {
						username: data.username,
						password: data.password,
					})
					.then((response) => {
						const token: string = response.headers.authorization?.split(" ")[1];
						localStorage.setItem("JWT", token);
						dispatch(login(response.data));
						navigation("/feed");
					});
			} catch (error: any) {
				console.log(error);
				if (!error?.response) {
					setErrMsg("no server response");
				}
				if (error.response?.status === 404) {
					setErrMsg("invalid username or password");
				}
			}
		}
	};

	return (
		<Box sx={{ height: "100vh", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>
			<Card
				elevation={24}
				sx={{ backgroundColor: "whitesmoke", height: "75%", width: { xs: "90%", md: "70%" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<h1>login</h1>
				<form
					onSubmit={handleSubmit((data: unknown) => {
						loginValidation(data);
					})}>
					<TextField
						id="username_input"
						type="text"
						placeholder="username"
						label="username"
						variant="standard"
						{...register("username")}
					/>
					<TextField
						id="password_input"
						type="password"
						placeholder="password"
						label="password"
						variant="standard"
						{...register("password")}
					/>

					<Button
						sx={{ marginBottom: "1rem", height: "4rem", width: "5rem" }}
						disabled={username?.length > 3 && password?.length > 7 ? false : true}
						type="submit"
						variant="contained"
						color="info">
						{/* <EastIcon /> */}
					</Button>
				</form>
				<p>
					Don't have an account yet ? <br />
					<Button
						onClick={() => {
							navigation("/register");
						}}>
						<strong>sign-up now</strong>
					</Button>
				</p>
			</Card>
		</Box>
	);
};

export default Login;
