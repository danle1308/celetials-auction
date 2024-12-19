'use client'

import { Button, Checkbox, Col, Form, Input, Row, Modal, message } from "antd";
import React, { useState } from "react";
import "@/views/style/SignUpAuthor.css";
import handleSignUpAuthor from '../../services/SignUpAuthorServices';

const SignUpAuthor = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false); 

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const { nickname, email, password } = values;

            if (!isChecked) {
                message.error('Please read and accept the terms before signing up.');
                return;
            }

            const response = await handleSignUpAuthor(nickname, email, password);
            console.log(response);
            message.success('Sign up successful!');
            setIsModalVisible(true); 

        } catch (error) {
            console.error('Sign up failed:', error);
            message.error('Sign up failed!');
        }
    };

    const handleOk = () => {
        window.location.href = '/author/signin';
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onCheckboxChange = (e) => {
        setIsChecked(e.target.checked); 
    };

    return (
        <div className="custom-row">
            <Row gutter={[0, 0]}>
                <Col span={7} />
                <Col span={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='imageLogo' src='/CeLestial-wbg.png' alt='Logo'/>
                    <h2>Welcome author</h2>
                    <p>Showcase Your Creations to the World</p>
                    <div className='divInput'>
                        <Form form={form} layout="vertical">
                            <Form.Item 
                                name="nickname" 
                                label="Nickname*" 
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input className="inputtable"/>
                            </Form.Item>
                            <Form.Item 
                                name="email" 
                                label="Email*" 
                                className="formItem" 
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input className="inputtable"/>
                            </Form.Item>
                            <Form.Item 
                                name="password" 
                                label="Password*" 
                                className="formItem" 
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input className="inputtable" type="password" />
                            </Form.Item>
                            <div className="options-row">
                                <label className="custom-checkbox">
                                    <Checkbox onChange={onCheckboxChange} className="hidden-checkbox"/> 
                                    <span className="checkmark"></span>
                                    I commit to take responsibility for customer information security policy, dispute resolution mechanism, and operating regulations on the Website
                                </label>
                            </div>
                            <Button className='buttonConnect' onClick={handleSubmit}>Sign Up</Button>
                            <p style={{ marginTop: '20px' ,fontSize:'14px'}}>
                                Already have an account? <a href="/author/signin" style={{ color: '#22C55E', textDecoration: 'none' }}>Sign In Author</a>
                            </p>
                        </Form>
                    </div>
                </Col>
                <Col span={7} />
            </Row>

            <Modal
                title="Confirmation"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                    style: {
                        backgroundColor: '#22C55E',
                        color: 'white',
                        border: 'none',
                        transition: 'background-color 0.3s ease',
                    },
                    className: 'custom-yes-button', 
                }}
                cancelButtonProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                        transition: 'background-color 0.3s ease',
                    },
                    className: 'custom-no-button', 
                }}
            >
                <p>Each product will cost 5-7%. So please read carefully and click Yes.</p>
            </Modal>
        </div>
    );
}

export default SignUpAuthor;
