import { Request, Response } from "express";
import { carService } from "../service/car.service";
import { sendErrorResponse, sendSuccessResponse } from "../util/response";
import { CarCreateAndUpdate } from "../dto/car.dto";

export const carController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            const result = await carService.findAll(page, limit);
            sendSuccessResponse(res, 200, result);
        } catch (error) {
            sendErrorResponse(res, 500, error)
        }
    },
    findById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await carService.findById(id);
            if (result instanceof Error) sendErrorResponse(res, 404, result.message);
            sendSuccessResponse(res, 200, result);
        } catch (error) {
            sendErrorResponse(res, 500, error)
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const payload = req.body as CarCreateAndUpdate;
            const result = await carService.create(payload);
            if (result instanceof Error) sendErrorResponse(res, 400, result.message);
            sendSuccessResponse(res, 201, result);
        } catch (error) {
            sendErrorResponse(res, 500, error)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const payload = req.body as CarCreateAndUpdate;
            const result = await carService.update(id, payload);
            if (result instanceof Error) sendErrorResponse(res, 400, result.message);
            sendSuccessResponse(res, 201, `${result} updated`);
        } catch (error) {
            sendErrorResponse(res, 500, error)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const result = await carService.delete(id);
            if (result instanceof Error) sendErrorResponse(res, 404, result.message);
            sendSuccessResponse(res, 201, `${result} deleted`);
        } catch (error) {
            sendErrorResponse(res, 500, error)
        }
    }
}