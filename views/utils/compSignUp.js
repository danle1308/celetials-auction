
import { message } from "antd";
import { handleSignUpApi, getUserByLoginId, verifiedByCode } from '@/views/services/SignUpUserServices';

export const handleSubmitSignup = async (form, setIsModalOpen) => {
    try {
        const values = await form.validateFields();
        const { email, password, role } = values;
        const response = await handleSignUpApi(email, password, role);
        localStorage.setItem('loginId', response.user.id);
        if (response.user.verified == false) {
            message.success('Registration successful! Please enter the code to verify your account.');
            setIsModalOpen(true);
        } else {
            message.success('Registered and verified successfully');
        }
    } catch (error) {
        console.error('Sign up failed:', error);
        message.error('Sign up failed!');
    }
}

export const handleVerificationSubmit = async (form, formModal, attemptsLeft, setAttemptsLeft, setIsModalOpen) => {
    const loginId = localStorage.getItem('loginId');
    try {
        const { code } = await formModal.validateFields(['code']);
        const email = form.getFieldValue('email');
        const response = await verifiedByCode(email, code);
        const getVerify = await getUserByLoginId(loginId);

        if (getVerify.verified == false) {
            if (attemptsLeft > 1) {
                setAttemptsLeft(attemptsLeft - 1);
                message.warning(`Incorrect authentication code. ${attemptsLeft - 1} attempts remaining.`);
            } else {
                message.error('Verification failed, registration failed');
                setIsModalOpen(false);
            }
        } else {
            message.success('Verification successful!');
            setIsModalOpen(false);
            setTimeout(() => {
                window.location.href = '/user/signin';
            }, 1500);
        }
    } catch (error) {
        console.error('Verification failed:', error);
    }
}