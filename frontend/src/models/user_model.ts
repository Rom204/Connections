import PostModel from "./post_model";

export default class UserModel { 
    public id?: string;
    public username?: string;
    public password?: string;
    public email?: string
    public role?: string
    // TODO: check those types if they are correct way
    public profileImg?: string | undefined
    public posts? : PostModel[]
    public followedByIDs? : string[]
    public followingIDs? : []
    
    constructor(user: UserModel) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email
        this.role = user.role;
    }
}