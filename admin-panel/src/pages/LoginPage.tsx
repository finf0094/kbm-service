import React, {useEffect, useState} from 'react';
import './UI/LoginPage.css';
import {useLoginUserMutation} from "../redux/api/authApi.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {loginSuccess} from "../redux/store/authSlice.ts";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [itin, setItin] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { data, isSuccess, isLoading, error }] = useLoginUserMutation();

    const handleLogin = async (e: React.FormEvent) => {
        if (itin && password) {
            e.preventDefault();
            await loginUser({itin, password})
        } else {
            alert("Please fill all input")
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(loginSuccess(data));
            navigate("/");
        }
    }, [isSuccess, data, dispatch, navigate]);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>KBM administration</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Personal number:</label>
                        <input
                            type="text"
                            name="username"
                            value={itin}
                            onChange={(e) => setItin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        'Log in'
                    </button>
                </form>
                {error && 'data' in error && error.data && <div className="center-content">{error.data.message}</div>}
            </div>
        </div>
    );
};

export default LoginPage;