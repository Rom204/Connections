import express, { NextFunction, Request, Response } from 'express';
import { AuthURLS } from "../utils/urls";
import auth_controller from '../controllers/auth_controller';
import { jwtMiddleware } from '../middlewares/authentication';


const router = express.Router();

router.get(AuthURLS.checkJWTApi, jwtMiddleware, async (request: Request, response: Response) => {
    console.log("THIS FUNCTION FINALLY RAN AFTER MIDDLEWARE")

    const validToken = request.headers.authorization;
    const verifiedUser = request.body.data;
    console.log(verifiedUser);
    response.set("authorization", `${validToken}`);
    response.status(200).json(verifiedUser);
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
