
export default class CommentModel {
    public id: string;
    public createdAt: Date;
    public comment: string
    public user: {
        id: string,
        username: string
    }
    public post: {
        id: string
    }

    constructor(Comment: CommentModel) {
        this.id = Comment.id;
        this.createdAt = Comment.createdAt;
        this.comment = Comment.comment;
        this.user= Comment.user;
        this.post = Comment.post
    }
}