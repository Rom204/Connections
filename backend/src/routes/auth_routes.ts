import express, { NextFunction, Request, Response } from 'express';
import { AuthURLS } from "../utils/urls";
import auth_controller from '../controllers/auth_controller';


const router = express.Router();

router.get(AuthURLS.checkJWTApi, async (request: Request, response: Response) => {
    try {
        const token = request.headers.authorization;
        console.log(token)
        if (token) {
            const verifiedUser = await auth_controller.checkJWT(token);
            console.log(verifiedUser.user.data);
            response.set("authorization", `Bearer ${verifiedUser.token}`)
            response.status(200).json(verifiedUser.user.data)
        }
        
    } catch (error) {
        console.log(error);
        // throw error
        response.status(404).json(error)
    }
})

router.post(AuthURLS.checkRegistration, async (request: Request, response: Response) => {
    try {
        const data = request.body;
        response.status(202).json(await auth_controller.checkRegistration(data))
    } catch (error) {
        console.log(error);
    }
})

router.post(AuthURLS.checkLoginApi, async (request: Request, response: Response) => {
    try {
        const data = request.body;
        response.status(202).json(await auth_controller.checkLogin(data))
    } catch (error) {
        console.log(error);
    }
})

export default router;
