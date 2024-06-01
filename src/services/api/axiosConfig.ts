import axios, { AxiosInstance } from 'axios';

export const httpsClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENV_HOST_URL,
  timeout: 50000
});

httpsClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    return Promise.reject(error);
  }
);
