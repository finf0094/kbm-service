import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '@/entities/user/model/IUser'
import { login, refreshTokens } from '../services/authService'

const initializeAuthStateFromCookies = () => {
    const isAuthenticated: boolean = Cookies.get('isAuthenticated') === 'true'
    const accessToken: string = Cookies.get('access_token') || ''
    const user: IUser = JSON.parse(Cookies.get('user') || '{}')

    return { isAuthenticated, accessToken, user }
}

const initialState = initializeAuthStateFromCookies()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.accessToken = ''
            state.user = {} as IUser

            Cookies.remove('isAuthenticated')
            Cookies.remove('access_token')
            Cookies.remove('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action)

                state.isAuthenticated = true
                state.accessToken = action.payload.access_token
                state.user = action.payload.user

                Cookies.set('isAuthenticated', 'true', { expires: 1 })
                Cookies.set('access_token', action.payload.access_token) // Исправлено на прямое сохранение строки
                Cookies.set('user', JSON.stringify(action.payload.user))
            })
            .addCase(refreshTokens.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.accessToken = action.payload.access_token
                state.user = action.payload.user

                Cookies.set('isAuthenticated', 'true', { expires: 1 })
                Cookies.set('access_token', action.payload.access_token)
                Cookies.set('user', JSON.stringify(action.payload.user))
            })
    },
})

export default authSlice.reducer
export const { logout } = authSlice.actions;