import { database } from "../database/database";
import { CarCreate, CarResponse, CarUpdate, PaginationResponse } from "../dto/car.dto";
import { carRepository } from "../repository/car.repository";

export const carService = {
    findAll: async (
        page: number,
        limit: number
    ): Promise<PaginationResponse> => {
        const result = await carRepository.findAndCountAll(page, limit);
        return result
    },
    findById: async (id: number): Promise<CarResponse | Error> => {
        const result = await carRepository.findById(id);
        if (!result) {
            throw new Error('Car not found')
        }
        return result
    },
    create: async (data: CarCreate): Promise<CarResponse | Error> => {
        const existCar = await database.carModel.findOne({
            where: {
                registrationNumber: data.registrationNumber
            }
        });
        if (existCar) {
            throw new Error('This car is already exist')
        }
        const result = await carRepository.create(data);
        return result
    },
    update: async (id:number, data: CarUpdate): Promise<number | Error> => {
        const existCar = await carRepository.findById(id);
        if (!existCar) {
            throw new Error('Car not found')
        }

        const result = await carRepository.update(id, data);
        return result
    },
    delete: async (id: number): Promise<number | Error> => {
        const existCar = await carRepository.findById(id);
        if (!existCar) {
            throw new Error('Car not found')
        }
        const result = await carRepository.delete(id);
        return result
    }
}