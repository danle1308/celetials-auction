'use client'

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { authReducer, reducerInfor } from '@/views/store/context/authReducer';
import { authInitState, initInfo } from '@/views/store/context/authInitState';

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducerInfor, initInfo);

    // Hàm cập nhật thông tin người dùng
    const setUserInfo = (userInfo) => {
        dispatch({
            type: 'ACTION_SET_USER_INFO',
            payload: userInfo,
        });
    };

    // Hàm cập nhật số dư
    const setBalance = (balance) => {
        dispatch({
            type: 'ACTION_SET_BALANCE',
            payload: balance,
        });
    };

    // Hàm xóa dữ liệu người dùng
    const clearUserData = () => {
        dispatch({ type: 'ACTION_CLEAR_USER_DATA' });
    };

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        const storedBalance = localStorage.getItem('balance');

        if (storedUserInfo) setUserInfo(storedUserInfo);
        if (storedBalance) setBalance(parseFloat(storedBalance));
    }, []);

    return (
        <UserInfoContext.Provider value={{ state, setUserInfo, setBalance, clearUserData }}>
            {children}
        </UserInfoContext.Provider>
    );
}

export const useUserInfoContext = () => useContext(UserInfoContext);