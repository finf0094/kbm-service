import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from './baseQuery'
import { IAuthResponse } from '@/entities/response'
export const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
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
                const response = await axios.get<IAuthResponse>(`${baseUrl}/refresh?token=${Cookies.get('refresh_token')}`);
                localStorage.setItem('token', response.data.access_token);
                // Установка нового токена в заголовки и повторный запрос
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Не удалось обновить токен. Ошибка:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);