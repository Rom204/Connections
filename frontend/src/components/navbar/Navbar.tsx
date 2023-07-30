import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import CreatePost from "../CreatePost/createPost";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "../../c637fc51e3174133b678daa8979e1bee.png";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user);
	const [file, setFile] = useState("");
	const [image, setImage] = useState<any>();
	const [open, setOpen] = useState(false);

	const { register, handleSubmit } = useForm({});

	const handleFile = (e: any) => {
		const file = e.target.files[0];
		setFile(e.target.files[0]);
		previewFile(file);
	};

	const previewFile = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setFile("");
		setOpen(false);
	};

	const checkValid = async (newPost: any) => {
		console.log(image);
		newPost.image = image;
		console.log(newPost);
		try {
			await axios.post(`http://localhost:3001/post/${isAuth.id}/create-post`, newPost);
		} catch (error) {
			console.log(error);
		}
	};

	const navigation = [
		{ name: "feed", path: "/feed" },
		{ name: "profile", path: `/profile/${isAuth.username}` },
		{ name: "explore", path: "/explore" },
	];
	return (
		<Box sx={{ display: "flex", flexDirection: "column", position: "fixed",height:"100%" }}>
			<img src={logo} alt="" style={{ height:"6rem", width: "6rem" }} />
			{navigation.map((item) => {
				return (
					<NavLink
						state={item.name === "profile" ? isAuth.id : ""}
						key={item.name}
						to={item.path}
						style={{ textDecoration: "none", color: "white" }}>
						<Button
							color="inherit"
							sx={{ display: { xs: "none", md: "block" }, padding: "0.5rem 1.5rem 0.5rem 1.5rem", fontWeight: "600", ":hover": { backgroundColor: "#5e5959"}, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
							{item.name}
						</Button>
					</NavLink>
				);
			})}
			<Button
				sx={{ color: "white" }}
				variant="outlined"
				onClick={handleClickOpen}>
				Create
			</Button>
			<Box>
				<Dialog
					open={open}
					onClose={handleClose}>
					<DialogTitle>Upload new post</DialogTitle>
					<CardMedia
						component="img"
						height="194"
						image={image}
						alt="chosen image"
					/>
					<DialogContent>
						<form
							onSubmit={handleSubmit((data) => {
								console.log(data);
								checkValid(data);
							})}>
							<DialogContentText>something...</DialogContentText>
							<input
								type="file"
								onChange={handleFile}
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
							<Button type="submit">upload image</Button>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleClose}>Subscribe</Button>
					</DialogActions>
				</Dialog>
			</Box>
			<Button
				onClick={() => {
					dispatch(logout());
					localStorage.removeItem("JWT");
					navigate("/login");
				}}>
				log out
			</Button>
			<hr />
		</Box>
	);
};

export default Navbar;
