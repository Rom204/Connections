import FullPostView from "./FullPostView";

const FullPost = () => {
    // since this represents only one post at a time , 
    // we will make all the backend api calls from here:
    // bring all likes, add new like , remove like,
    // bring all comments , add new comment 
    // 
	return (
		<FullPostView
			isOpen={false}
			handleClose={function (): void {
				throw new Error("Function not implemented.");
			}}
			likeAction={function (): void {
				throw new Error("Function not implemented.");
			}}
			commentSection={function (): void {
				throw new Error("Function not implemented.");
			}}
			commentAction={function (comment: string): void {
				throw new Error("Function not implemented.");
			}}
			id={""}
			createdAt={new Date}
			secure_url={""}
			title={""}
			body={""}
			author={{
				id: "",
				username: "",
			}}
			likes={[]}
			comments={[]}
		/>
	);
};

export default FullPost;
