import { PrismaClient } from '@prisma/client'
import PrismaUserServices from '../services/user_services';
import UserModel from '../models/user_model';
import AuthServices from '../services/auth_services';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const user_service = new PrismaUserServices(prisma);
const service = new AuthServices()

const createUser = async (user: UserModel) => {

    const { username, password, email } = user;

    if(!username || !password || !email) {
        throw new Error("username, password or email are missing")
    }
    try {
        const isUserExists = await user_service.getUserByUsername(username);
        if (isUserExists) {
            throw new Error("this username is already taken")
        }
        const isEmailExists = await user_service.getUserByEmail(email);
        if (isEmailExists) {
            throw new Error("this email already exists")
        } else {
            await user_service.createUser(user)
        }

    } catch (error) {
        throw error
    }
}
// TODO: change any type 
const followUser = async (followedID: string, followingID: string) => {
    if(!followedID || !followingID) {
        throw new Error("data of users id's not provided ")
    }
    try {
        await user_service.followUser(followedID,followingID);
    } catch (error) {
        throw error
    }
}

const getAllUsers = async (user_id: string): Promise<object> => {
    const allUnfollowedUsers = await user_service.getAllUsers(user_id);
    return allUnfollowedUsers;
}


const getAllFollowedUsers = async (user_id: string): Promise<object> => {
    const allFollowedUsers = await user_service.getAllFollowedUsers(user_id)
    return allFollowedUsers;
}

const getUser = async (user: UserModel) => {
    const singleUser = await user_service.getUser(user)
    return singleUser
}

const getSingleUserByID = async (user_id: string) => {
    const singleUser = await user_service.getSingleUserByID(user_id)
    return singleUser

}

const getUserByUsername = async (username: string) => {
    const user = await user_service.getUserByUsername(username)
    return user
}

const getSingleUserFollowers = async (user_id: string) => {
    const singleUserFollowers = await user_service.getSingleUserFollowers(user_id);
    return singleUserFollowers
}

const getSingleUserFollowings = async (user_id: string) => {
    const singleUserFollowings = await user_service.getSingleUserFollowings(user_id);
    return singleUserFollowings
}

const verifyingUser = async (user: UserModel) => {
    // TODO implement jwt token authentication here
    console.log(user)
    const { username, password } = user;

    if(!username || !password) {
        throw new Error("username or password are missing")
    }

    const potentialUser = await user_service.getUserByUsername(user.username);
    if (!potentialUser) {
        throw new Error(`No such account with the given credentials`)
    }

    const expectedPassword = await service.comparePassword(user.password, potentialUser.password)
    
    if (!expectedPassword) {
        throw new Error("invalid username or password")
    }

    if (expectedPassword) {
        return potentialUser
    }

}


const deleteUser = async (user_id: string) => {
    // await user_service.deleteUser(user_id);
}

const unFollowUser = async (followedID: string, followingID: string) => {
    if(!followedID || !followingID) {
        throw new Error("data of users id's not provided ")
    }
    try {
        await user_service.unFollowUser(followedID,followingID);
    } catch (error) {
        throw error
    }
}

export default {
    createUser,
    followUser,
    getAllUsers,
    getAllFollowedUsers,
    getSingleUserFollowings,
    getUser,
    getSingleUserByID,
    getUserByUsername,
    getSingleUserFollowers,
    verifyingUser,
    deleteUser,
    unFollowUser
}