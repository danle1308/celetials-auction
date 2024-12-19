import axios from '../axios';

const handleSignUpAuthor = async (nickname, email, password) => {
    console.log({ nickname, email, password });
    return axios.post('/api/signupauthor', { nickname, email, password })
        .then(response => response.data) 
        .catch(error => {
            console.error('Sign Up API error:', error.response || error.message);
            throw error;
        });
};

export default handleSignUpAuthor;
