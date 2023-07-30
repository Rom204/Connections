import { Card, CardHeader, Skeleton, Avatar, IconButton, CardMedia, CardContent, Typography, Box, Button, TextField } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import PostModel from "../../../models/post_model";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

interface PostViewProps extends PostModel {
	loading?: boolean;
	likeAction: () => void;
	commentSection: () => void;
	commentAction: (comment: string) => void;
}

const PostView = (props: PostViewProps) => {
	
	const { loading = false } = props;
	const { register, handleSubmit } = useForm({});


	const handleLikeButton = () => {
		props.likeAction();
	};
	const createNewComment = (comment: any) => {
		props.commentAction(comment)
	}

	return (
		<Card sx={{ width: "100%", margin: "1rem", backgroundColor: "transparent", color: "white" }}>
			<CardHeader
			sx={{ color: 'white' }}
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
							<MoreVertIcon sx={{ color: "white" }}/>
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
							style={{ textDecoration: 'none', color: "white"}}>
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
						<p style={{ color: "white" , margin:0, padding: 0}}>
							{new Date(props.createdAt).toLocaleDateString()}
						</p>
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
						<FavoriteBorderOutlinedIcon />
					</IconButton>
					<IconButton aria-label="settings">
						<InsertCommentOutlinedIcon />
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
							color="text.secondary"
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
									<li key={comment.id} style={{color:"white"}}>
										{comment.user.username +"  "+ comment.comment}
									</li>
								)
							})}
						</ul>
						<form
						onSubmit={handleSubmit((data) => {
							console.log(data);
							createNewComment(data);
						})}>
						
						<TextField
							sx={{textColor:"white"}}
							autoFocus
							margin="dense"
							id="name"
							label="comment"
							type="text"
							fullWidth
							variant="standard"
							{...register("comment")}
						/>
						
						<Button type="submit">enter comment</Button>
					</form>
					</div>
					)}
				</Box>
			</CardContent>
			<hr />
		</Card>
	);
};
export default PostView;
