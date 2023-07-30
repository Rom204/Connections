import CommentModel from "./comment_model";
import LikeModel from "./like_model";
import UserModel from "./user_model";

export default class PostModel { 
    public id: string;
    public createdAt: Date;
    public secure_url: string;
    public title: string
    public body: string
    public author: {
        id: string
        username: string
    }
    // public likes: string[]
    public likes: LikeModel[]
    public comments: CommentModel[]
    
    constructor(Post: PostModel) {
        this.id = Post.id;
        this.createdAt = Post.createdAt;
        this.secure_url = Post.secure_url;
        this.title = Post.title
        this.body = Post.body;
        this.author = Post.author;
        this.likes = Post.likes;
        this.comments = Post.comments;
    }
}
