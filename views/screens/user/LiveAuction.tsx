'use client'

import React, { useEffect, useState, useRef } from 'react';
import "@/views/style/LiveAuction.css";
import { Row, Button, message, Modal, Spin } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import Navbar from '@/views/components/Navbar';
import NavbarAfter from '@/views/components/NavbarAfter';
import { useParams } from 'next/navigation';
import { handlePutBid, fetchData } from '@/views/utils/user/compLiveAuction/compPutBid';
import { getInforAuction, getCurrentPriceFrom2, endedAuction } from '@/views/utils/user/compLiveAuction/compAboutPrice';
import SplashScreen from '@/views/screens/splashScreen';
import { getAuctionForEx } from '@/views/utils/author/compLiveAuction/compAboutPrice';
import { ClipLoader } from 'react-spinners';
import FooterAll from '@/views/components/Footer';

export default function LiveAuction() {
  const [multiplier, setMultiplier] = useState(1);
  const { auctionIdLive } = useParams();
  const [auctionData, setAuctionData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });
  const [bidMount, setBidMount] = useState(0);
  const [bidSuccess, setBidSuccess] = useState(false);
  const stepPrice = 10;
  const [filteredBids, setFilteredBids] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSplashScreen, setOpenSplashScreen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [moreAuctions, setMoreAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const handleIncrease = () => setMultiplier(multiplier + 1);
  const handleDecrease = () => {
    if (multiplier > 1) setMultiplier(multiplier - 1);
  };

  useEffect(() => {
    setBidMount((stepPrice * multiplier) + currentPrice);
  }, [multiplier, stepPrice, currentPrice]);

  const fetchCurrentPrice = async () => {
    await getCurrentPriceFrom2(auctionIdLive, setCurrentPrice);
    setBidSuccess(false);
  };

  // lấy giá tiền hiện tại cho cuộc đấu giá
  useEffect(() => {
    if (isAuctionEnded) return;
    fetchCurrentPrice();
    const intervalId = setInterval(fetchCurrentPrice, 5000);
    return () => clearInterval(intervalId);
  }, [bidSuccess, currentPrice, isAuctionEnded]);

  //use Efect lấy thông tin cuộc đấu giá để hiển thị 
  useEffect(() => {
    getAuctionForEx(setMoreAuctions);
    getInforAuction(auctionIdLive, setAuctionData);
  }, []);

  //xử lí khi nhấn nút đặt giá
  const handleSubmitBid = async () => {
    const inforId = localStorage.getItem('inforId');
    try {
      await handlePutBid(auctionIdLive, bidMount, inforId, setIsLoading);
      setBidSuccess(true);
    } catch (error) {
      console.error("Lỗi khi đặt giá:", error);
    } finally {
      fetchData();
      setMultiplier(1);
    }
  };

  // useEffect lấy danh sách đặt giá và convert
  useEffect(() => {
    const getBid = async () => {
      await fetchData(auctionIdLive, setFilteredBids);
    }
    getBid();
  }, [auctionIdLive, bidSuccess]);

  const handleNavigateToDetails = (auctionId: number) => {
    window.location.href = `/products/${auctionId}`
  };

  // Hàm thực hiện công việc khi đấu giá kết thúc
  const handleAuctionEnd = async () => {
    if (isAuctionEnded) return;
    console.log("Xử lý khi đấu giá kết thúc...");
    setTimeout(() => {
      setOpenSplashScreen(true);
    }, 3000);
    try {
      await endedAuction(auctionIdLive);
    } catch (error) {
      console.error("Lỗi khi kết thúc đấu giá:", error);
    } finally {
      setIsAuctionEnded(true);
    }
  };

  useEffect(() => {
    if (auctionData.length > 0) {
      const startTimeStr = auctionData[0].startTime;
      const startTime = new Date(startTimeStr).getTime();
      const timeless = auctionData[0].timeRemaining * 1000;
      const currentTime = new Date().getTime();

      if (isNaN(startTime)) {
        console.error('startTime không hợp lệ:', startTimeStr);
        return;
      }

      if (currentTime < startTime) {
        message.error('The auction has not taken place yet');
      } else if (currentTime >= startTime && currentTime < timeless) {
        message.success('The auction is ongoing');

        // Chỉ tạo setInterval một lần
        if (!timerRef.current) {
          timerRef.current = setInterval(() => {
            const now = new Date().getTime();
            const remainingTime = Math.max(0, timeless - now);
            if (remainingTime > 0) {
              const minutesLeft = Math.floor((remainingTime % 3600000) / 60000);
              const secondsLeft = Math.floor((remainingTime % 60000) / 1000);
              setTimeLeft({
                minutes: minutesLeft,
                seconds: secondsLeft,
              });
            } else {
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = null; // Reset ref
              setTimeLeft({ minutes: 0, seconds: 0 });
              setIsModalOpen(true);

              setTimeout(async () => {
                await handleAuctionEnd(); // Gọi hàm khi đấu giá kết thúc
                setIsModalOpen(false);
              }, 5000);
            }
          }, 1000);
        }
      } else {
        message.error('The auction has ended');
      }
    }
    // Dọn dẹp setInterval khi component unmount hoặc dữ liệu thay đổi
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [auctionData]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      const userConfirmed = window.confirm("Bạn chưa đăng nhập, hãy đăng nhập!");
      if (userConfirmed) {
        window.location.href = '/user/signin';
      }
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // useEffect(() => {
  //   setIsModalOpen(true);
  // }, [])

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}

      {openSplashScreen && <SplashScreen auctionIdLive={auctionIdLive} onComplete={() => setOpenSplashScreen(false)} winner={undefined} price={undefined} />}

      <section className='sec-liveAuction'>
        <div className='div-live container py-2'>
          <div className='row'>
            <Modal
              className='modal-noti'
              title="Notification"
              visible={isModalOpen}
              footer={null}
              closable={false}
              centered
            >
              <div style={{ textAlign: 'center' }}>
                <ClipLoader color="#22C55E" size={20} />
                <p className='noti-title'>Auction has ended, please wait a moment...</p>
              </div>
            </Modal>
            <div className='col-7'>
              <div className='row row-count'>
                <h2 className='timeLess'>Time Remaining:</h2>
                <h3 className='timeCount'>{`${timeLeft.minutes} : ${timeLeft.seconds < 10 ? '0' : ''}${timeLeft.seconds}`}</h3>
              </div>

              <div className='row row-product'>
                <div className='div-pro'>
                  <img className='image-product' src={auctionData[0]?.imageUrl} alt="Product Image" />
                </div>
              </div>
              <div className='row row-extend'>
                <div className='div-extend'>
                  <h2 className='title-extend'>Renewal times: 1</h2>
                </div>
              </div>
              <div className='row row-infor1'>
                <div className='col-6 leftInfor'>
                  <h3 className='product-name'>{auctionData[0]?.name}</h3>
                </div>
                <div className='col-6 rightInfor'>
                  <h3 className='author-name'>{auctionData[0]?.description}</h3>
                </div>
              </div>
              <div className='row suggest py-3'>
                {moreAuctions.map((auction, index) => (
                  <div key={auction.id || index} className="card-auctions">
                    <img src={auction.imageUrl} className="card-img-top" alt={auction.productName} />
                    <div className="card-body-auctions">
                      <span
                        className="card-title-auctions"
                        onClick={() => handleNavigateToDetails(auction.id)}
                      >
                        {auction.productName}
                      </span>
                      <p className="card-text-auctions">Description: {auction.description}</p>
                      <p className="card-text-auctions">Start Price: {auction.startingPrice} $</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-but col-5'>
              <div className='greenBox'>
                <div className='currentMoney-title'>
                  <DollarOutlined className='iconChart' />
                  <h2 className='title'>Current Price</h2>
                  <div className='currentPrice'>{currentPrice}$</div>
                </div>
                <hr className='divider' />
                <div className='inforPrice py-2'>
                  <Row className='price'>
                    <div className='priceField'>{stepPrice}$</div>
                    <div className="multiplySymbol">X</div>
                    <div className='multiplierField'>
                      <button onClick={handleDecrease} className='decreaseButton'>-</button>
                      {multiplier}
                      <button onClick={handleIncrease} className='increaseButton'>+</button>
                    </div>
                    <div className="equalSymbol">=</div>
                    <div className='totalField'>{stepPrice * multiplier}$</div>
                  </Row>
                  <div className='buttonPrice'>
                    <Button className='butPrice' loading={isLoading == 1} type='primary' onClick={() => { handleSubmitBid() }}>Send {(stepPrice * multiplier) + currentPrice} $</Button>
                  </div>
                </div>
              </div>

              <div className='updateBox'>
                {filteredBids && filteredBids.length > 0 ? (
                  filteredBids.map((bid, index) => (
                    <div className="update-card card" key={index}>
                      <div className="card-header">
                        Bid successfully!
                      </div>
                      <div className="body-noti card-body">
                        <div className='row' >
                          <div className='col-7'>
                            <h3 className='notification'>You have placed a bid: {bid.bidAmount}$</h3>
                          </div>
                          <div className='div-time-noti col-5'>
                            <p className='time-noti' title="Source Title">
                              {new Date().toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-bids-message">
                    No bids found...
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>
      <FooterAll />
    </>
  );
}
