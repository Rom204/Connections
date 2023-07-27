import express, { Request, Response, NextFunction } from "express";
import { CommentURLS, LikeURLS, PostURLS } from "../utils/urls";
import post_controller from "../controllers/post_controller";

const router = express.Router();


//Routes

//create
router.post(PostURLS.createPostApi, async (request: Request, response: Response) => {
    
    const author_id = request.params.id;
    const post_data = request.body;
    const image = request.body.image;
    // console.log(author_id);
    // console.log(post_data);

    try {
        const uploadImage = await post_controller.cloudImageUpload(image);
        console.log("final stage:", uploadImage)
        const cloudImageURL = uploadImage.secure_url;

        response.status(200).json(await post_controller.createPost(cloudImageURL, post_data, author_id))
    } catch (error) {
        console.log(error)
    }
})

router.post(LikeURLS.createLikeApi, async (request: Request, response: Response) => {
    
    const postID = request.body.postID;
    const likeAuthor = request.body.likeAuthor;
    console.log("creating like: ", postID, likeAuthor)
    try{
        response.status(200).json(await post_controller.createLike(postID, likeAuthor))
    } catch (error) {
        response.status(409).json(error)
    }
})

router.post(CommentURLS.createCommentApi, async (request: Request, response: Response) => {
    
    const postID = request.body.postID;
    const commentAuthor = request.body.commentAuthor;
    const comment = request.body.comment["comment"]
    console.log("creating comment: ", postID, commentAuthor, comment)
    try{
        response.status(200).json(await post_controller.createComment(postID, commentAuthor, comment))
    } catch (error) {
        response.status(409).json(error)
    }
})

//read
router.get("/", async (request: Request, response: Response) => {
    response.status(200).json("posts router is working properly")
})


router.get(PostURLS.getAllPostsApi, async (request: Request, response: Response) => {
    response.status(201).json(await post_controller.getAllPosts())
})
//update
//delete
router.delete(PostURLS.deleteAllPostsApi, async (request: Request, response: Response) => {
    response.status(204).json(await post_controller.deleteAllPosts())
})

export default router;

