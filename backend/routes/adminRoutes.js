import express from "express";
const router = express.Router();
import { authAdmin, registerAdmin } from "../controllers/adminController.js";
// import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerAdmin);
router.post("/auth", authAdmin);
// router.post("/logout", logoutUser);

export default router;
