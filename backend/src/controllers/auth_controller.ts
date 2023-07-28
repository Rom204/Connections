import UserModel from "../models/user_model";
import AuthServices from "../services/auth_services"
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
const dotenv = require("dotenv").config();

const authService = new AuthServices();

interface UserDataProps {
    id: string;
    username: string;
    role: string;
}

// TODO change any type ->
const checkJWT = (token: string): Promise<any> => {
    // retrieve token after removing Bearer

    const data = token?.split(" ")[1];
    // console.log("data from token here",data)
    const secret_key = process.env.SECRET_ACCESS_TOKEN;
    let verifiedToken = token;
    
    if (!data) {
        throw Error('No Token Found');
    }
    if (!secret_key) {
        throw Error('Secret Key not set in environment variable.')
    } else {
        try {
            let userData = {
                id: "",
                username: "",
                role: ""
            }
            // checking if jwt is valid, return encrypted user data if valid
            userData = jwt.verify(data, secret_key) as UserDataProps;
            // console.log("data for userData here:", userData)
            return Promise.resolve({
                token: verifiedToken,
                user: userData,
            })

        } catch (error) {
            // If the jwt is'nt valid because of date expiration then will create new one
            if (error instanceof TokenExpiredError) {
                // let userData = {
                //     id: "hey",
                //     username: "",
                //     role: ""
                // }
                const userData = jwt.decode(data) as UserDataProps;
                const refreshedToken = jwt.sign({ userData }, secret_key, {
                    expiresIn: "1h",
                });

                return Promise.resolve({
                    token: refreshedToken,
                    user: userData,
                });

            } else {
                throw error
            }
        }
    }
}


const checkJWT2 = async (token: string | undefined) => {
    const data = token?.split(" ")[1];
    if (!data) {
        console.log('no JWT found')
    } else {
        const verified = jwt.verify(data, "rom");
        return verified
    }
}

const checkRegistration = (data: object) => {
    // TODO implement registration validation logic here.
    // authService.
}

const checkLogin = (data: object) => {
    // TODO implement login validation logic here.
    // authService.
}


export default {
    checkJWT,
    checkRegistration,
    checkLogin
}