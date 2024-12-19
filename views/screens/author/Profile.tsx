'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Form, Input, message, Modal, Radio, Row, type MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  BarChartOutlined,
  MailFilled,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "@/views/style/ProfileAuthor.css";
import { getInforById } from '../../services/user/ProfileServices.js';
import moment from "moment";
import { MetaMaskInpageProvider } from "@metamask/providers";
import NavbarSetting from "@/views/components/NavbarSetting";
import { connectWallet } from '@/views/utils/connectWallet';
import { useProfile } from '@/views/hook/useProfile';
import { handleAddProfile } from '@/views/utils/author/compProfile/addProfile.js';
import { handleEditProfile } from '@/views/utils/author/compProfile/editProfile.js';
import { useUserInfoContext } from '@/views/store/context/UserInfoContext';

const { Content, Sider } = Layout;

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
): MenuItem {
  return {
    key,
    icon,
    label: <a href={href}>{label}</a>,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard', <BarChartOutlined />, '/author/settings/DashboardAuthor'),
  getItem('Product', 'product', <ProductOutlined />, '/author/settings/ProductAuthor'),
  getItem('Profile', 'profile', <UserOutlined />, '/author/settings/ProfileAuthor'),
];


export default function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [timer, setTimer] = useState(600);
  const [profile, updateProfile] = useProfile();
  const [buttonState, setButtonState] = useState(1);
  const [isEditing, setIsEditing] = useState(0);
  const [isAdding, setIsAdding] = useState(0);

  const { setUserInfo } = useUserInfoContext();
  const email = localStorage.getItem('email');

  const handleInputChange = () => {
    const values = form.getFieldsValue();
    return Object.values(values).every(value => value !== undefined && value !== '');
  };

  const handleSave = async () => {
    if (buttonState === 1) {
      if (!handleInputChange()) {
        message.warning("Please fill all required fields.");
        return;
      };
      await handleAddProfile(form, updateProfile, profile, setUserInfo);
      setButtonState(2);
      setIsEditing(0);
      setIsAdding(0);
    } else if (buttonState === 2) {
      await handleEditProfile(form, updateProfile, profile, setUserInfo);
      setIsEditing(0);
      setIsAdding(0);
    }
  };

  const handleConnectWallet = async () => {
    const walletAddress = await connectWallet();
    form.setFieldsValue({ walletAddress });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const authorId = localStorage.getItem('authorId');
      if (authorId) {
        try {
          const response = await getInforById(authorId);
          const data = response.data;
          switch (response.errorCode) {
            case 1:
              setButtonState(1); // Hiển thị nút Add
              setIsAdding(0);
              message.warning('You have not added personal information, please add information to be able to bid!');
              return;
            case 0:
              if (data) {
                setButtonState(2); // Hiển thị nút Edit
                setIsEditing(0);
                localStorage.setItem('inforId', response.data.id);
                updateProfile({
                  fullname: data.fullname,
                  dateofbirth: data.dateOfBirth,
                  gender: data.gender == true ? 'Male' : 'Female',
                  country: data.country,
                  walletAddress: data.walletAddress,
                  createAt: data.createdAt,
                });
              } else {
                console.log('No profile data found for the given loginId');
              }
              return;
            default:
              console.error('Unexpected error code:', response.errorCode);
              message.error('Đã xảy ra lỗi không xác định.');
              return;
          };
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      }
    };
    fetchProfileData();
  }, []);

  // đếm ngược thời gian k tương tác với trang web để đăng nhập lại
  useEffect(() => {
    let countdown: string | number | NodeJS.Timeout | undefined;
    if (isActive) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            Modal.info({
              title: 'You have been logged out',
              content: (
                <p>You have been inactive for 2 minutes. Please log in again</p>
              ),
              okText: 'Ok',
              onOk: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userEmail');
                window.location.href = '/user/signin';
              },
              closable: false,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(countdown);
    };
  }, [isActive]);
  const handleUserActivity = () => {
    setTimer(600);
    setIsActive(true);
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['profile']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <NavbarSetting />
        <Content className='contInfor' style={{ margin: '0 16px' }}>
          <div className='divTitle' style={{
            padding: 5,
            maxHeight: 60,
            background: colorBgContainer,
          }}><h3 className='titFromDiv'>Profile</h3></div>
          <div className='divInfor' style={{ padding: 15, minHeight: 485 }}>
            <Row className='row1'>
              <Col className='colAvt' span={12}>
                <Row className='rowName'>
                  <Col span={3.5}>
                    <Avatar shape="circle" style={{ color: 'grey', background: '#e7e7e7' }} size={75} icon={<UserOutlined />} />
                  </Col>
                  <Col className='colName' span={20.5}>
                    <div className='divName'>
                      <p>
                        <span className='textName'>{profile.fullname}</span> <br />
                        <span className='textEmail'>{email}</span>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className='colEdit' span={12}>
                <div className='main-but'>
                  {buttonState === 1 && (
                    <Button
                      className="buttonEdit"
                      type="text"
                      disabled={isEditing === 1 && isAdding === 1}
                      onClick={() => {
                        setIsAdding(1);
                        setIsEditing(1);
                      }}
                    >
                      Add Infor
                    </Button>
                  )}
                  {buttonState === 2 && (
                    <Button
                      className="buttonEdit"
                      type="text"
                      disabled={isEditing === 1 && isAdding === 1}
                      onClick={() => {
                        setIsEditing(1);
                        setIsAdding(1)
                      }}
                    >
                      Edit Infor
                    </Button>
                  )}
                </div>
                <div className='support-but'>
                  {isEditing === 1 && isAdding === 1 ? (
                    <Button
                      className="buttonEdit"
                      type="text"
                      onClick={() => handleSave()}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      disabled={true}
                      className="buttonEdit"
                      type="text"
                      onClick={() => setIsEditing(1)}
                    >
                      Save
                    </Button>
                  )
                  }
                </div>
              </Col>
            </Row>
            <Row className='row2'>
              <Col className='colInput1' span={12}>
                <div className='divInput1'>
                  <Form form={form} layout="vertical">
                    <Form.Item name="fullName" label="Full Name:" >
                      <Input disabled={isEditing === 0 && isAdding === 0} placeholder={profile.fullname || "No information yet"} />
                    </Form.Item>
                    {isEditing === 0 && isAdding === 0 ? (
                      <Form.Item name="gender" label="Gender:">
                        <Input disabled={isEditing === 0 && isAdding === 0} placeholder={profile.gender || "No information yet"} />
                      </Form.Item>
                    ) : (
                      <Form.Item name="gender" label="Gender:" initialValue={profile.gender === 'Male' ? true : false}>
                        <Radio.Group>
                          <Radio value={'Male'}>Male</Radio>
                          <Radio value={'Female'}>Female</Radio>
                        </Radio.Group>
                      </Form.Item>
                    )}
                    <Form.Item name="walletAddress" label="Wallet Address:" >
                      <Input disabled={isEditing === 0 && isAdding === 0 || isEditing === 1 && isAdding === 1} placeholder={profile.walletAddress || "No information yet"} />
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col className='colInput2' span={12}>
                <div className='divInput2'>
                  <Form form={form} layout="vertical">
                    <Form.Item name="dateOfBirth"
                      label="Date of Birth:"
                      initialValue={profile.dateofbirth ? moment(profile.dateofbirth) : null}
                    >
                      {isEditing === 0 && isAdding === 0 ? (
                        <Input disabled={true} placeholder={
                          profile.dateofbirth
                            ? moment(profile.dateofbirth).format("DD-MM-YYYY")
                            : "No information yet"
                        } />
                      ) : (
                        <DatePicker format="YYYY-MM-DD" />
                      )}
                    </Form.Item>
                    <Form.Item name="country" label="Country:" >
                      <Input disabled={isEditing === 0 && isAdding === 0} placeholder={profile.country || "No information yet"} />
                    </Form.Item>
                  </Form>
                  <Button className='connectWalletBut' disabled={isEditing === 0 && isAdding === 0} type="text" onClick={handleConnectWallet}>Connect Wallet</Button>
                </div>
              </Col>
            </Row>
            <Row className='row3'>
              <Col className='col13' span={12}>
                <Row className='row31'>
                  <div>
                    <span className='textEmailAddress'>My email Address:</span>
                  </div>
                </Row>
                <Row className='row32'>
                  <Col className='colIconEmail' span={3.5}>
                    <Avatar shape='circle' style={{ color: '#22C55E', background: '#e7e7e7' }} size={35} icon={<MailFilled />}></Avatar>
                  </Col>
                  <Col className='colEmail' span={20.5}>
                    <span className='textMail'>{email}</span> <br />
                    <span className='textMonth'>Created At: {moment(profile.createAt).format("DD-MM-YYYY")}</span>
                  </Col>
                </Row>
              </Col>
              <Col className='col2' span={12}>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};