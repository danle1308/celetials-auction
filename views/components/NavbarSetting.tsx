'use client'

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import "@/views/style/NavbarSetting.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { getInforById, getBalace } from '@/views/services/user/ProfileServices';
import { Dropdown } from 'antd';
import { useUserInfoContext } from '@/views/store/context/UserInfoContext';
import { connect } from '@/views/utils/connectWallet';

export default function NavbarSetting() {
  const formattedDate = moment().format('ddd, DD MMMM YYYY');
  const [nickname, setNickname] = useState('');
  const [balance, setBalance] = useState('0');
  const role = localStorage.getItem('role');

  const { state } = useUserInfoContext();

  const goToHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    setNickname(state.userInfo);
  }, [state]);


  const userMenu = (
    <div className="login-dropdown">
      <button
        onClick={(e) => {
          e.preventDefault();
          localStorage.clear();
          window.location.href = '/user/signin';
        }}
      >
        Logout
      </button>
    </div>
  );

  const getInforOf = async () => {
    if (role == 'user') {
      const userId = localStorage.getItem('userId');
      const responseUser = await getInforById(userId);
      if (responseUser.errorCode == 1) {
        return;
      } else {
        const nameUser = responseUser.data.fullname;
        setNickname(nameUser);
      }
    } else {
      const authorId = localStorage.getItem('authorId');
      const responseAuthor = await getInforById(authorId);
      if (responseAuthor.errorCode == 1) {
        return;
      } else {
        const nameAuthor = responseAuthor.data.fullname;
        setNickname(nameAuthor);
      }
    };
  };

  const getBalance = async () => {
    try {
      const getAddress = await connect();
      if (!getAddress) {
        return;
      }
      const address1 = getAddress.walletAddress;
      if (!address1) {
        return;
      }
      const responseBalanceUser = await getBalace(address1);
      if (!responseBalanceUser) {
        console.error('Failed to fetch balance. Exiting...');
        return;
      }
      const balanceUser = responseBalanceUser.balanceOf;
      setBalance(balanceUser);

    } catch (error) {
      console.error('Error during checkLogin:', error);
    }
  };


  useEffect(() => {
    getInforOf();
    getBalance();
  }, [balance]);

  return (
    <>
      <div>
        <Row className='row'>
          <Col className='col1' span={12}>
            <p className='helloName' style={{ fontWeight: 750, color: 'white' }}>Hello, {nickname}</p>
            <p className='helloName' style={{ color: '#ADA7A7' }}>{formattedDate}</p>
          </Col>
          <Col className='col2' span={12}>
            <div className='row row-infor'>
              <div className='col-4 cart'>
                <a onClick={e => goToHome()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                </a>
              </div>
              <div className='col-4 money'>
                <div className='icon-money'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                  </svg>
                </div>
                <div className='show-total'>
                  <h3 className='total'>{balance}</h3>
                </div>
              </div>
              <div className='col-4 user'>
                <Dropdown overlay={userMenu} trigger={['click']}>
                  <a onClick={e => e.preventDefault()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </a>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
