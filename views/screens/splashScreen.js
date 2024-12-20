'use client'

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '@/views/style/components/SplashScreen.css';
import { ClipLoader } from 'react-spinners';
import { getHighestBidder, getHighestPrice } from '@/views/services/AuctionServices';

const SplashScreen = ({ auctionIdLive, onComplete, zoomSpeed = 2.5, winner,  price}) => {

  const [winnerState, setWinner] = useState('');
  const [highestPrice, setHighestPrice] = useState(0);

  //lấy thông tin người chiến thắng của cuộc đấu giá ấy
  const getResult = async () => {
    const getWinner = await getHighestBidder(auctionIdLive);
    const getPrice = await getHighestPrice(auctionIdLive);
    setWinner(getWinner.highestBidder);
    setHighestPrice(getPrice.highestBid)
  };
  const formatWalletAddress = (address) => {
    if (!address) return "Loading...";
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  useEffect(() => {
    const fetch = async() => {
      await getResult();
    }
    fetch();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} // Bắt đầu mờ
      animate={{ opacity: 1 }} // Hiệu ứng hiện dần
      exit={{ opacity: 0 }} // Hiệu ứng mờ dần khi ẩn
      transition={{ duration: 2 }} // Thời gian hiệu ứng fade-in
      className="splash-screen-overlay"
    >
      <motion.div
        animate={{
          scale: [1, 1.07, 1], // Zoom in và zoom out
        }}
        transition={{
          duration: zoomSpeed, // Thời gian chuyển đổi
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="splash-screen-content"
      >
        <h1 className="congrat">Congratulations!</h1>
        <div className="name-winner">
          <h1 className="tit-name">Winner:&nbsp; </h1>
          <h1 className="name"> {winnerState ? formatWalletAddress(winnerState) : (<ClipLoader color="#22C55E" size={18} />)}</h1>
        </div>
        <div className="name-price">
          <h1 className="tit-price">Hammer Price:&nbsp; </h1>
          <h1 className="price"> {highestPrice ? `${highestPrice.toLocaleString()} $` : (<ClipLoader color="#22C55E" size={18} />)}</h1>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;