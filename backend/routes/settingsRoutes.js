import express from "express";
const router = express.Router();
import { getGlobalSettings } from "../controllers/settingsController.js";

router.get("/settings", getGlobalSettings);

export default router;
