import { Avatar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserModel from "../../../models/user_model";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface UserInteractionViewProps {
	interactedUser: UserModel | undefined;
	isFollowed: boolean;
	isMyProfile: boolean;
	allFollowers: [];
	allFollowings: [];
	handleFollow: () => void;
	handleUnFollow: () => void;
	showFollowers: () => void;
	showFollowing: () => void;
}

const User_interaction_view = (props: UserInteractionViewProps) => {
	const [open, setOpen] = useState(false);
	const [usersType, setUsersType] = useState("");

	const handleClickOpenFollowers = () => {
		setOpen(true);
		props.showFollowers();
		setUsersType("followers");
	};

	const handleClickOpenFollowings = () => {
		setOpen(true);
		props.showFollowing();
		setUsersType("followings");
	};

	const handleClose = () => {
		setOpen(false);
		setUsersType("");
	};


	console.log(props.isFollowed);
	return (
		<Card elevation={10} sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}, alignContent: "center", textAlign: "center", alignItems: "center", margin: "1rem", backgroundColor: "transparent" }}>
			<CardHeader
				sx={{ display: "flex", flexDirection: "column", alignContent: "center", textAlign: "center" }}
				avatar={
					<Avatar
						alt="profile picture"
						src={props.interactedUser?.profileImg ? props.interactedUser?.profileImg : ""}>
						<AccountCircleIcon />
					</Avatar>
				}
				title={props.interactedUser?.username}
			/>
			<CardContent>
				<ButtonGroup
					variant="contained"
					aria-label="outlined primary button group">
					<Button>{`${props.interactedUser?.posts?.length} Posts`}</Button>
					<Button
						onClick={() => {
							handleClickOpenFollowers();
						}}>{`${props.interactedUser?.followedByIDs?.length} Followers`}</Button>
					<Button
						onClick={() => {
							handleClickOpenFollowings();
						}}>{`${props.interactedUser?.followingIDs?.length} Following`}</Button>
				</ButtonGroup>
				{props.isMyProfile ? (
					""
				) : (
					<CardActions>
						<Button
							variant="contained"
							onClick={
								props.isFollowed
									? () => {
											props.handleUnFollow();
									  }
									: () => {
											props.handleFollow();
									  }
							}>
							{props.isFollowed ? "UnFollow" : "Follow"}
						</Button>
						<Button
							variant="outlined"
							disabled>
							MESSAGE
						</Button>
					</CardActions>
				)}
			</CardContent>
			<Box>
				<Dialog
					open={open}
					onClose={handleClose}>
					<DialogTitle>
						{usersType === "followers" && `${props.interactedUser?.username}'s Followers`}
						{usersType === "followings" && `${props.interactedUser?.username}'s Followings`}
					</DialogTitle>
					<DialogContent>
						{usersType === "followers" && (
							<ul>
								{props.allFollowers.map((follower) => (
									<li key={follower["id"]}>
										<NavLink
											onClick={handleClose}
											key={follower["id"]}
											state={follower["id"]}
											to={`/profile/${follower["username"]}`}
											className="NavLink">
											{follower["username"]}
										</NavLink>
									</li>
								))}
							</ul>
						)}

						{usersType === "followings" && (
							<ul>
								{props.allFollowings.map((follower) => (
									<li key={follower["id"]}>{follower["username"]}</li>
								))}
							</ul>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Close window</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Card>
	);
};
export default User_interaction_view;
