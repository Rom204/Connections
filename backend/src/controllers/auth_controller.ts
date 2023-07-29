import { PrismaClient } from "@prisma/client";
import UserModel from "../models/user_model";
import AuthServices from "../services/auth_services"
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import PrismaUserServices from "../services/user_services";
const dotenv = require("dotenv").config();

const prisma = new PrismaClient();
const user_service = new PrismaUserServices(prisma);
const authService = new AuthServices(prisma);


const register = async (potentialUserData: UserModel) => {
    const { username, password, email } = potentialUserData;

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
            await authService.createUser(potentialUserData)
        }
    } catch (error) {
        throw error
    }
}

const checkLogin = (data: object) => {
    // TODO implement login validation logic here.
    // authService.
}


export default {
    register,
    checkLogin
}