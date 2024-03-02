import { IAuthResponse } from '@/entities/response/model/AuthResponse'
import { baseUrl } from '@/shared/api/baseQuery'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export const login = createAsyncThunk('auth/login', async (loginData: { itin: string; password: string }, { rejectWithValue }) => {
	try {
		const response = await axios.post<IAuthResponse>(`${baseUrl}/auth/login`, loginData)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError

		return rejectWithValue(axiosError.response?.data)
	}
}
)

export const register = createAsyncThunk('auth/register', async (registerData: { itin: string; password: string; email: string }, { rejectWithValue }) => {
	try {
		const response = await axios.post<IAuthResponse>(`${baseUrl}/auth/register`, registerData)
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError

		return rejectWithValue(axiosError.response?.data)
	}
}
)

export const refreshTokens = createAsyncThunk('auth/refresh-tokens', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<IAuthResponse>(`${baseUrl}/auth/refresh-tokens`, { withCredentials: true })
		return response.data
	} catch (error) {
		const axiosError = error as AxiosError
		return rejectWithValue(axiosError.response?.data)
	}
}
)