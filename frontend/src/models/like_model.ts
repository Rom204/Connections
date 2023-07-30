
export default class LikeModel {
    public id: string;
    public userId: string
    public postId: string

    constructor(Like: LikeModel) {
        this.id = Like.id;
        this.userId = Like.userId;
        this.postId= Like.postId;
    }
}