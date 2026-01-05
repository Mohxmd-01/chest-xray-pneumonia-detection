from fastapi import FastAPI, File, UploadFile, Depends
from PIL import Image
import tensorflow as tf
import io

from utils.preprocess import preprocess_image
from utils.jwt_auth import verify_token   # 🔐 JWT verification

app = FastAPI(title="Pneumonia Detection API")

# Load trained model
model = tf.keras.models.load_model("model/pneumonia_cnn.keras")

@app.get("/")
def home():
    return {"message": "Pneumonia Detection API is running"}

# 🔐 Protected prediction endpoint
@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    user=Depends(verify_token)   # JWT required
):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    processed = preprocess_image(image)
    prediction = model.predict(processed)[0][0]

    result = "Pneumonia" if prediction > 0.5 else "Normal"
    confidence = float(prediction if prediction > 0.5 else 1 - prediction)

    return {
        "user_id": user["id"],          # 👈 comes from JWT
        "prediction": result,
        "confidence": round(confidence * 100, 2)
    }
