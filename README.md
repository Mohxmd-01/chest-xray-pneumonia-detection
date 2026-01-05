# Pneumonia Detection System

A full-stack AI web application to detect Pneumonia from chest X-ray images using Deep Learning.

## Tech Stack
- Frontend: React + TypeScript
- Backend: Node.js + Express
- ML Service: FastAPI + TensorFlow/Keras
- Database: MongoDB

## Features
- User authentication (JWT)
- Chest X-ray upload
- Pneumonia prediction with confidence score
- Prediction history
- Secure API integration

## Project Structure
backend-node/ → Authentication & API
frontend/ → UI
ml_service/ → ML inference service

## How to Run Locally

### Backend
cd backend-node  
npm install  
npm run dev  

### ML Service
cd ml_service  
pip install -r requirements.txt  
uvicorn main:app --reload  

### Frontend
cd frontend  
npm install  
npm run dev  
