import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;   
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Prediction {
  id: string;
  imageUrl: string;
  prediction: 'Normal' | 'Pneumonia';
  confidence: number;
  createdAt: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const predictionService = {
  predict: async (image: File): Promise<Prediction> => {
    const formData = new FormData();
    formData.append('file', image);
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
  id: response.data._id,
  imageUrl: response.data.imageUrl ?? '',
  prediction: response.data.prediction,
  confidence: response.data.confidence,
  createdAt: response.data.createdAt || response.data.created_at
};

  },

  getHistory: async (): Promise<Prediction[]> => {
  const response = await api.get('/predict/history');

  return response.data.map((item: any) => ({
    id: item._id,
    imageUrl: item.imageUrl ?? '',
    prediction: item.prediction,
    confidence: item.confidence,
    createdAt: item.createdAt || item.created_at
  }));
},

};

export default api;
