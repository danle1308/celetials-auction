import axios from "../axios";

//hàm gọi api trả về thông tin tất cả các cuộc đấu giá
export const getAuction = async() => {
    try {
        const response = await axios.get('/api/auction/status');
        return response.data;
    } catch (error) {
        console.error('fetch data fail', error);
        throw error;
    }
}

//hàm gọi api trả về thông tin của cuộc đấu giá theo auctionId
export const getAuctionById = async(id) => {
    try {
        const response = await axios.get(`/api/auctions/${id}`);
        // console.log('data trả về của api lấy thông tin đấu giá theo id: ', response.data);
        return response.data;
    } catch (error) {
        console.error('fetch data fail', error);
        throw error;
    }
}

//hàm gọi api trả về thông tin người đặt giá cao nhất
export const getHighestBidder = async(auctionId) => {
    try {
        const response = await axios.get(`/api/auctions/${auctionId}/current-highest-bidder`);
        return response.data;
    } catch (error) {
        console.error('lấy người đặt giá cao nhất thất bại: ', error);
        throw error;
    }
};

//hàm gọi api trả về thông tin giá đặt cao nhất
export const getHighestPrice = async(auctionId) => {
    try {
        const response = await axios.get(`/api/auctions/${auctionId}/current-highest-bid`);
        return response.data;
    } catch (error) {
        console.error('lấy giá tiền cao nhất thất bại: ', error);
        throw error;
    }
};

//hàm gọi api đặt giá theo auctionId, bidAmount, inforId
export const putBid = async(auctionId, bidAmount, bidderId) => {
    try {
        const response = await axios.post(`/api/bid`, {auctionId, bidAmount, bidderId});
        return response.data;
    } catch (error) {
        console.error('đặt giá thất bại: ', error);
        throw error;
    }
};

//hàm gọi api lấy giá hiện tại của cuộc đấu giá
export const getCurrentPrice = async(auctionId) => {
    try {
        const response = await axios.get(`/api/getAmountBidByAuctionId/${auctionId}`);
        return response.data;
    } catch (error) {
        // console.error('lấy giá hiện tại thất bại getCurrentPrice: ', error.response);
        return error.response;
    }
}

//hàm gọi api lấy tất cả lượt đấu giá trong 1 cuộc đấu giá bằng auctionId
export const getAllBids = async(auctionId) => {
    try {
        const response = await axios.get(`/api/auctions/${auctionId}/bids`);
        return response.data;
    } catch (error) {
        console.error('lấy lượt đấu giá thất bại getAllBids: ', error.response);
        return error.response;
    }
}

//hàm gọi api lấy các lượt đấu giá của user theo bidderId (inforId)
export const getAmountBidByBidder = async(bidderId) => {
    try {
        const response = await axios.get(`/api/getAmountBidByBidder/${bidderId}`);
        return response.data;
    } catch (error) {
        console.error('có lỗi ở hàm getAmountBidByBidder: ', error);
        throw error;
    }
}

//hàm gọi api khi kết thúc thời gian đấu giá
export const endAuctionById = async(auctionId) => {
    try {
        const response = await axios.post(`/api/auctions/${auctionId}/end`);
        console.log('response của hàm gọi api end: ', response);
        return response;
    } catch (error) {
        console.error('có lỗi ở hàm endAuctionById: ', error);
        return error.response;
    }
};

//hàm gọi api hiển thị thông tin người thằng cuộc đấu giá theo auctionId
export const getAuctionResult = async(auctionId) => {
    try {
        const response = await axios.get(`/api/auction/${auctionId}/result`);
        return response.data;
    } catch (error) {
        console.error('có lỗi ở hàm getAuctionResult: ', error);
        throw error;
    }
};

//hàm gọi api gửi email về người chiến thắng cuộc đấu giá
export const sendEmailToWinner = async(auctionId) => {
    try {
        const response = await axios.get(`/api/getEmailByWinnerAddress/${auctionId}`);
        console.log('response.data: ', response.data);
        return response.data;
    } catch (error) {
        console.error('có lỗi ở hàm sendEmailToWinner: ', error);
        throw error;
    }
};

//hàm gọi api hiển thị danh sách kết quả cuộc đấu giá
export const showAuctionResult = async() => {
    try {
        const response = await axios.get(`/api/completed-auction`);
        // console.log('response.data: ', response.data);
        return response.data;
    } catch (error) {
        console.error('có lỗi ở hàm showAuctionResult: ', error);
        throw error;
    }
};

//hàm gọi api hiển thị lịch sử đặt giá của user
export const showAuctionHistory = async(userId) => {
    try {
        const response = await axios.get(`/api/productHistory/${userId}`);
        // console.log('response.data: ', response);
        return response.data;
    } catch (error) {
        console.error('có lỗi ở hàm showAuctionResult: ', error);
        return error;
    }
}