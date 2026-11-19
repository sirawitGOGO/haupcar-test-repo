import { Response } from "express";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    msg?: string;
}

export const sendSuccessResponse = <T>(res: Response, statusCode: number, data: T, msg?: string): Response => {
    const response: ApiResponse<T> = {
        success: true,
        data: data,
        msg: msg
    }
    return res.status(statusCode).json(response)
}

export const sendErrorResponse = (res: Response, statusCode: number, error: unknown, msg?: string): Response => {
    let errMessage: string;

    if (error instanceof Error) {
        errMessage = error.message;
    } else {
        errMessage = "Internal server error";
    }

    const response: ApiResponse<string> = {
        success: false,
        data: errMessage,
        msg: msg
    }
    return res.status(statusCode).json(response)
}