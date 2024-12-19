"use client";

import React from "react";
import YouTube from "react-youtube";
import "bootstrap/dist/css/bootstrap.min.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import "@/views/style/Title.css";
import Navbar from "../components/Navbar";
import NavbarAfter from "../components/NavbarAfter";
import FooterAll from "../components/Footer.js";
import { useEffect, useState } from "react";
import { getAuction } from "@/views/services/AuctionServices";
import { getInforId, ClaimToken2 } from '@/views/utils/checkAuth'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const [player, setPlayer] = useState(null);
  const [claimButtonClass, setClaimButtonClass] = useState("claim-btn");
  const [hasZoomed, setHasZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const handlePlayerReady = (event) => {
    setPlayer(event.target);
  };

  const handleClaim = async () => {
    ClaimToken2(setIsLoading, setIsClaimed);
  };

  useEffect(() => {
    getInforId();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoggedIn(false);
      const userConfirmed = window.confirm(
        "You are not logged in, please log in!"
      );
      if (userConfirmed) {
        window.location.href = "/user/signin";
      }
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  //cập nhật thời gian xem video để hiển thị nút claim
  useEffect(() => {
    let interval;
    if (player) {
      interval = setInterval(() => {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        const percentage = Math.floor((currentTime / duration) * 100);
        setWatchedPercentage(percentage);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [player]);

  //useEffect dùng chạy hiệu ứng khi hiển thị nút Claim
  useEffect(() => {
    if (watchedPercentage >= 40 && !hasZoomed && !isClaimed) {
      setClaimButtonClass("claim-btn zoom-in");
      setTimeout(() => {
        setClaimButtonClass("claim-btn zoom-out");
      }, 500);
      setHasZoomed(true);
    }
  }, [watchedPercentage, hasZoomed, isClaimed]);

  // Gọi API lấy các cuộc đấu giá
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAuction();
        const lastFourAuctions = data.reverse().slice(0, 4);
        setAuctions(lastFourAuctions);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đấu giá", error);
      }
    };

    fetchAuctions();
  }, []);

  const goToDetails = async(key) => {
    window.location.href = `/products/${key}`;
  }

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}
      {/*================================================*/}
      <section class="sec-title py-5">
        <div class="title container py-5">
          <div class="div-title">
            <img src="/Untitled1.png" style={{ width: "300px" }} />
            <h2 class="description-about">
              Our auction website is an online platform that allows buying{" "}
              <br /> and selling goods and services through auction
            </h2>
            <button
              class="but-connect"
              onClick={(e) => {
                e.preventDefault();
                { !localStorage.getItem('accessToken') ? window.location.href = "/user/signin" : window.location.href = "/products"}
              }}
            >
              { !localStorage.getItem('accessToken') ? `Let's Get Started` : `Find Somethings`}
            </button>
          </div>
        </div>
        {/*================================================*/}
        <div className="watch-to-earn py-5">
          <h2 className="watch-title">Watch to Earn</h2>
          <h2 class="watch-tit2">
            If you don't have our Token. Just watch this video and then you can
            claim Token!
          </h2>
          <YouTube
            className="youtube-player"
            videoId="_BIsffqaW1M"
            opts={{
              height: "360px",
              width: "100%",
              playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
              },
            }}
            onReady={handlePlayerReady}
          />
          <div className="watch-buttons">
            <button
              className={claimButtonClass}
              onClick={handleClaim}
              disabled={watchedPercentage < 40 || isClaimed || isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : isClaimed ? (
                "Claimed"
              ) : (
                "Claim"
              )}
            </button>
          </div>
        </div>

        {/*================================================*/}
        <div class="how container py-5">
          <div class="div-tit-how">
            <h1 class="how-tit1">Gain more insight into how people use your</h1>
            <h2 class="how-tit2">
              With the ability to integrate Blockchain, our auction website can
              secure information
            </h2>
          </div>
          <div class="div-how">
            <div class="row">
              <div class="col-how col-4">
                <img src="/Image7.png" class="img-fluid" />
                <h4 class="text-how">
                  Buy and sell easily,
                  <br />
                  reputable auction
                </h4>
                <p class="des-how">
                  We are committed to bringing you the simplest
                  <br />
                  and most convenient online shopping experience
                </p>
              </div>
              <div class="col-how col-4">
                <img src="/Image6.png" class="img-fluid" />
                <h4 class="text-how">
                  Smart transactions,
                  <br />
                  top reputation
                </h4>
                <p class="des-how">
                  With a reputable and top-notch security platform,
                  <br />
                  you can feel completely secure when making transactions
                </p>
              </div>
              <div class="col-how col-4">
                <img src="/Image3.png" class="img-fluid" />
                <h4 class="text-how">Prestige top priority</h4>
                <p class="des-how">
                  Our reputation is a solid foundation that helps you feel
                  completely secure when participating in online buying, selling
                  and auctions
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-how col-6">
                <img src="/Image4.png" class="img-fluid" />
                <h4 class="text-how">
                  Real value,
                  <br />
                  real experience
                </h4>
                <p class="des-how">
                  We guarantee that every product matches the description and
                  quality
                </p>
              </div>
              <div class="col-how col-6">
                <img src="/Image5.png" class="img-fluid" />
                <h4 class="text-how">
                  Public auction,
                  <br />
                  absolutely confidential
                </h4>
                <p class="des-how">
                  With the combination of openness and security,
                  <br />
                  you can participate in online auctions and shopping with
                  complete peace of mind
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*================================================*/}
        <div class="div-product container">
          <div class="div-tit-product">
            <h1 class="how-tit1">Flexible pricing plan for your startup</h1>
            <h2 class="how-tit2">
              Pricing that scales with your business immediately.
            </h2>
          </div>
          <div class="row-product row ">
            {auctions.map((auction, index) => (
              <div key={auction.id} className="card">
                <h5 className="card-title">{auction.productName}</h5>
                <img
                  src={auction.imageUrl}
                  className="card-img-top"
                  alt="product"
                />
                <div className="but-regis">
                  <button className="but-register" onClick={() => goToDetails(auction.id)} >Register for auction</button>
                </div>
                <hr />
                <div className="card-body">
                  <ul className="ul-infor">
                    <li className="li-infor">
                      <InfoCircleOutlined /> Description:&nbsp; {auction.description}
                    </li>
                    <li className="li-infor">
                      <InfoCircleOutlined /> Starting price:&nbsp; {auction.startingPrice}
                    </li>
                    <li className="li-infor">

                      <InfoCircleOutlined /> Auction time:&nbsp; {new Date(auction.startTime).toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*================================================*/}

      <FooterAll />
    </>
  );
};
export default Home;
