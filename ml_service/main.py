import os
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile, Depends
from PIL import Image
import io
from utils.preprocess import preprocess_image
from utils.jwt_auth import verify_token  # 🔐 JWT verification
#https://drive.google.com/file/d/1ZswLsHHJDWDihWBAQ9pFnS8XGL8hJL2B/view?usp=sharing
# Optional: install gdown if not already installed
try:
    import gdown
except ImportError:
    import subprocess
    subprocess.check_call(["pip", "install", "gdown"])
    import gdown

app = FastAPI(title="Pneumonia Detection API")

# Model setup
MODEL_PATH = "ml_service/model/pneumonia_cnn.keras"
MODEL_DIR = os.path.dirname(MODEL_PATH)
GOOGLE_DRIVE_FILE_ID = "1ZswLsHHJDWDihWBAQ9pFnS8XGL8hJL2B"  # your file ID

if not os.path.exists(MODEL_PATH):
    os.makedirs(MODEL_DIR, exist_ok=True)
    print("Downloading model from Google Drive...")
    url = f"https://drive.google.com/uc?id={GOOGLE_DRIVE_FILE_ID}"
    gdown.download(url, MODEL_PATH, quiet=False)
    print("Model downloaded!")

# Load model
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded successfully!")

@app.get("/")
def home():
    return {"message": "Pneumonia Detection API is running"}

# 🔐 Protected prediction endpoint
@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    user=Depends(verify_token)  # JWT required
):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    processed = preprocess_image(image)
    prediction = model.predict(processed)[0][0]

    result = "Pneumonia" if prediction > 0.5 else "Normal"
    confidence = float(prediction if prediction > 0.5 else 1 - prediction)

    return {
        "user_id": user["id"],  # 👈 comes from JWT
        "prediction": result,
        "confidence": round(confidence * 100, 2)
    }
