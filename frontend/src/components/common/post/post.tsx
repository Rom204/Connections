import PostView from "./postView";
import PostModel from "../../../models/post_model";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";

interface PostProps extends PostModel {
	loading?: boolean;
}

const Post = (props: PostProps) => {
	const user = useAppSelector((state) => state.user);
	const [likes, setLikes] = useState([])
	const [uploadingComment, setUploadingComment] = useState(false);
	const handleLikeAction = async () => {
		console.log(props.id, user.id);
		try {
			await axios.put("http://localhost:3001/post/api/handle-like", {
				postID: props.id,
				likeAuthor: user.id,
			}).then((response) => {
				console.log(response);
				setLikes(response.data)
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCommentAction = async (comment: string) => {
		setUploadingComment(true);
		console.log(props.id, user.id, comment);
		try {
			await axios.post("http://localhost:3001/post/create-comment", {
				postID: props.id,
				commentAuthor: user.id,
				comment: comment,
			}).then((response) => {
				console.log(response.data);
				setUploadingComment(false);
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<PostView
			loading={props.loading}
			likeAction={handleLikeAction}
			commentSection={function (): void {
				throw new Error("Function not implemented.");
			}}
			commentAction={handleCommentAction}
			id={props.id}
			createdAt={props.createdAt}
			secure_url={props.secure_url}
			title={props.title}
			body={props.body}
			author={{
				id: props.author.id,
				username: props.author.username,
			}}
			likes={likes && likes.length > 0 ? likes : props.likes}
			comments={props.comments}
			uploadingComment={uploadingComment}
			loggedUserID={user.id}
		/>
	);
};
export default Post;
