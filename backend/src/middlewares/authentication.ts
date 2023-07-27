import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const jwtMiddleware = (request: Request,response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: "No token provided"})

    } 
    try { 
        const decoded = jwt.verify(token,"key");
        // request. = decoded
    } catch (error) {
        return response.status(403).json({ message : error })
    }
}