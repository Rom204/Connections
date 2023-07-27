import { Post, PrismaClient } from "@prisma/client";
import PostModel from "../models/post_model";


export default class PrismaPostServices {
    //fields 
    private prisma: PrismaClient;
    //constructor
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    //methods

    //create
    public async createPost(secure_url: string, post_data: PostModel, author_id: string): Promise<Post> {
        const newPost = await this.prisma.post.create({
            data: {
                secure_url: secure_url,
                title: post_data.title,
                body: post_data.body,
                author: {
                    connect: {
                        id: author_id
                    }
                }
            }
        })
        return newPost;
    }

    public async createLike(postID: string, likeAuthor: string) {

        const existingLike = await this.prisma.like.findFirst({
            where: {
                postId: postID,
                userId: likeAuthor
            }
        });

        if (existingLike) {
            throw new Error("like record already exists");
        }

        if (!existingLike) {
            try {
                await this.prisma.like.create({
                    data: {
                        userId: likeAuthor,
                        postId: postID
                    }
                })
            } catch (error) {
                throw error
            }
        }



    }

    public async createComment (postID: string, commentAuthor: string, comment: string) {
        try {
            await this.prisma.comment.create({
                data: {
                    userId: commentAuthor,
                    postId: postID,
                    comment: comment
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    //read
    public async getAllPosts(): Promise<Post[]> {
        const allPosts = await this.prisma.post.findMany();
        return allPosts
    }

    public async getAllPostsForFeed(): Promise<unknown> {
        const data = await this.prisma.post.findMany({
            // TODO :complete fields
        })
        return data;
    }

    public async getUserPosts(user_id: string): Promise<Post[]> {
        const userPosts = await this.prisma.post.findMany({
            where: {
                authorId: user_id
            }
        })
        return userPosts
    }
    //update
    //delete
    public async deletePost(post_id: string): Promise<void> {
        await this.prisma.post.delete({
            where: {
                id: post_id
            }
        })
    }
    public async deleteAllPosts(): Promise<void> {
        await this.prisma.post.deleteMany({})
    }
}
