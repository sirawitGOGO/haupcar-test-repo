import { Sequelize } from "sequelize";
import { CarModel } from "../model/car.model";
import { baseConfigs } from "../config/config";

const sequelize = new Sequelize(
    baseConfigs.dbName,
    baseConfigs.dbUser,
    baseConfigs.dbPassword, {
        host: baseConfigs.dbHost,
        port: baseConfigs.dbPort,
        dialect: 'postgres'
});

const carModel = CarModel(sequelize);

export const database = {
    sequelize,
    Sequelize,
    carModel
}