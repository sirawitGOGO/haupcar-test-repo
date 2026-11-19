import { database } from "../database/database";
import { CarCreate, CarResponse, CarUpdate, PaginationResponse } from "../dto/car.dto";
import { Car } from "../interface/interface";

export const carRepository = {
    findAndCountAll: async (
        page: number,
        limit: number
    ): Promise<PaginationResponse> => {
        const { count, rows } = await database.carModel.findAndCountAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [
                ["createdAt", "DESC"]
            ]
        });
        return {
            totalItem: count,
            totalPage: rows.length === 0 ? 0 : Math.ceil(count / limit),
            currentPage: page,
            data: rows.length === 0 ? [] : rows.map((car) => ({
                carId: car.dataValues.carId,
                registrationNumber: car.dataValues.registrationNumber,
                brand: car.dataValues.brand,
                model: car.dataValues.model,
                notes: car.dataValues.notes
            }))
        }
    },
    findById: async (id: number): Promise<CarResponse | null> => {
        const car = await database.carModel.findByPk(id);
        if (car === null) {
            return null
        }
        return car ? {
            carId: car.dataValues.carId,
            registrationNumber: car.dataValues.registrationNumber,
            brand: car.dataValues.brand,
            model: car.dataValues.model,
            notes: car.dataValues.notes
        } : null
    },
    create: async (data: CarCreate): Promise<CarResponse> => {
        const newCar = await database.carModel.create({
            ...data
        } as Car);
        return {
            carId: newCar.dataValues.carId,
            registrationNumber: newCar.dataValues.registrationNumber,
            brand: newCar.dataValues.brand,
            model: newCar.dataValues.model,
            notes: newCar.dataValues.notes
        }
    },
    update: async (data: CarUpdate): Promise<number> => {
        const [updateCar] = await database.carModel.update({
            brand: data.brand,
            model: data.model,
            notes: data.notes
        }, {
            where: {
                carId: data.carId
            }
        });
        return updateCar
    },
    delete: async (id: number): Promise<number> => {
        const deleteCar = await database.carModel.destroy({
            where: {
                carId: id
            }
        });
        return deleteCar
    }
}