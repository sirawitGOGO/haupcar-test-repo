import { Router } from "express";
import { carController } from "../controller/car.controller";

const router = Router();

router.get("/", carController.findAll);
router.get("/:id", carController.findById);
router.post("/", carController.create);
router.put("/:id", carController.update);
router.delete("/:id", carController.delete);

export default router;