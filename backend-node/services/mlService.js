import axios from "axios";
import FormData from "form-data";

export async function predictPneumonia(imageBuffer) {
  const formData = new FormData();
  formData.append("file", imageBuffer, {
    filename: "xray.jpg",
    contentType: "image/jpeg",
  });

  const response = await axios.post(
    `${process.env.ML_SERVICE_URL}/predict`,
    formData,
    { headers: formData.getHeaders(), timeout: 20000 }
  );

  return response.data;
}
