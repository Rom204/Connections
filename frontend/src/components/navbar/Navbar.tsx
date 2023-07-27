import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import CreatePost from "../CreatePost/createPost";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector((state) => state.user);
	const [file, setFile] = useState("");
	const [image, setImage] = useState<any>();
	const [open, setOpen] = useState(false);

	const { register, handleSubmit } = useForm({});

	const handleFile = (e: any) => {
		// console.log(e.target.files);
		const file = e.target.files[0];
		setFile(e.target.files[0]);
		previewFile(file);
	};

	const previewFile = (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result) ;
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
		<Box sx={{ display: "flex" }}>
			Navbar
			{navigation.map((item) => {
				return (
					<NavLink
						state={item.name === "profile" ? isAuth.id : ""}
						key={item.name}
						to={item.path}
						className="NavLink">
						<Button
							color="inherit"
							sx={{ display: { xs: "none", md: "block" }, padding: "0.5rem 1.5rem 0.5rem 1.5rem", fontWeight: "600", ":hover": { backgroundColor: "#5e5959", borderBottom: "5px solid #2596be" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
							{item.name}
						</Button>
					</NavLink>
				);
			})}
			<Button
				onClick={() => {
					dispatch(logout());
					localStorage.removeItem("JWT");
					navigate("/login");
				}}>
				log out
			</Button>
			<Box>
				<Button
					variant="outlined"
					onClick={handleClickOpen}>
					Open form dialog
				</Button>
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
		</Box>
	);
};

export default Navbar;
