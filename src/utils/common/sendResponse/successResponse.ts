import { Response } from "express";
import { ApiResponseStatus } from "../enum";

export const sendSuccess = <T>(message: string, res: Response, data: T, statusCode = 200) =>{
    res.status(statusCode).json({ message ,status: ApiResponseStatus.Success, data });
}