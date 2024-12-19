import { getAllBids } from "@/views/services/AuctionServices";

//hàm lấy dữ liệu bid và xuất dữ liệu ra sau khi convert
export const fetchData = async (auctionIdLive, setFilteredBids, setCurrentPrice) => {
    try {
      const response = await getAllBids(auctionIdLive); // Giả sử API này trả về các bids
      // Sắp xếp các bids theo số tiền đấu giá giảm dần
      const sortedBids = response.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
      //lấy giá tiền cao nhất
      const highestAmount = sortedBids.length > 0 ? parseFloat(sortedBids[0].amount) : 0;
      //setstate
      console.log('sortedBids: ', sortedBids);
      console.log('highestAmount: ', highestAmount)
      setCurrentPrice(highestAmount);
      setFilteredBids(sortedBids);
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  };
