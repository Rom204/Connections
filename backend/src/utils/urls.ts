// urls for the api end points

class AuthURLS {
    public static checkLoginApi = "/check-login";
    public static checkJWTApi = "/check-jwt";
    public static checkRegistration = "/check-registration";
}
class UserURLS {
    public static createUserApi = "/create-user";
    public static userLoginApi = "/user-login";
    public static getAllUsersApi = "/all-users";
    public static getSingleUserApi = "/:id";
    public static getSingleUserFollowersApi = "/:id/followers";
    public static getSingleUserFollowingsApi = "/:id/followings";
    public static getUserByUsernameApi = "/get-userByUsername";
    public static updateUserApi = "/update-user";
    public static deleteUserApi = "/:id";
    public static followUserApi = "/follow";
    public static unFollowUserApi = "/unFollow";
    public static getFollowedUsersPostsApi = "/followed-users-posts";
}

class PostURLS { 
    public static createPostApi = "/:id/create-post";
    public static getAllPostsApi = "/all-posts";
    public static getUserPostsApi = "/:id/posts";
    public static updatePostApi = "/:id";
    public static deleteAllPostsApi = "/delete-allPosts";
    public static deletePostApi = "/:id";
    
}

class CommentURLS {
    public static createCommentApi = "/create-comment";
    public static deleteCommentApi = "/delete-comment";
}

class LikeURLS { 
    public static createLikeApi = "/create-like";
    public static deleteLikeApi = "/delete-like";
}


export {
    AuthURLS,
    UserURLS,
    PostURLS,
    CommentURLS,
    LikeURLS
} ;