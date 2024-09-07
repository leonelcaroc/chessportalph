import express from "express";
const router = express.Router();
import { getSearchPlayer } from "../controllers/searchController.js";

router.get("/ratings", getSearchPlayer);

export default router;
