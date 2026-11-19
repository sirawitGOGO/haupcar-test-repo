import express, { Request, Response } from "express";
import { baseConfigs } from "./config/config";
import cors from "cors";
import { database } from "./database/database";
import router from "./route/car.route";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: [baseConfigs.frontendUrl!],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server");
});

app.use("/api/car", router);

const startServer = async () => {
    try {
        await database.sequelize.authenticate();
        await database.sequelize.sync({
            force: false
        });
        app.listen(baseConfigs.port, () => {
            console.log(`Server Start from port:${baseConfigs.port}`);
        });
    } catch (error) {
        console.error(`database connecntion fail: ${error}`);
    }
};

startServer();