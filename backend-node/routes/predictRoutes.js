import express from "express";
import { predict } from "../controllers/predictController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * @route   POST /api/predict
 * @desc    Predict pneumonia from uploaded chest X-ray
 * @access  Protected (requires JWT)
 */
router.post("/", authMiddleware, upload.single("file"), predict);

export default router;
