import axios from "../../axios";

//hàm gọi api lấy dữ liệu bẳng infor user theo userId
export const getInforById = async (userid) => {
  try {
    const response = await axios.get(`/api/info/${userid}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile data:', error.response);
    return error.response.data;
  } 
}

//hàm gọi api thêm thông tin cho user
export const addCreateInfor = async (formData) => {
  try {
    const response = await axios.post(`/api/createInfo`, formData);
    return response.data;
  }
  catch (error) {
    console.log('lỗi ở hàm thêm rồi: ', error);
    return error;
  }
}

//hàm gọi api edit thông tin user theo inforId
export const editInforById = async (inforId, data) => {
  try {
    const response = await axios.put(`/api/updateInfo/${inforId}`, data);
    return response.data;
  }
  catch (error) {
    console.error('loi o edit profile roi dan oi', error.response);
    return error.response;
  }
}

//hàm gọi api đăng kí cuộc đấu giá
export const addRegisterAuction = async (userId, auctionId) => {
  try {
    const response = await axios.post(`/api/registerUser/`, {userId, auctionId})
    return response.data;
  }
  catch (error) {
    console.error('lỗi ở hàm thêm sản phẩm đăng kí đấu giá', error);
    return null;
  }
}

//hàm gọi api trả về danh sách các cuộc đấu giá đã đăng kí
export const getRegisterAuction = async (userId) => {
  try {
    const response = await axios.get(`/api/${userId}/auctions`);
    return response.data;
  }
  catch (error) {
    console.error('lỗi ở hàm get register rồi đan le ơi: ', error);
    return null;
  }
}

//hàm gọi api approve cho cuộc đấu giá
export const Approve = async (spender, amount) => {
  try {
    const response = await axios.post(`/api/approve`, {spender, amount});
    return response.data;
  }
  catch (error) {
    console.error('lỗi ở hàm Approve rồi đan le ơi: ', error);
    return null;
  }
}

//hàm gọi api xoá sản phẩm đã đăng kí
export const deleteRegisterAuction = async (auctionId) => {
  try {
    const response = await axios.delete(`/api/deletregister/${auctionId}`);
    return response.data;
  }
  catch (error) {
    console.error('lỗi ở hàm deleteRegisterAuction rồi đan le ơi: ', error);
    return null;
  }
}

//hàm gọi api kiểm tra giá trị token đã approve vào cuộc đấu giá ấy
export const checkAllowance = async (spender, owner) => {
  try {
    const response = await axios.post(`/api/allowance`, {spender, owner});
    return response.data
  } catch (error) {
    console.error('lỗi ở hàm checkAllowance rồi đan le ơi: ', error);
    return null;
  }
}

//hàm gọi lấy giá tiền của address user
export  const getBalace = async(addressAccount) => {
  try {
    const response = await axios.get(`/api/balanceOf/${addressAccount}`);
    return response.data;
  } catch (error) {
    console.error('lỗi ở hàm checkAllowance rồi đan le ơi: ', error);
    return null;
  }
}

//hàm gọi api để nhận token sau khi xem video
export const claimToken = async (receiver) => {
  try {
    const response = await axios.post(`/api/claim`, {receiver});
    return response;
  } catch (error) {
    // console.log('lỗi ở claimToken: ', error);
    return error.response;
  }
}