import { NextFunction, Request,Response } from "express";
import  jwt, { decode }  from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "super_secret_token";

interface authRequest extends Request {
    userID : String
}

interface JwtPayload {
  userID: string
}

export function verify (req : authRequest , res : Response , next : NextFunction){

    const token = req.headers['authorization'] ?? "";

    const decoded = jwt.verify(token , secret) as JwtPayload;

    if(decoded){
        req.userID = decoded.userID;
        next();
    } else{
        res.status(404).json({
            message : "No access"
        })
    }

}