
import { putBid, getAuctionById, endAuctionById, getCurrentPrice, sendEmailToWinner } from "@/views/services/AuctionServices";
import AuctionABI from "../../../store/abiBid.json";
import { ethers } from 'ethers';
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

// lấy giá tiền
export const getCurrentPriceFrom2 = async (auctionIdLive, setCurrentPrice) => {
  if (auctionIdLive) {
    const response = await getCurrentPrice(auctionIdLive);
    console.log('Lấy giá tiền')
    // console.log('response from getCurrentPriceFrom2: ', response);
    if (response.status === 404) {
      const response = await getAuctionById(auctionIdLive);
      const startingPrice = parseFloat(response.startingPrice);
      // console.log('startingPrice: ', startingPrice);
      setCurrentPrice(startingPrice)
    } else if (response) {
      const getBids = response.bids
      const sortedBids = getBids.sort((a, b) => parseFloat(b.bidAmount) - parseFloat(a.bidAmount));
      const currentPriceFromResponse = sortedBids.length > 0 ? parseFloat(sortedBids[0].bidAmount) : 0;
      // console.log('currentPriceFromResponse: ', currentPriceFromResponse);
      setCurrentPrice(currentPriceFromResponse);
    }
  }
};

//gửi email tới người chiến thắng
const sendEmail = async (auctionIdLive) => {
  const response = await sendEmailToWinner(auctionIdLive);
  // console.log('log trong hàm sendEmail: ', response);
}

// xử lí khi kết thúc đấu giá
export const endedAuction = async (auctionIdLive) => {
  if (!auctionIdLive) {
    console.log("auctionIdLive không hợp lệ.");
    return;
  };
  const response = await endAuctionById(auctionIdLive);
  message.info('The auction has ended. You will be redirected to the Registered Auctions page');
  if (response.data.errorCode == 0) {
    await sendEmail(auctionIdLive);
    console.log('Đã gửi email nhé. kết thúc thành công!');
    const timer = setTimeout(() => {
      window.location.href = '/user/settings/MyDocument'
    }, 15000);
    return () => clearTimeout(timer);
  } else if (response.data.errorCode == 5) {
    console.log('không cần gửi mail và về trang chủ nhé');
    const timer = setTimeout(() => {
      window.location.href = '/user/settings/MyDocument'
    }, 15000);
    return () => clearTimeout(timer);
  }
};
