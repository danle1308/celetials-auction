import { ACTION_SET_EMAIL_ROLE, ACTION_CLEAR_EMAIL_ROLE } from '@/views/store/context/authReducer';

export const actionSetEmailRole = (dispatch, email, role) => {
    dispatch({
        type: ACTION_SET_EMAIL_ROLE,
        payload: { email, role }
    });
};

export const actionClearEmailRole = (dispatch) => {
    dispatch({ 
        type: ACTION_CLEAR_EMAIL_ROLE
    })
};