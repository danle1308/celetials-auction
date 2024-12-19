'use client'

import { getAuction, getAuctionById, endAuctionById, sendEmailToWinner } from "@/views/services/AuctionServices";
import { message } from "antd";

// lấy thông tin cuộc đấu giá để hiển thị ra giao diện LiveAuction
export const getInforAuction = async (auctionIdLive, setAuctionData) => {
  if (auctionIdLive) {
    const response = await getAuctionById(auctionIdLive);
    if (response) {
      const auctionDataAfterGet = [{
        name: response.productName,
        timeRemaining: response.endTime,
        description: response.description,
        startingPrice: parseFloat(response.startingPrice),
        imageUrl: response.imageUrl,
        id: response.auctionId,
        active: response.active,
        startTime: response.startTime,
      }];
      setAuctionData(auctionDataAfterGet)
    }
  }
};

//lấy đấu giá đang diễn ra để hiển thị cho phần 'những sản phẩm gợi ý'
export const getAuctionForEx = async (setMoreAuctions) => {
    try {
        const response = await getAuction();
        // Lấy thời gian hiện tại (theo giây)
        const currentTime = Math.floor(Date.now() / 1000);
        // Lọc các đấu giá có endTime lớn hơn thời gian hiện tại
        const auctionsReady = response.filter(auction => auction.endTime > currentTime);
        setMoreAuctions(auctionsReady);
    } catch (error) {
        console.error('Lỗi ở hàm lấy: ', error);
    }
};

//gửi email tới người chiến thắng
const sendEmail = async (auctionIdLive) => {
  const response = await sendEmailToWinner(auctionIdLive);
  console.log('log trong hàm sendEmail: ', response);
}

// xử lí khi kết thúc đấu giá
export const endedAuction = async (auctionIdLive) => {

  if (!auctionIdLive) {
    console.log("auctionIdLive không hợp lệ.");
    return;
  };
  const response = await endAuctionById(auctionIdLive);
  message.info('The auction has ended. You will be redirected to the Products page');
  if (response.data.errorCode == 0) {

    await sendEmail(auctionIdLive);
    console.log('Đã gửi email nhé. kết thúc thành công!');

    const timer = setTimeout(() => {
      window.location.href = '/author/settings/ProductAuthor'
    }, 10000);
    return () => clearTimeout(timer);

  } else if (response.data.errorCode == 5) {
    console.log('không cần gửi mail và về trang chủ nhé');
    const timer = setTimeout(() => {
      window.location.href = '/author/settings/ProductAuthor'
    }, 10000);
    return () => clearTimeout(timer);

  }

};
