'use client'

import { getInforById } from "@/views/services/user/ProfileServices";
import { claimToken } from "@/views/services/user/ProfileServices";
import { message } from "antd";

export const checkAuth = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    message.error("Vui lòng đăng nhập lại");
    setTimeout(() => {
      window.location.href = '/user/signin';
    }, 1500);
  } else {
    console.log("Token hợp lệ, tiếp tục truy cập trang");
  }
}

export const getInforId = async () => {
  if (localStorage.getItem('role') == 'user') {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getInforById(userId);
      console.log('response: ', response);
      switch (response.errorCode) {
        case 1:
          message.warning('You have not added personal information, please add information to be able to bid!');
          return;
        case 0:
          if (response.data) {
            localStorage.setItem('inforId', response.data.id);
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
      console.error('Failed to get InforId:', error);
    }
  } else {
    return;
  }
}

const accessToken = localStorage.getItem('accessToken');

export const ClaimToken2 = async (setIsLoading, setIsClaimed) => {
  if (!accessToken) {
    message.warning('Please login to claim Token');
    return;
  } else {
    try {
      const role = localStorage.getItem('role');

      switch (role) {
        case 'user':
          setIsLoading(true);
          const walletAddressUser = localStorage.getItem("userAddress");
          const responseUser = await claimToken(walletAddressUser);
          console.log("response: ", responseUser);
          if (responseUser.data.errorCode == 1) {
            message.warning("You have Claimed! Please Claim tomorrow");
            setIsLoading(false);
            setIsClaimed(true);
            return
          } else {
            message.success("Claim successful");
            setIsLoading(false);
            setIsClaimed(true);
            return;
          }
        case 'author':
          setIsLoading(true);
          const walletAddressAuthor = localStorage.getItem("authorAddress");
          const responseAuthor = await claimToken(walletAddressAuthor);
          console.log("response: ", responseAuthor);
          if (responseAuthor.data.errorCode == 1) {
            message.warning("You have Claimed! Please Claim tomorrow");
            setIsLoading(false);
            setIsClaimed(true);
            return
          } else {
            message.success("Claim successful");
            setIsLoading(false);
            setIsClaimed(true);
            return;
          }
        default:
          message.error('Đã xảy ra lỗi không xác định');
          return;
      };
    } catch (error) {
      console.error('Failed to claim Token:', error);
    }
  }
} 