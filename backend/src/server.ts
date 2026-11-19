import express, { Request, Response } from "express";
import { baseConfigs } from "./config/config";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Hello from server");
})

app.listen(baseConfigs, () => {
    console.log(`Server Start from port:${baseConfigs.port}`);
})