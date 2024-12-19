import axios from "../axios";

const handleSignInAuthor = async(email, password) => {
    try {
        const response = await axios.post('/api/loginauthor', {email, password});
        return response.data;
    } catch (error) {
        console.error('Sign in failed', error);
        return null;
    }
}

export default handleSignInAuthor;