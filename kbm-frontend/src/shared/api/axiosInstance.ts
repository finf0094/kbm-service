import axios from 'axios';
import { baseUrl } from './baseQuery'
export const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Попытка получить новый токен
                const response = await axios.get(`${baseUrl}/refresh-tokens`);
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                // Установка нового токена в заголовки и повторный запрос
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Не удалось обновить токен. Ошибка:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);