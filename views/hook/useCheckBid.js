import { getCurrentPrice } from '@/views/services/AuctionServices';
import { useState, useEffect } from 'react';
import { message } from 'antd';

const useCheckBid = (auctionData, auctionIdLive, bidSuccess) => {
    const [currentPrice, setCurrentPrice] = useState(auctionData.startingPrice);
    const [isFirstBid, setIsFirstBid] = useState(true);
  
    useEffect(() => {
      const getPriceCurrent = async () => {
        if (auctionIdLive) {
          try {
            const response = await getCurrentPrice(auctionIdLive);
            const currentPriceFromResponse = response.totalAmountAndStartingPrice;
            
            setCurrentPrice(currentPriceFromResponse); // Gán giá trị lấy từ API
            setIsFirstBid(false); // Cập nhật là đã có bid
          } catch (error) {
            if (error.message === "Không tìm thấy bất kỳ bid nào cho auctionId này.") {
              // Không có bid nào, gán giá trị startingPrice từ auctionData
              setCurrentPrice(auctionData.startingPrice);
              setIsFirstBid(true);
            } else {
              console.error("Lỗi khi lấy giá hiện tại:", error);
              message.error("Đã xảy ra lỗi khi lấy giá hiện tại");
            }
          }
        }
      };
  
      getPriceCurrent();
    }, [bidSuccess, auctionIdLive, auctionData.startingPrice]);
  
    return { currentPrice, isFirstBid, setCurrentPrice };
  };
  
  export default useCheckBid;