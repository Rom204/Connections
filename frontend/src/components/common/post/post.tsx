import PostView from "./postView";
import PostModel from "../../../models/post_model";
import axios from "axios";
import { useAppSelector } from "../../../redux/hooks";

interface PostProps extends PostModel {
	loading?: boolean;
}

const Post = (props: PostProps) => {
	const user_state = useAppSelector((state) => state.user);

	const handleLikeAction = async () => {
		console.log(props.id, user_state.id);
		try {
			await axios.post("http://localhost:3001/post/create-like", {
				postID: props.id,
				likeAuthor: user_state.id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleCommentAction = async (comment: string) => {
		console.log(props.id, user_state.id, comment);
		try {
			await axios.post("http://localhost:3001/post/create-comment", {
				postID: props.id,
				commentAuthor: user_state.id,
				comment: comment,
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
			likes={props.likes}
			comments={props.comments}
		/>
	);
};
export default Post;
