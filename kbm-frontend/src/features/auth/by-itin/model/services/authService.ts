import { IAuthResponse } from '@/entities/response/model/IAuthResponse'
import { baseUrl } from '@/shared/api/baseQuery'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export const login = createAsyncThunk('auth/login',
	async (loginData: { itin: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await axios.post<IAuthResponse>(`${baseUrl}/auth/login`, loginData)
			return response.data
		} catch (error) {
			const axiosError = error as AxiosError

			return rejectWithValue(axiosError.response?.data)
		}
	}
)

export const register = createAsyncThunk('auth/register',
	async (registerData: { itin: string; firstname: string; lastname: string; password: string; email: string }, { rejectWithValue }) => {
		try {
			const response = await axios.post<IAuthResponse>(`${baseUrl}/auth/register`, registerData)
			return response.data
		} catch (error) {
			const axiosError = error as AxiosError

			return rejectWithValue(axiosError.response?.data)
		}
	}
)

export const refreshToken = createAsyncThunk('auth/refresh',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get<IAuthResponse>(`${baseUrl}/auth/refresh`, { withCredentials: true })
			return response.data
		} catch (error) {
			const axiosError = error as AxiosError
			return rejectWithValue(axiosError.response?.data)
		}
	}
)