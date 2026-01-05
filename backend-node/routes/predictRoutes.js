import express from "express";
import multer from "multer";
import { predict } from "../controllers/predictController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   POST /api/predict
 * @desc    Predict pneumonia from uploaded chest X-ray
 * @access  Protected (requires JWT)
 */
router.post("/", authMiddleware, upload.single("file"), predict);

export default router;
