import { Avatar, Box, Button, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import PostModel from "../../../models/post_model";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const COMMENT_REGEX = /^[A-z][A-z0-9-_ ,.]{1,100}$/;

interface FullPostView extends PostModel {
	isOpen: boolean;
	uploadingComment?: boolean;
	handleClose: () => void;
	likeAction: () => void;
	commentSection: () => void;
	commentAction: (comment: string) => void;
}

const FullPostView = (props: FullPostView) => {
	const { register, handleSubmit, watch } = useForm({});
	const [comment] = watch(["comment"]);
	const [validComment, setValidComment] = useState(false);

	useEffect(() => {
		setValidComment(COMMENT_REGEX.test(comment));
	}, [comment]);

	const createNewComment = (comment: any) => {
		props.commentAction(comment);
	};
	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<Dialog
                onClose={props.handleClose}
				fullWidth
				open={props.isOpen}>
				<Box sx={{ display: "flex", width: "100%", backgroundColor: "#393646", color: "white" }}>
					<Box sx={{ width: "50%", display: { xs: "none", sm: "block" } }}>
						<CardMedia
							component="img"
							height="600"
							image={props.secure_url}
							alt="chosen image"
						/>
					</Box>
					<Box sx={{ margin: 0}}>
						<DialogTitle sx={{ display: { xs: "none", sm: "block" }}}>
							<img
								src=""
								alt="profileImg"
							/>
							<Typography>{props.author.username}</Typography>
							<Typography>{props.title}</Typography>
						</DialogTitle>
						<hr />
						<DialogContent sx={{ width: { xs: "100%", sm: "100%" }, padding:0 }}>
							<List
								sx={{ overflowY: "scroll", height: 300, padding: 0, width:"100%" }}>
								{props.comments.map((comment) => {
									return (
										<ListItem
											// secondaryAction={
											// 	<IconButton
											// 		edge="end"
											// 		aria-label="delete">
											// 		<DeleteIcon />
											// 	</IconButton>
											// }
											key={comment.id}>
											<ListItemAvatar>
												<Avatar>
													<AccountCircleIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={comment.comment}
												secondary={comment.user.username}
											/>
										</ListItem>
									);
								})}
							</List>
						</DialogContent>
						<hr />
						<DialogActions>
							<form
								onSubmit={handleSubmit((data) => {
									console.log(data);
									createNewComment(data);
								})}>
								<TextField
									color="primary"
									sx={{ input: { color: "white" } }}
									autoFocus
									margin="dense"
									id="name"
									label="add comment..."
									type="text"
									fullWidth
									variant="standard"
									{...register("comment")}
									InputLabelProps={{ style: { fontSize: "small", fontWeight: "bold", fontFamily: "Arial", color: "white", borderColor: "white" } }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												{props.uploadingComment ? (
													<CircularProgress />
												) : (
													<Button
														color="primary"
														variant="text"
														disabled={comment && validComment ? false : true}
														type="submit">
														<strong>Post</strong>
													</Button>
												)}
											</InputAdornment>
										),
									}}
								/>
							</form>
							<Button onClick={props.handleClose}>
								<CloseIcon />
							</Button>
						</DialogActions>
					</Box>
				</Box>
			</Dialog>
		</Box>
	);
};

export default FullPostView;
