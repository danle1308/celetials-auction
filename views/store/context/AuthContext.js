'use client'

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer, reducerInfor } from '@/views/store/context/authReducer';
import { authInitState, initInfo } from '@/views/store/context/authInitState';
import { actionSetEmailRole, actionClearEmailRole } from '@/views/store/context/authActions';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, authInitState);

    // Hàm đăng nhập
    const login = (email, role) => {
        actionSetEmailRole(dispatch, email, role);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
    };

    // Hàm đăng xuất
    const logout = () => {
        actionClearEmailRole(dispatch);
        localStorage.removeItem('email');
        localStorage.removeItem('role');
    };

    useEffect(() => {
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        if (email && role) {
            dispatch({
                type: 'ACTION_SET_EMAIL_ROLE',
                payload: { email, role }
            });
        } else {
            console.log("Không tìm thấy email hoặc role trong localStorage.");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuthContent = () => useContext(AuthContext);
