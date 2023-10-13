import express from "express";
const router = express.Router();
import { getPlayerProfile } from "../controllers/userController.js";

router.get("/ratings", getPlayerProfile);

export default router;
