import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import Post from "../components/common/post/post";
import PostModel from "../models/post_model";

const Feed = (): JSX.Element => {
	const user_state = useAppSelector((state) => state.user);
	const [followedUsersPosts, setFollowedUsersPosts] = useState<PostModel[]>([]);
	console.log("this is the feed component");
	
	useEffect(() => {
		if (user_state.id.length > 0) {
			try {
				getPosts(user_state.id);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("no user initialized");
		}
	}, [user_state]);

	const getPosts = async (user_id: string) => {
		await axios
			.post("http://localhost:3001/user/followed-users-posts", {
				id: user_id,
			})
			.then((response) => {
				console.log(response.data);
				setFollowedUsersPosts(response.data);
			});
	};
	console.log(followedUsersPosts);

	return (
		<Box sx={{ backgroundColor: "grey",  display: "flex", flexWrap: "wrap", justifyContent:"center", textAlign: "center", alignItems: "center", position:"relative" }}>
			{followedUsersPosts.map((post) => {
				return (
					<Post
						key={post.id}
						id={post.id}
						createdAt={post.createdAt}
						secure_url={post.secure_url}
						title={post.title}
						body={post.body}
						author={{
							id: post.author.id,
							username: post.author.username,
						}}
						likes={post.likes}
						comments={post.comments}
					/>
				);
			})}
		</Box>
	);
};

export default Feed;
