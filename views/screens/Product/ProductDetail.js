'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/views/components/Navbar';
import "@/views/style/ProductDetail.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterAll from '@/views/components/Footer';
import { getAuction, getAuctionById } from '@/views/services/AuctionServices';
import NavbarAfter from '@/views/components/NavbarAfter';
import { RegisterAuction, checkIsRegister } from '@/views/utils/compAuctionDetail';
import { useSignal } from '@/views/store/context/SignalContext';
import { Button, Tooltip } from 'antd';

const ProductDetail = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [auctionTime, setAuctionTime] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(0);

  const params = useParams();

  const { triggerCartAnimation } = useSignal();

  useEffect(() => {
    checkIsRegister({ params }, setIsRegister);
  }, [])

  //lấy thông tin cuộc đấu giá
  useEffect(() => {
    if (params.auctionId) {
      const fetchProduct = async () => {
        const productData = await getAuctionById(params.auctionId);
        if (productData) {
          setCurrentProduct(productData);
        } else {
          console.error('Không tìm thấy sản phẩm!');
        }
      };
      fetchProduct();
    } else {
      console.error('Không có auctionId!');
    }
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      const userConfirmed = window.confirm("You are not logged in, please log in!");
      if (userConfirmed) {
        window.location.href = '/user/signin';
      }
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // convert startTime and auctionTime
  const convertTime = async () => {
    const date = new Date(currentProduct.startTime);
    const formattedTime = date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setStartTime(formattedTime);
    const auctionTimeInMinute = Math.floor((currentProduct.endTime - date / 1000) / 60);
    setAuctionTime(auctionTimeInMinute);
  };

  //lấy sản phẩm gợi ý
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const allAuctions = await getAuction();
        setSuggestedProducts(allAuctions);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm gợi ý:', error);
      }
    };
    fetchSuggestedProducts();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      convertTime();
    }
  }, [currentProduct]);

  // hàm nhấn đăng ký
  const handleRegisterClick = async () => {
    try {
      await RegisterAuction({ params }, setIsRegister);
      const timer = setTimeout(() => {
        triggerCartAnimation();
      }, 110);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error registering auction:', error);
    }
  };

  if (!currentProduct) {
    return <div>Product not found</div>;
  };

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}

      <section className="sec-detail py-4">
        <div className="div-details container">
          <div className="row">
            <div className="col-md-4 col-suggest">
              <div>
                <h5 className='suggest-title'>Suggest Product</h5>
              </div>
              {suggestedProducts.map((suggestedProduct, index) => (
                <div key={index} className='product-item d-flex mb-3'>
                  <div className="col-md-4 image-container">
                    <img className="img-suggest" src={suggestedProduct.imageUrl} alt={suggestedProduct.productName} />
                  </div>
                  <div className="col-md-8 title-container">
                    <div className='title-content'>
                      <h6 className="name-suggest">{suggestedProduct.productName}</h6>
                      <p className="price-suggest">{suggestedProduct.startingPrice}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-success read-more-btn"
                      onClick={() => handleReadMore(suggestedProduct.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-8 col-details">
              <div className="details-column">
                <div className="row mb-5">
                  <div className="col-md-7 image-container">
                    <img className="img-product" src={currentProduct.imageUrl} alt={currentProduct.productName} />
                  </div>
                  <div className="col-md-5 details-container">
                    <h1 className='product-name mb-3'>{currentProduct.productName}</h1>
                    <p className='product-price'>{currentProduct.startingPrice} $</p>
                    <p className='product-description-title'>Product description: {currentProduct.description}</p>
                    <p className='product-author'>Auction Time: {auctionTime} min</p>
                    <p className='auction-time'>Start Time: {startTime}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className='button-container d-flex flex-column align-items-center'>
                      <Tooltip
                        title={isRegister == 1 ? 'You have registered for this auction' : ''}
                        disabled={isRegister == 0}
                      >
                        <Button className="btn-regis" onClick={handleRegisterClick} disabled={isRegister == 1}>Register for auction</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterAll />
    </>
  );
};

export default ProductDetail;
