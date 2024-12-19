
export const ACTION_SET_EMAIL_ROLE = 'ACTION_SET_EMAIL_ROLE';
export const ACTION_CLEAR_EMAIL_ROLE = 'ACTION_CLEAR_EMAIL_ROLE';

export const authReducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_EMAIL_ROLE:
            const updatedState = {
                ...state,
                email: action.payload.email,
                role: action.payload.role,
            };
            return updatedState;
        case ACTION_CLEAR_EMAIL_ROLE:
            return {
                ...state,
                email: null,
                role: null,
            };
        default:
            return state; 
    }
};

export const reducerInfor = (state, action) => {
    switch (action.type) {
        case 'ACTION_SET_USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'ACTION_SET_BALANCE':
            return { ...state, balance: action.payload };
        case 'ACTION_CLEAR_USER_DATA':
            return { userInfo: null, balance: 0 };
        default:
            return state;
    }
};