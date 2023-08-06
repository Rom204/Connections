import { Box, Button, Card, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth_service";
import MailIcon from "@mui/icons-material/Mail";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import { RegisterLoader } from "../components/common/loaders/loaders";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const authService = new AuthServices();

const Register = () => {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigate();
	const { register, handleSubmit, watch } = useForm<any>({
		defaultValues: {},
	});
	const [email, username, password, matchingPassword] = watch(["email", "username", "password", "matchingPassword"]);

	const [validEmail, setValidEmail] = useState(false);
	const [validUsername, setValidUsername] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [validMatchingPassword, setValidMatchingPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);


	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatchingPassword(password === matchingPassword);
	}, [password, matchingPassword]);

	useEffect(() => {
		setErrorMessage("");
	}, [email, username, password, matchingPassword]);
	// TODO : change any
	const registerValidation = async (data: any) => {
		if (validEmail && validUsername && validPassword && validMatchingPassword) {
			try {
				const registration = await authService.register(data);
				console.log(registration);
				if (registration) {
					setSuccess(true);
					setLoading(false);
				}
			} catch (error: any) {
				// TODO : create an error handler for login and register
				console.log(error);
				setTimeout(() => setLoading(false), 3000);
				if (error.response?.status === 404) {
					setErrorMessage("username or email already taken");
				} else {
					setErrorMessage("Unable to process please try again later");
				}
			}
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleLoading = () => {
		setLoading(true);
	};
	return (
		<Box sx={{ height: "100%", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>
			{success ? (
				<Card
					elevation={24}
					sx={{ backgroundColor: "ghostwhite", height: "70%", width: "80%" }}>
					<h1>Registration Success !</h1>
					<Button
						color="info"
						variant="outlined"
						onClick={() => {
							navigation("/login");
						}}>
						Login
					</Button>
				</Card>
			) : (
				<Card
					elevation={24}
					sx={{ backgroundColor: "whitesmoke", height: { xs: "100%", sm: "80%" }, width: { xs: "100%", md: "70%" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1>Register</h1>
					<form
						style={{ width: "95%", display: "flex", flexDirection: "column" }}
						// TODO: change unknown
						onSubmit={handleSubmit((data: unknown) => {
							handleLoading();
							console.log(data);
							registerValidation(data);
						})}>
						<TextField
							sx={{ display: "flex", marginBottom: "10px" }}
							id="email_input"
							type="text"
							fullWidth
							placeholder="DonJuan@gmail.com"
							label="email"
							variant="filled"
							error={!validEmail && email?.length > 0}
							{...register("email")}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<MailIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							sx={{ display: "flex", marginBottom: "10px" }}
							id="username_input"
							type="text"
							fullWidth
							placeholder="DonJuan"
							label="username"
							variant="filled"
							error={!validUsername && username?.length > 0}
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
							sx={{ display: "flex", marginBottom: "10px" }}
							id="password_input"
							type={showPassword ? "text" : "password"}
							placeholder="password"
							label="password"
							error={!validPassword && password?.length > 0}
							helperText={
								!validPassword && password?.length > 0 ? (
									<span className="instructions">
										{" "}
										8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
									</span>
								) : (
									""
								)
							}
							variant="filled"
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

						<TextField
							sx={{ display: "flex", marginBottom: "10px" }}
							id="matchingPassword_input"
							type={showPassword ? "text" : "password"}
							placeholder="confirm password"
							label="matching password"
							variant="filled"
							// TODO: consider change that function because of exposure of the regular password
							error={!validMatchingPassword && matchingPassword?.length > 0}
							helperText={!validMatchingPassword && matchingPassword?.length > 0 ? "both password must be the same" : ""}
							{...register("matchingPassword")}
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

						<Button
							sx={{ marginBottom: "1rem", height: "4rem", width: "100%" }}
							disabled={validEmail && validUsername && validPassword && validMatchingPassword ? false : true}
							type="submit"
							variant="contained"
							color="info">
							sign up
						</Button>
					</form>
					{errorMessage ? <h2 style={{ color: "red" }}>{errorMessage}</h2> : ""}
					<p>
						have an account ? <br />
						<Button
							onClick={() => {
								navigation("/login");
							}}>
							<strong>log in</strong>
						</Button>
					</p>
				</Card>
			)}
			<RegisterLoader loading={loading}/>
		</Box>
	);
};

export default Register;
