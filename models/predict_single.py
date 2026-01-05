import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Load trained model
model = tf.keras.models.load_model("models/pneumonia_cnn.keras")

# Image settings
IMG_SIZE = 224

# Image path (change filename if needed)
IMAGE_PATH = r"E:\chest-xray-ml\data\chest_xray\test\PNEUMONIA\BACTERIA-821920-0001.jpeg"

# Load and preprocess image
img = image.load_img(IMAGE_PATH, target_size=(IMG_SIZE, IMG_SIZE))
img_array = image.img_to_array(img)
img_array = img_array / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Predict
prediction = model.predict(img_array)[0][0]

# Output
if prediction > 0.5:
    print(f"🩺 Prediction: PNEUMONIA ({prediction*100:.2f}% confidence)")
else:
    print(f"🩺 Prediction: NORMAL ({(1-prediction)*100:.2f}% confidence)")



