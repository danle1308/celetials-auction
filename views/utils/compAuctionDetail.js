'use client';

import { addRegisterAuction } from '@/views/services/user/ProfileServices';
import { message } from 'antd';
import { getRegisterAuction } from '@/views/services/user/ProfileServices';

export const RegisterAuction = async ({ params }, setIsRegister) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('You are not logged in. Please log in to register for the auction.!');
    router.push('/user/signin');
    return;
  }
  const getRole = localStorage.getItem('role');
  if (!params.auctionId) {
    alert('No auction information found');
    return;
  };
  if (getRole == 'user') {
    const userId = localStorage.getItem('userId');
    try {
      const response = await addRegisterAuction(userId, params.auctionId);
      console.log('response: ', response);
      if (response.errorCode == 0) {
        message.success('Auction registration successful!');
        setIsRegister(1);
      } else {
        message.error('Auction registration failed. Please try again');
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký đấu giá:', error);
    }
  } else if (getRole == 'author') {
    message.info('Author cannot register for auction, please log in with User account');
  };
}


const getListIdCheck = async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    try {
      const register = await getRegisterAuction(userId);
      if (register) {
        const getId = register.map((auction) => {
          return {
            id: auction.id,
          }
        })
        return getId;
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      return;
    }
  }
}

export const checkIsRegister = async ({ params }, setIsRegister) => {
  let idNeedCheck = params.auctionId;
  idNeedCheck = Number(idNeedCheck);
  const listIdCheck = await getListIdCheck();
  if (!listIdCheck) {
    setIsRegister(0);
    return;
  }
  console.log('listIdCheck: ', listIdCheck);
  const isDisabled = listIdCheck.some(item => item.id === idNeedCheck);
  if (isDisabled) {
    setIsRegister(1);
    return;
  } else {
    setIsRegister(0);
    return;
  }
};