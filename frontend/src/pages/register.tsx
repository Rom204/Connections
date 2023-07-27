import { Box, Button, Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth_service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const authService = new AuthServices();
const Register = (): JSX.Element => {
	const navigation = useNavigate();
	const { register, handleSubmit, watch } = useForm<any>({
		defaultValues: {},
	});
	const [email, username, password, matchingPassword] = watch(["email", "username", "password", "matchingPassword"]);

	const [validEmail, setValidEmail] = useState(false);
	// const [emailFocus, setEmailFocus] = useState(false);

	const [validUsername, setValidUsername] = useState(false);
	// const [usernameFocus, setUsernameFocus] = useState(false);

	const [validPassword, setValidPassword] = useState(false);
	// const [passwordFocus, setPasswordFocus] = useState(false);

	const [validMatchingPassword, setValidMatchingPassword] = useState(false);
	const [matchingPasswordFocus, setMatchingPasswordFocus] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);

	// const [visibility, setVisibility] = useState("");

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
				const registration = await authService.checkRegistration(data);
				console.log(registration);
				if (registration) {
					setSuccess(true);
				}
			} catch (error: any) {
				console.log("this is frontend level", error);
			}
		}
	};
	return (
		<Box sx={{ height: "100vh", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", flexWrap: "wrap" }}>
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
					sx={{ backgroundColor: "whitesmoke", height: "75%", width: { xs: "90%", md: "70%" }, display: "flex", flexDirection: "column", alignItems: "center" }}>
					<h1>Register</h1>
					<form
						// TODO: change unknown
						onSubmit={handleSubmit((data: unknown) => {
							console.log(data);
							registerValidation(data);
						})}>
						<Box sx={{ width: "60vw", display: "flex", flexDirection: "column" }}>
							<TextField
								sx={{ display: "flex", marginBottom: "10px" }}
								id="email_input"
								type="text"
								fullWidth
								placeholder="email"
								label="email"
								variant="filled"
								error={!validEmail && email?.length > 0}
								{...register("email")}
							/>
							<TextField
								sx={{ display: "flex", marginBottom: "10px" }}
								id="username_input"
								type="text"
								fullWidth
								placeholder="username"
								label="username"
								variant="filled"
								error={!validUsername && username?.length > 0}
								{...register("username")}
							/>
							<TextField
								sx={{ display: "flex", marginBottom: "10px" }}
								id="password_input"
								// TODO: add visibility function
								type="password"
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
							/>

							<TextField
								sx={{ display: "flex", marginBottom: "10px" }}
								id="matchingPassword_input"
								type="password"
								placeholder="confirm password"
								label="matching password"
								variant="filled"
								// TODO: consider change that function because of exposure of the regular password
								error={!validMatchingPassword && matchingPassword?.length > 0}
								helperText={!validMatchingPassword && matchingPassword?.length > 0 ? "both password must be the same" : ""}
								onFocus={() => {
									setMatchingPasswordFocus(true);
								}}
								{...register("matchingPassword", {
									onBlur: () => {
										setMatchingPasswordFocus(false);
									},
								})}
							/>
						</Box>

						<Button
							sx={{ marginBottom: "1rem", height: "4rem", width: "5rem" }}
							disabled={username?.length > 3 && password?.length > 7 ? false : true}
							type="submit"
							variant="contained"
							color="info">
							{/* <EastIcon /> */}
							sign up
						</Button>
					</form>
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
		</Box>
	);
};

export default Register;
