import express from "express";
const router = express.Router();
import {
  authAdmin,
  registerAdmin,
  getPlayers,
  getPlayerById,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

router.post("/register", registerAdmin);
router.post("/auth", authAdmin);
router.get("/players", protectAdmin, getPlayers);
router.get(
  "/players/:id",
  // protectAdmin,
  getPlayerById
);
// router.get("/players", protectAdmin, getPlayers);
// router.post("/logout", logoutUser);

export default router;
