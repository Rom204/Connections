import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user_model';
const dotenv = require('dotenv').config();


export default class AuthServices {
    //fields

    //constructor

    //methods
    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public async generateHashedPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    public async createJWT(userData: UserModel): Promise<string> {

        const secretKey = process.env.SECRET_ACCESS_TOKEN
        if (!secretKey) {
            throw new Error("Secret key not found");
        }
        let data = {
            "id": userData.id,
            "username": userData.username,
            "role": userData.role
        }
        const token = jwt.sign(
            { data },
            secretKey,
            { expiresIn: "1h" }
        )
        return token
    }

    public async verifyJWT(token: string): Promise<object> {


        return {}
    }
}




