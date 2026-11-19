import dotenv from "dotenv"

dotenv.config();

export const baseConfigs = {
    port: Number(process.env.PORT),
    dbUser: String(process.env.DB_USER),
    dbPassword: String(process.env.DB_PASSWORD),
    dbName: String(process.env.DB_NAME),
    dbHost: String(process.env.DB_HOST),
    dbPort: Number(process.env.DB_PORT),
    frontendUrl: String(process.env.FRONTEND_URL)
}