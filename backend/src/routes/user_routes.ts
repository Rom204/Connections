import express, { NextFunction, Request, Response } from 'express';
import { UserURLS } from '../utils/urls';
import user_controller from '../controllers/user_controller';
import AuthServices from '../services/auth_services';

// import additional controller , middleware.

const router = express.Router();
const authService = new AuthServices()
router.post(UserURLS.createUserApi, async (request: Request, response: Response) => {
    try {
        const user_data = request.body
        response.status(204).json(await user_controller.createUser(user_data))
    } catch (error) {
        console.log("ROUTER NET", error)
        response.status(409).json(error)
    }
})

router.get("/", async (request: Request, response: Response) => {
    response.status(200).json("user controller is working properly")
})

router.get(UserURLS.getSingleUserApi, async (request: Request, response: Response) => {
    const user_id = request.params.id;
    response.status(202).json(await user_controller.getSingleUserByID(user_id))
})

router.get(UserURLS.getSingleUserFollowersApi, async (request: Request, response: Response) => {
    const user_id = request.params.id;
    console.log(user_id);
    response.status(202).json(await user_controller.getSingleUserFollowers(user_id))
})

router.get(UserURLS.getSingleUserFollowingsApi, async (request: Request, response: Response) => {
    const user_id = request.params.id;
    console.log(user_id);
    response.status(202).json(await user_controller.getSingleUserFollowings(user_id))
})

router.post(UserURLS.getAllUsersApi, async (request: Request, response: Response) => {
    const user_id = request.body.id;
    console.log(user_id)
    response.status(201).json(await user_controller.getAllUsers(user_id))
})

router.post(UserURLS.getFollowedUsersPostsApi, async (request: Request, response: Response) => {
    const user_id = request.body.id;
    console.log(user_id)
    response.status(201).json(await user_controller.getAllFollowedUsers(user_id))
})

router.delete(UserURLS.getSingleUserApi, async (request: Request, response: Response) => {
    const user_id = request.params.id;
    response.status(202).json(await user_controller.deleteUser(user_id))
})

router.get(UserURLS.getUserByUsernameApi, async (request: Request, response: Response) => {
    const username = request.body.username;
    response.status(202).json(await user_controller.getUserByUsername(username))
})

router.post(UserURLS.userLoginApi, async (request: Request, response: Response) => {
    try {
        const user_data = request.body;
        const verifiedUser = await user_controller.verifyingUser(user_data);
        if (!verifiedUser) {
            throw new Error("user not verified")
        }
        if (verifiedUser) {
            const token = await authService.createJWT(verifiedUser);
            response.set("authorization", `Bearer ${token}`)
            response.status(200).json(verifiedUser)
        }
    } catch (error) {
        console.log("ROUTER NET", error)
    }
})

// follow un follow section
router.put(UserURLS.followUserApi, async(request: Request, response: Response) => {
    try {
        const followedUserID = request.body.followedUser
        const followingUserID = request.body.followingUser
        // check for valid input data here
        if (!followedUserID || !followingUserID) {
            throw new Error("did not received params")
        } else {
            response.status(202).json(await user_controller.followUser(followedUserID,followingUserID))
        }
    } catch (error) {
        console.log("ROUTER NET", error)
    }
})

router.put(UserURLS.unFollowUserApi, async(request: Request, response: Response) => {
    console.log("unfollowing")
    try {
        const followedUserID = request.body.data.followedUser
        const followingUserID = request.body.data.followingUser
        console.log("unfollowing,", followedUserID, followingUserID)
        // check for valid input data here
        if (!followedUserID || !followingUserID) {
            throw new Error("did not received params")
        } else {
            response.status(202).json(await user_controller.unFollowUser(followedUserID,followingUserID))
        }
    } catch (error) {
        console.log("ROUTER NET", error)
    }
})
export default router;