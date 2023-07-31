import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Backdrop, Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "../../c637fc51e3174133b678daa8979e1bee.png";
import { MuiFileInput } from "mui-file-input";
import { ProgressBar } from "react-loader-spinner";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user);
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit } = useForm({});

	const handleFile = (newFile: File | null) => {
		const file = newFile;
		console.log(file);
		setFile(file);
		if (file === null) {
			setImage(file);
		} else {
			previewFile(file);
		}
	};

	const previewFile = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result);
		};
	};
	const handleLoading = () => {
		setLoading(true);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setFile(null);
		setImage(null);
		setLoading(false);
		setOpen(false);
	};

	const checkValid = async (newPost: any) => {
		console.log(image);
		newPost.image = image;
		console.log(newPost);
		try {
			await axios.post(`http://localhost:3001/post/${isAuth.id}/create-post`, newPost).then((response) => {
				console.log(response.data);
				handleClose();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const navigation = [
		{ name: "feed", path: "/feed" },
		{ name: "profile", path: `/profile/${isAuth.username}` },
		{ name: "explore", path: "/explore" },
	];
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
		<Box sx={{ display: "flex", flexDirection: "column", position: "fixed", height: "100%" }}>
			<Box sx={{ flexGrow: 1 }}>
				<img
					src={logo}
					alt=""
					style={{ height: "6rem", width: "6rem" }}
				/>
				{navigation.map((item) => {
					return (
						<NavLink
							state={item.name === "profile" ? isAuth.id : ""}
							key={item.name}
							to={item.path}
							style={{ textDecoration: "none", color: "white" }}>
							<Button
								color="inherit"
								sx={{ display: { xs: "none", md: "block" }, padding: "0.5rem 1.5rem 0.5rem 1.5rem", fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
								{item.name}
							</Button>
						</NavLink>
					);
				})}
				<Button
					sx={{ display: { xs: "none", md: "block" }, padding: "0.5rem 1.5rem 0.5rem 1.5rem", fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}
					// variant="outlined"
					onClick={handleClickOpen}>
					Create
				</Button>
			</Box>
			<Box>
				<Dialog open={open}>
					<DialogTitle>Upload new post</DialogTitle>
					<CardMedia
						component="img"
						height="300"
						image={image}
						alt="chosen image"
					/>
					<DialogContent>
						<form
							onSubmit={handleSubmit((data) => {
								handleLoading();
								console.log(data);
								checkValid(data);
							})}>
							<MuiFileInput
								value={file}
								onChange={handleFile}
								placeholder="Insert a file"
								variant="filled"
							/>

							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="title"
								type="text"
								fullWidth
								variant="standard"
								{...register("title")}
							/>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="content"
								type="text"
								fullWidth
								variant="standard"
								{...register("body")}
							/>
							<Button
								type="submit"
								variant="contained"
								color="warning"
								disabled={file && image ? false : true}>
								Create Post
							</Button>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
					</DialogActions>
					<Backdrop
						sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={loading}>
						<ProgressBar
							height="80"
							width="80"
							ariaLabel="progress-bar-loading"
							wrapperStyle={{}}
							wrapperClass="progress-bar-wrapper"
							borderColor="#F4442E"
							barColor="#51E5FF"
						/>
						<p>please do not exist while uploading the post</p>
					</Backdrop>
				</Dialog>
			</Box>

			<Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
				<SpeedDial
					ariaLabel="SpeedDial controlled open example"
					sx={{ position: "absolute", bottom: 16, right: 16 }}
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
		</Box>
	);
};

export default Navbar;
