import { Backdrop, Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProgressBar } from "react-loader-spinner";
import { useAppSelector } from "../../redux/hooks";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const CreatePost = (): JSX.Element => {
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

	return (
		<Box>
			<Button
				sx={{ display: { xs: "none", sm: "block" }, fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}
				onClick={handleClickOpen}
				color="inherit">
				<AddBoxRoundedIcon />
				Create
			</Button>
			{/* (medium-) screen size button */}
			<Button
				sx={{ display: { xs: "block", sm: "none" }, fontWeight: "600", ":hover": { backgroundColor: "#5e5959" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}
				onClick={handleClickOpen}
				color="inherit">
				<AddBoxRoundedIcon />
			</Button>
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
	);
};

export default CreatePost;
