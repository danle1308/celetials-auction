
import { message } from 'antd';
import handleSignInApi from '@/views/services/SignInUserServices';

export const handleSubmitSignin = async(form, login) => {
    try {
        const values = await form.validateFields();
        const { email, password  } = values;
        const response = await handleSignInApi(email, password);

        console.log('response: ', response);
        localStorage.setItem('loginId', response.user.id);
        if (response.errorCode === 0){
            message.success('Sign-in successful!');
            await login(response.user.email, response.user.role);
            if (response.user.role === 'user') {
                localStorage.setItem('userId', response.user.id);
                localStorage.setItem('accessToken', response.token);
                message.success('Welcome User!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else if (response.user.role === 'author') {
                localStorage.setItem('authorId', response.user.id);
                localStorage.setItem('accessToken', response.token);
                message.success('Welcome Author!');
                setTimeout(() => {
                    window.location.href = '/author/settings/ProfileAuthor';
                }, 1500);
            }
        } else {
            message.error('Invalid email or password!');
        }
    } catch (error) {
        console.error('Sign in failed:', error);
        message.error('Sign in failed, please try again!');
    }
}