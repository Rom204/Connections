import { useForm } from "react-hook-form";
import { Box, Button, Card, IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/user/userSlice";
import LoginIcon from "@mui/icons-material/Login";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit, watch } = useForm({});
	const navigation = useNavigate();
	const [username, password] = watch(["username", "password"]);
	const [errMsg, setErrMsg] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	useEffect(() => {
		setErrMsg("");
	}, [username, password]);
	const loginValidation = async (data: any) => {
		if (username && password) {
			try {
				await axios
					.post("http://localhost:3001/auth/api/login", {
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
		<Box sx={{ height: "80vh", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>
			<Card
				elevation={24}
				sx={{ backgroundColor: "whitesmoke", height: "75%", width: { xs: "50%", md: "50%" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
				<h1>login</h1>
				<form
					style={{ width: "90%", height: "100%", display: "flex", flexDirection: "column", padding: "0", marginBottom: "3rem", position: "relative" }}
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
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="password_input"
						type={showPassword ? 'text' : 'password'}
						placeholder="password"
						label="password"
						variant="standard"
						{...register("password")}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<KeyIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<p>
						Don't have an account yet ? <br />
						<Button
							onClick={() => {
								navigation("/register");
							}}>
							<strong>sign-up now</strong>
						</Button>
					</p>
					<Button
						sx={{ height: "3rem", width: "100%", position: "absolute", bottom: 0 }}
						disabled={username?.length > 3 && password?.length > 7 ? false : true}
						type="submit"
						variant="contained"
						color="info">
						login
						<LoginIcon />
					</Button>
				</form>
			</Card>
		</Box>
	);
};

export default Login;
