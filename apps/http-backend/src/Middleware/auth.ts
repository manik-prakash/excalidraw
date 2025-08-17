import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_WORD } from "@repo/backend-common/config";

const secret = JWT_SECRET_WORD;
if (!secret) {
    throw new Error("JWT_SECRET must be defined in environment variables");
}

interface AuthRequest extends Request {
    userID?: string;
}

interface JwtPayload {
    userID: string;
}

export const verify = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.userID = decoded.userID;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
