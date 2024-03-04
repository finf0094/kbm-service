import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '@/entities/user'
import { login, refreshToken } from '../services/authService'

const initializeAuthStateFromCookies = () => {
    const isAuthenticated: boolean = Cookies.get('isAuthenticated') === 'true'
    const accessToken: string = Cookies.get('access_token') || ''
    const refreshToken: string = Cookies.get('refresh_token') || ''
    const user: IUser = JSON.parse(Cookies.get('user') || '{}')

    return { isAuthenticated, accessToken, refreshToken, user }
}

const initialState = initializeAuthStateFromCookies()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.accessToken = ''
            state.refreshToken = ''
            state.user = {} as IUser

            Cookies.remove('isAuthenticated')
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            Cookies.remove('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action)

                state.isAuthenticated = action.payload.access_token && action.payload.user ? true : false
                state.accessToken = action.payload.access_token
                state.refreshToken = action.payload.refresh_token
                state.user = action.payload.user

                Cookies.set('isAuthenticated', 'true')
                Cookies.set('access_token', action.payload.access_token) // Исправлено на прямое сохранение строки
                Cookies.set('refresh_token', action.payload.refresh_token) // Исправлено на прямое сохранение строки
                Cookies.set('user', JSON.stringify(action.payload.user))

                localStorage.setItem('token', action.payload.access_token)
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.accessToken = action.payload.access_token
                state.user = action.payload.user

                Cookies.set('isAuthenticated', 'true')
                Cookies.set('access_token', action.payload.access_token)
                Cookies.set('user', JSON.stringify(action.payload.user))

                localStorage.setItem('token', action.payload.access_token)
            })
    },
})

export default authSlice.reducer
export const { logout } = authSlice.actions