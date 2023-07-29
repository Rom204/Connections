import express, { NextFunction, Request, Response } from 'express';
import { AuthURLS } from "../utils/urls";
import auth_controller from '../controllers/auth_controller';
import { jwtMiddleware } from '../middlewares/authentication';

// Authentication related router
const router = express.Router();

// Attempt to create a new user 
router.post(AuthURLS.registerApi, async (request: Request, response: Response) => {
    try {
        const potentialUserData = request.body;
        response.status(201).json(await auth_controller.register(potentialUserData))
    } catch (error) {
        console.log(error);
        response.status(409).json(error);
    }
});

router.post(AuthURLS.loginApi, async (request: Request, response: Response) => {
    try {
        const data = request.body;
        response.status(202).json(await auth_controller.checkLogin(data))
    } catch (error) {
        console.log(error);
    }
});
// will check the validation of the token from the client
router.get(AuthURLS.checkJwtApi, jwtMiddleware, async (request: Request, response: Response) => {
    console.log("THIS FUNCTION FINALLY RAN AFTER MIDDLEWARE")

    const validToken = request.headers.authorization;
    const verifiedUser = request.body.data;
    console.log(verifiedUser);
    response.set("authorization", `${validToken}`);
    response.status(200).json(verifiedUser);
});

export default router;
