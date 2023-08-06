import { Backdrop } from "@mui/material";
import { Dna, MagnifyingGlass, ProgressBar } from "react-loader-spinner";

interface Loader {
	loading: boolean;
}

const RegisterLoader = (props: Loader) => {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={props.loading}>
			<Dna
				visible={true}
				height="80"
				width="80"
				ariaLabel="dna-loading"
				wrapperStyle={{}}
				wrapperClass="dna-wrapper"
			/>
		</Backdrop>
	);
};

const LoginLoader = (props: Loader) => {
    return (
        <Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={props.loading}>
				<Dna
					visible={true}
					height="80"
					width="80"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
				/>
			</Backdrop>
    )
}

const FeedLoader = (props: Loader) => {
    return ( 
        <Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={props.loading}>
				<h1>Fetching posts</h1>
				<MagnifyingGlass
					visible={true}
					height="80"
					width="80"
					ariaLabel="MagnifyingGlass-loading"
					wrapperStyle={{}}
					wrapperClass="MagnifyingGlass-wrapper"
					glassColor="#c0efff"
					color="#e15b64"
				/>
			</Backdrop>
    )
}

const CreatePostLoader = (props: Loader) => {
    return (
        <Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={props.loading}>
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
    )
}

export {
    RegisterLoader,
    LoginLoader,
    FeedLoader,
    CreatePostLoader
}
