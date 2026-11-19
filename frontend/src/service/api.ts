import axios from "axios";
import type { ApiResponse, CarCreate, CarResponse, CarUpdate, PaginationResponse } from "../interface/interface";
import { ENDPOINTS } from "./endpoint";

export const baseApi = {
    findAll: async (page: number, limit: number) => {
        const response = await axios.get<ApiResponse<PaginationResponse>>(
            ENDPOINTS.findAll(page, limit)
        );
        return response.data.data
    },
    findById: async (id: number) => {
        const response = await axios.get<ApiResponse<CarResponse | string>>(
            ENDPOINTS.findById(id)
        );
        return response.data.data
    },
    create: async (payload: CarCreate) => {
        const response = await axios.post<ApiResponse<CarResponse | string>>(
            ENDPOINTS.create,
            payload
        );
        return response.data.data
    },
    update: async (id: number, payload: CarUpdate) => {
        const response = await axios.put<ApiResponse<string>>(
            ENDPOINTS.update(id),
            payload
        );
        return response.data.data
    },
    delete: async (id: number) => {
        const response = await axios.delete<ApiResponse<string>>(
            ENDPOINTS.delete(id)
        );
        return response.data.data
    }
}