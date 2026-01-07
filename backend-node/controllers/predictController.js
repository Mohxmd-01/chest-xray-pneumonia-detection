import axios from "axios";
import FormData from "form-data";
import Prediction from "../models/Prediction.js";

/**
 * Controller: Forward image to FastAPI ML service
 * - JWT required (authMiddleware sets req.user & req.token)
 * - Image received via multer (req.file)
 * - Saves prediction history to MongoDB
 */
export const predict = async (req, res) => {
  try {
    console.log("🔥 Node /api/predict route hit");

    // 1️⃣ Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
     // 2️⃣ Validate image (SAFE CHECK)
    const metadata = await sharp(req.file.buffer).metadata();

    // Minimum resolution (X-rays are not tiny images)
    if (metadata.width < 200 || metadata.height < 200) {
      return res.status(400).json({
        message: "Invalid image. Please upload a chest X-ray image.",
      });
    }

    // X-rays are grayscale (1 channel) or near-grayscale
    if (metadata.channels && metadata.channels > 2) {
      return res.status(400).json({
        message: "Invalid image. Please upload a chest X-ray image.",
      });
    }

    // 2️⃣ Prepare form-data for FastAPI
    const form = new FormData();
    form.append("file", req.file.buffer, req.file.originalname);

    // 3️⃣ Call FastAPI ML service
     const mlResponse = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      form,
      {
        headers: form.getHeaders(),
        timeout: 20000,
      }
    );

    const prediction = mlResponse.data?.prediction;
    const confidence = mlResponse.data?.confidence;

    if (!prediction || confidence === undefined) {
      return res.status(500).json({ message: "Invalid ML response" });
    }

    // 4️⃣ Save prediction to MongoDB
    const savedPrediction = await Prediction.create({
      user: req.user.id,
      prediction,
      confidence,
    });

    console.log("✅ Prediction saved:", savedPrediction._id);

    // 5️⃣ Respond to frontend
    res.status(200).json({
      user_id: req.user.id,
      prediction,
      confidence,
      prediction_id: savedPrediction._id,
    });

  } catch (err) {
    console.error("❌ Prediction error:", err.message || err);

    if (err.response?.data) {
      return res
        .status(err.response.status || 500)
        .json(err.response.data);
    }

    res.status(500).json({ error: "Prediction failed" });
  }
};
