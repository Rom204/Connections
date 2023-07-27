import UserModel from "../../../models/user_model";
import { useEffect, useState } from "react";
import axios from "axios";
import User_interaction_view from "./user_interaction_view";

interface UserInteractionsProps {
	interactedUser: UserModel | undefined;
	user_id?: string;
	followStatus: () => void;
}

const User_interaction = (props: UserInteractionsProps) => {
	const [isFollowed, setIsFollowed] = useState(false);
	const [isMyProfile, setIsMyProfile] = useState(false);
	const [allFollowers, setAllFollowers] = useState<any>([]);
	const [allFollowings, setAllFollowings] = useState<any>([]);
	// const [usersList, setUsersList] = useState([]);
	console.log(props.interactedUser, props.user_id);

	useEffect(() => {
		if (props.interactedUser?.id === props.user_id) {
			setIsMyProfile(true);
		}
	}, []);

	useEffect(() => {
		if (!props.user_id) {
			console.log("no user id initialized");
			return;
		}
		const found = props.interactedUser?.followedByIDs?.includes(props.user_id);
		console.log(found);
		if (!found) {
			setIsFollowed(false);
		}
		if (found) {
			setIsFollowed(true);
		}
	}, []);

	const handleFollow = async () => {
		try {
			await axios.put("http://localhost:3001/user/follow", {
				followedUser: props.interactedUser?.id,
				followingUser: props.user_id,
			});
			setIsFollowed(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnFollow = async () => {
		try {
			await axios.put("http://localhost:3001/user/unFollow", {
				data: {
					followedUser: props.interactedUser?.id,
					followingUser: props.user_id,
				},
			});
			setIsFollowed(false);
		} catch (error) {
			console.log(error);
		}
	};

	const showFollowers = async () => {
		try {
			await axios.get(`http://localhost:3001/user/${props.interactedUser?.id}/followers`).then((response) => {
				console.log(response.data);
				setAllFollowers(response.data);
			});
		} catch (error) {
			console.log(error);
		}
	};
	console.log("this was just made for showing all users followers", allFollowers);

	const showFollowing = async () => {
		try {
			await axios.get(`http://localhost:3001/user/${props.interactedUser?.id}/followings`).then((response) => {
				console.log(response.data);
				setAllFollowings(response.data);
			});
		} catch (error) {
			console.log(error);
		}
	};
	console.log("this was just made for showing all user's followings", allFollowings);

	return (
		<User_interaction_view
			interactedUser={props.interactedUser}
			isFollowed={isFollowed}
			handleFollow={handleFollow}
			handleUnFollow={handleUnFollow}
			isMyProfile={isMyProfile}
			showFollowers={showFollowers}
			showFollowing={showFollowing}
			allFollowers={allFollowers}
			allFollowings={allFollowings}
		/>
	);
};
export default User_interaction;
