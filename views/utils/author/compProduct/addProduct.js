'use client'

import { message } from 'antd';
import { handleAddProduct, uploadImageToCloudinary } from '../../../services/author/AuthorServices';
import AuctionABI from "../../../store/abiBid.json";
import { ethers } from 'ethers';

const contractAddress = process.env.NEXT_PUBLIC_Contract_Auction;

//tạo formData từ giá trị đầu vào và URL ảnh
const createFormData = (values, authorId, imageUrl) => {
  const formData = new FormData();
  formData.append('loginId', authorId);
  formData.append('productname', values.productname);
  formData.append('description', values.description);
  const startingPrice = parseFloat(values.price); 
  formData.append('startingPrice', startingPrice);
  formData.append('durationInMinutes', values.auctionTime);
  formData.append('startTime', values.startTime.toISOString());
  formData.append('imageUrl', imageUrl);
  return formData;
};

//upload ảnh
const uploadProductImage = async (image) => {
  if (image && image[0] && image[0].originFileObj) {
    try {
      const response = await uploadImageToCloudinary(image[0].originFileObj);
      console.log('giá trị trả về khi gọi api upload ảnh:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
      message.error('Đã xảy ra lỗi khi upload ảnh');
      throw error;
    }
  } else {
    console.error('Ảnh không tồn tại hoặc không hợp lệ');
    throw new Error('Ảnh không tồn tại hoặc không hợp lệ');
  }
};

//gọi hàm createAuction trên smart contract
const addAuctionToBlockchain = async (values, imageUrl) => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const auctionContract = new ethers.Contract(contractAddress, AuctionABI, signer);
    const gasPrice = ethers.parseUnits("100", "gwei"); //gốc là 100 để tăng tốc độ thêm sản phẩm

    // Tính toán thời gian kết thúc
    const startTimeInSeconds = Math.floor(new Date(values.startTime).getTime() / 1000); 
    const currentBlockTimestamp = Math.floor(Date.now() / 1000); 

    const timeToStart = startTimeInSeconds - currentBlockTimestamp; 

    if (timeToStart < 0) {
      console.error('Thời gian bắt đầu phải lớn hơn thời gian hiện tại');
      message.error('Thời gian bắt đầu phải lớn hơn thời gian hiện tại');
      return;
    }

    const auctionDurationInSeconds = values.auctionTime * 60;
    const totalDuration = timeToStart + auctionDurationInSeconds - 30;

    const tx = await auctionContract.createAuction(
      values.productname,
      values.description,
      imageUrl,
      ethers.parseUnits(values.price.toString(), 'ether'), 
      totalDuration,
      { gasPrice: gasPrice },
    );

    console.log('Đang thêm vào blockchain...', tx);
    const receipt = await tx.wait();
    console.log('Tạo đấu giá thành công trên blockchain', receipt);
  } else {
    console.error('Ethereum wallet chưa được cài đặt.');
    message.error('Vui lòng cài đặt ví MetaMask');
    throw new Error('Ethereum wallet chưa được cài đặt.');
  }
};


//gọi API để thêm đấu giá vào cơ sở dữ liệu
const addAuctionToDatabase = async (formData) => {
  const newProductData = await handleAddProduct(formData);
  return newProductData;
};

// Hàm chính
export const handleAddNewProduct = async (values, setLoading, setProducts, setOpenModal) => {
  setLoading(true);
  const inforId = localStorage.getItem('inforId')

  if (!inforId) {
    message.warning('Please add information!');
    setLoading(false);
    setOpenModal(false);
    return;
  }

  try {
    const authorId = localStorage.getItem('authorId');
    if (!authorId) {
      console.error('Không tìm thấy ID tác giả.');
      setLoading(false);
      return;
    }
    const imageUrl = await uploadProductImage(values.image);
    const formData = createFormData(values, authorId, imageUrl);

    await addAuctionToBlockchain(values, imageUrl);
    const newProductData = await addAuctionToDatabase(formData);
    console.log('newProductData: ', newProductData);

    if (newProductData) {
      const newProduct = {
        key: newProductData.product.id,
        name: newProductData.product.productName,
        image: newProductData.product.image || newProductData.product.imageUrl,
        description: newProductData.product.description,
        price: newProductData.product.startingPrice,
        status: newProductData.product.active,
        auctionTime: newProductData.product.endTime,
        startTime: newProductData.product.startTime,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      message.success('Upload thành công');
    } else {
      console.error('Thêm sản phẩm thất bại');
      message.error('Đã xảy ra lỗi khi thêm sản phẩm');
    }
  } catch (error) {
    console.error('Lỗi khi thêm/cập nhật sản phẩm:', error);
    message.error('Đã xảy ra lỗi khi thêm sản phẩm');
  } finally {
    setLoading(false);
  }
};
