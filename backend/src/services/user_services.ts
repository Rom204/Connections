import { PrismaClient, User } from "@prisma/client";
import UserModel from "../models/user_model";
import AuthServices from "./auth_services";

const authService = new AuthServices()

export default class PrismaUserServices {
    // some fields and methods related to user here
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }

    //methods



    //CRUD methods
    //create
    public async createUser(user: UserModel) {
        try {
            const hashedPassword = await authService.generateHashedPassword(user.password)
            await this.prisma.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword,
                    email: user.email
                }
            })
        } catch (error) {
            // console.log(error);
            throw error
        }
    }

    public async followUser(followedID: string, followingID: string) {
        try {
            const follower = await this.prisma.user.findUnique({ where: { id: followedID } });
            const following = await this.prisma.user.findUnique({ where: { id: followingID } });

            await this.prisma.user.update({
                where: {
                    id: follower?.id
                },
                data: {
                    followedBy: {
                        connect: {
                            id: following?.id
                        }
                    }
                }
            });

            await this.prisma.user.update({
                where: {
                    id: following?.id
                },
                data: {
                    following: {
                        connect: {
                            id: follower?.id
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        } finally {
            await this.prisma.$disconnect()
        }
    }
    //read
    public async getAllUsers(user_id: string): Promise<User[]> {
        // const requestingUser = await this.prisma.user.findUnique({
        //     where: {
        //         id: user_id
        //     },
        //     include: {
        //         following: true
        //     }
        // });
        // const usersNotFollowed = await this.prisma.user.findMany({
        //     where: {
        //         id: {
        //             notIn: requestingUser?.following.map((user) => user.id)
        //         },
        //         AND: {
        //             NOT: {
        //                 id: user_id
        //             },
        //         }
        //     },
        //     include: {
        //         posts: true
        //     }
        // })
        const allUsers = await this.prisma.user.findMany({
            where: {
                NOT: {
                    id: user_id
                }
            },
            include: {
                posts: true
            }
        })
        return allUsers
    }

    public async getAllFollowedUsers(user_id: string) {
        const allFollowedUsersIDs = await this.prisma.user.findMany({
            where: {
                followedByIDs: {
                    hasSome: [user_id]
                }
            },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        body: true,
                        createdAt: true,
                        secure_url: true,
                        likes: true,
                        comments: {
                            select: {
                                user: true,
                                comment: true
                            }
                        },
                        author: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            }
        });
        const followedUsersPosts = allFollowedUsersIDs.flatMap((user) => user.posts);
        console.log(followedUsersPosts)
        // console.log(allFollowedUsersIDs);
        return followedUsersPosts;
    }

    // public async getAllFollowedUsersPosts(user_id: string)
    // TODO: there is an error when the promise attribute is set to User
    public async getUser(user: UserModel) {
        const singleUser = await this.prisma.user.findUnique({
            where: {
                id: user.id
            }
        })
        return singleUser
    }

    public async getSingleUserByID(user_id: string): Promise<User | null> {

        const singleUser = await this.prisma.user.findUnique({
            where: {
                id: user_id,
            },
            include: {
                posts: true
            }
        });
        return singleUser

    }
    // TODO: there is an error when the promise attribute is set to User
    public async getUserByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        })
        return user
    }

    public async getSingleUserFollowers(user_id: string): Promise<User[] | null> {
        const singleUserFollowers = await this.prisma.user.findMany({
            where: {
                followingIDs : {
                    hasSome: [user_id]
                }
            }
        })
        return singleUserFollowers
    }

    public async getSingleUserFollowings(user_id: string): Promise<User[] | null> {
        const singleUserFollowings = await this.prisma.user.findMany({
            where: {
                followedByIDs : {
                    hasSome: [user_id]
                }
            }
        })
        return singleUserFollowings
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    }
    //update
    // TODO: update service

    //delete
    // public async deleteUser(user_id: string): Promise<void> {
    //     await this.prisma.user.delete({
    //         where: {
    //             id: user_id
    //         }
    //     })
    // }

    public async unFollowUser(followedID: string, followingID: string): Promise<void> {
        try {
            const follower = await this.prisma.user.findUnique({ where: { id: followedID } });
            const following = await this.prisma.user.findUnique({ where: { id: followingID } });
            console.log("unfollowing,", follower, following)
            await this.prisma.user.update({
                where: {
                    id: follower?.id
                },
                data: {
                    followedBy: {
                        disconnect: {
                            id: following?.id
                        }
                    }
                }
            });

            await this.prisma.user.update({
                where: {
                    id: following?.id
                },
                data: {
                    following: {
                        disconnect: {
                            id: following?.id
                        }
                    }
                }
            });

        } catch (error) {
            throw error
        } finally {
            await this.prisma.$disconnect()
        }
    }
}