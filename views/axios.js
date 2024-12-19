import axios from 'axios';


const BaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const instance = axios.create({
    baseURL: BaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BACKEND_URL,
      'ngrok-skip-browser-warning': 'true',
    },
});

export const instanceFormData = axios.create({
  baseURL: BaseUrl,
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BACKEND_URL,
    'ngrok-skip-browser-warning': 'true',
  },
});

export default instance;