import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    prediction: {
      type: String,
      enum: ["Normal", "Pneumonia"],
      required: true
    },
    confidence: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
