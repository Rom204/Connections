import { Card, CardHeader, Skeleton, Avatar, IconButton, CardMedia, CardContent, Typography, Box, Button, TextField, InputAdornment, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import PostModel from "../../../models/post_model";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import LoopIcon from "@mui/icons-material/Loop";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";


const COMMENT_REGEX = /^[A-z][A-z0-9-_ ,.]{1,100}$/;

interface PostViewProps extends PostModel {
	loggedUserID: string;
	loading?: boolean;
	uploadingComment?: boolean;
	likeAction: () => void;
	commentSection: () => void;
	commentAction: (comment: string) => void;
}

const PostView = (props: PostViewProps) => {
	const { loading = false } = props;
	const { register, handleSubmit, watch } = useForm({});
	const [comment] = watch(["comment"]);
	const [like, setLike] = useState(false);
	// const [uploadingComment, setLoadingComment] = useState(false);
	const [validComment, setValidComment] = useState(false);

	useEffect(() => {
		setValidComment(COMMENT_REGEX.test(comment));
	}, [comment]);

	useEffect(() => {
		let found = false;
		for (let i = 0; i < props.likes.length; i++) {
			if (props.likes[i].userId === props.loggedUserID) {
				found = true;
				break;
			}
		}
		setLike(found);
	}, [props.likes]);

	const handleLikeButton = () => {
		setLike((like) => !like);
		props.likeAction();
	};
	const createNewComment = (comment: any) => {
		props.commentAction(comment);
	};

	return (
		<Card sx={{ width: "100%", margin: "1rem", backgroundColor: "transparent", color: "white" }}>
			<CardHeader
				sx={{ color: "white" }}
				avatar={
					loading ? (
						<Skeleton
							animation="wave"
							variant="circular"
							width={40}
							height={40}
						/>
					) : (
						<Avatar
							alt="Ted talk"
							src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
						/>
					)
				}
				action={
					loading ? null : (
						<IconButton aria-label="settings">
							<MoreVertIcon sx={{ color: "white" }} />
						</IconButton>
					)
				}
				title={
					loading ? (
						<Skeleton
							animation="wave"
							height={10}
							width="80%"
							style={{ marginBottom: 6 }}
						/>
					) : (
						<NavLink
							state={props.author.id}
							to={`/profile/${props.author.username}`}
							style={{ textDecoration: "none", color: "white" }}>
							<Button
								color="inherit"
								sx={{ display: { xs: "none", md: "block" }, padding: "0.5rem 1.5rem 0.5rem 1.5rem", fontWeight: "600", ":hover": { backgroundColor: "#5e5959", borderBottom: "5px solid #2596be" }, transition: "color 1s cubic-bezier(0.06, 0.81, 0, 0.98),border-color .5s cubic-bezier(0.06, 0.81, 0, 0.98)" }}>
								{props.author.username}
							</Button>
						</NavLink>
					)
				}
				subheader={
					loading ? (
						<Skeleton
							animation="wave"
							height={10}
							width="40%"
						/>
					) : (
						// Math.floor(Math.floor(new Date().getTime() - new Date(props.createdAt).getTime()) / 1000 / 60 / 60) + " hours ago"
						<p style={{ color: "white", margin: 0, padding: 0 }}>{new Date(props.createdAt).toLocaleDateString()}</p>
					)
				}
			/>
			{loading ? (
				<Skeleton
					sx={{ height: 190 }}
					animation="wave"
					variant="rectangular"
				/>
			) : (
				<CardMedia
					component="img"
					height="500rem"
					image={props.secure_url}
					alt="post image"
				/>
			)}
			<CardContent sx={{ display: "flex", flexDirection: "column" }}>
				<Box sx={{ textAlign: "left" }}>
					<IconButton
						aria-label="settings"
						onClick={() => handleLikeButton()}>
						{like ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon sx={{ color: "white" }} />}
					</IconButton>
					<IconButton aria-label="settings">
						<InsertCommentOutlinedIcon sx={{ color: "white" }} />
					</IconButton>
				</Box>

				<Box sx={{ textAlign: "left", marginLeft: "0.7rem" }}>
					{loading ? (
						<React.Fragment>
							<Skeleton
								animation="wave"
								height={10}
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								animation="wave"
								height={10}
								width="80%"
							/>
						</React.Fragment>
					) : (
						<Typography
							variant="body2"
							color="white"
							component="p">
							{props.likes.length > 0 ? props.likes.length + "Likes" : "No likes yet"}
						</Typography>
					)}
				</Box>

				<Box sx={{ textAlign: "left", marginLeft: "0.7rem" }}>
					{loading ? (
						<React.Fragment>
							<Skeleton
								animation="wave"
								height={10}
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								animation="wave"
								height={10}
								width="80%"
							/>
						</React.Fragment>
					) : (
						<Typography
							variant="body2"
							color="white"
							component="p">
							{props.author.username + " : " + props.body}
						</Typography>
					)}
				</Box>

				<Box sx={{ textAlign: "left", marginLeft: "0.7rem" }}>
					{loading ? (
						<React.Fragment>
							<Skeleton
								animation="wave"
								height={10}
								style={{ marginBottom: 6 }}
							/>
							<Skeleton
								animation="wave"
								height={10}
								width="80%"
							/>
						</React.Fragment>
					) : (
						<div>
							<ul>
								{props.comments.map((comment) => {
									return (
										<li
											key={comment.id}
											style={{ color: "white" }}>
											{comment.user.username + "  " + comment.comment}
										</li>
									);
								})}
							</ul>
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
						</div>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};
export default PostView;
