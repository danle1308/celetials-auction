import { putBid, getAmountBidByBidder, getCurrentPrice } from "@/views/services/AuctionServices";
import AuctionABI from "../../../store/abiBid.json";
import { ethers } from 'ethers';
import { message } from "antd";


const contractAddress = process.env.NEXT_PUBLIC_Contract_Auction;

//hàm lấy dữ liệu bid và xuất dữ liệu ra sau khi convert
export const fetchData = async (auctionIdLive, setFilteredBids) => {
  const data = await getAmountBidByUser();
  // console.log('data: ', data);
  if (data && data.bids) { // Kiểm tra dữ liệu có tồn tại và bids là mảng
    if (auctionIdLive) {
      // Lọc danh sách các bid theo auctionIdLive
      const filteredData = data.bids.filter(bid => bid.auctionId === Number(auctionIdLive));
      // console.log('filteredData: ', filteredData);
      const sortedBids = filteredData.sort((a, b) => b.bidAmount - a.bidAmount);  // Hoặc dùng thời gian nếu có
      setFilteredBids(sortedBids);
    }
  }
};

// hàm lấy danh sách đặt giá của user ở tất cả các cuộc đấu giá
const getAmountBidByUser = async () => {
  const bidderId = localStorage.getItem('inforId');
  try {
    const response = await getAmountBidByBidder(bidderId);
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đặt giá:", error);
    return null;
  }
}

//hàm xử lí đặt giá
export const handlePutBid = async (auctionIdLive, bidMount, inforId, setIsLoading) => {
  setIsLoading(1);
  try {
    const transactionReceipt = await handlePutBidToBlockchain(auctionIdLive, bidMount);
    if (!transactionReceipt) {
      setIsLoading(0);
      return;
    }
    console.log('Giao dịch blockchain thành công:', transactionReceipt);

    const databaseResponse = await handlePutBidToDatabase(auctionIdLive, bidMount, inforId);
    console.log('Đặt giá thành công:', databaseResponse);
    setIsLoading(0);
  } catch (error) {
    console.error('Đặt giá thất bại:', error);
    setIsLoading(0);
    return;
  }
}

const handlePutBidToBlockchain = async (auctionId, bidMount) => {
    try {
      const amountInUnits = ethers.parseUnits(bidMount.toString(), 18);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const auctionContract = new ethers.Contract(contractAddress, AuctionABI, signer);
      const gasPrice = ethers.parseUnits("20", "gwei"); //gốc là 2000
  
      const tx = await auctionContract.bid(auctionId, amountInUnits, {gasPrice: gasPrice});
      
      console.log("Đang thực hiện đặt giá blockchain...");

      const receipt = await tx.wait();
      // console.log("Đặt giá thành công:", receipt);
  
      return receipt;
    } catch (error) {
      console.error('Lỗi khi thực hiện giao dịch với smart contract:', error);
      message.warning('The Tokens you have approve for auction is not enough. Please approve more Tokens to continue')
      return;
    }
  }

const handlePutBidToDatabase = async (auctionIdLive, bidMount, inforId) => {
  try {
    const response = await putBid(auctionIdLive, bidMount, inforId);
    console.log("Cập nhật giá đấu thầu vào cơ sở dữ liệu thành công:", response);
    return response;
  } catch (error) {
    console.error('Lỗi khi cập nhật giá vào cơ sở dữ liệu:', error);
    throw error;
  }
}

