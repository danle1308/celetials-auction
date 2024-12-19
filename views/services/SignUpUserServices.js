import { abort } from 'process';
import axios from '../axios';

export const handleSignUpApi = async( email, password, role) => {
    console.log('bên api', { email, password, role });
    return axios.post('/api/register', { email, password, role })
        .then(response => response.data) 
        .catch(error => {
            console.error('Sign Up API error:', error.response || error.message);
            throw error;
        });
};
 
export const verifiedByCode = async (email, code) => {
    try {
        const response = await axios.post(`/api/verify-code`, {email, code} );
        return response.data
    } catch (error) {
        console.error('xác minh bị lỗi ở bên hàm gọi api: ', error);
        return null;
    }
}

export const getUserByLoginId = async (loginId) => {
    try {
        const response = await axios.get(`/api/getLoginbyId/${loginId}`);
        return response.data
    } catch (error) {
        console.error('lỗi bên hàm getUserByLoginId: ', error);
        return null;
    }
}

