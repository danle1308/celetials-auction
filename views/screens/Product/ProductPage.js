'use client';

import React, { useState, useEffect } from 'react';
import { Pagination, Button, Menu, Dropdown, Select } from 'antd';
import Navbar from "@/views/components/Navbar";
import NavbarAfter from "@/views/components/NavbarAfter";
import { DownOutlined } from '@ant-design/icons';
import "@/views/style/Product.css";
import FooterAll from '@/views/components/Footer.js';
import { getAuction } from '@/views/services/AuctionServices';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noAuctions, setNoAuctions] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedProducts.slice(startIndex, endIndex);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Lấy các cuộc đấu giá chưa diễn ra hoặc đang diễn ra
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionData = await getAuction();
        if (auctionData && Array.isArray(auctionData) && auctionData.length > 0) {
          const currentTime = Math.floor(Date.now() / 1000);
          const validAuctions = auctionData.filter(auction => {
            if (!auction.endTime || isNaN(Number(auction.endTime))) {
              return false;
            }
            const auctionEndTime = Number(auction.endTime);
            const isValid = auctionEndTime >= currentTime;
            return isValid;
          });

          if (validAuctions.length > 0) {
            const reversedAuctionData = [...validAuctions].reverse();
            setSortedProducts(reversedAuctionData);
            setNoAuctions(false);
          } else {
            setSortedProducts([]);
            setNoAuctions(true);
          }
        } else {
          console.error("API không trả về dữ liệu hợp lệ.");
          setSortedProducts([]);
          setNoAuctions(true);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setNoAuctions(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  const handleMenuClick = (e) => {
    const key = e.key;
    const sorted = [...sortedProducts].sort((a, b) => {
      if (key === 'asc') {
        return a.productName.localeCompare(b.productName);
      } else if (key === 'desc') {
        return b.productName.localeCompare(a.productName);
      }
      return 0;
    });
    setSortedProducts(sorted);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="asc">Sort A-Z</Menu.Item>
      <Menu.Item key="desc">Sort Z-A</Menu.Item>
    </Menu>
  );

  const router = useRouter();

  //bỏ setLocal
  const handleRegisterClick = (auctionId) => {
    router.push(`/products/${auctionId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}

      <section className="product">
        <div className="show-product">
          <div className="tableGif">
            <div className="title-table">
              <p className="showing">
                Showing {startIndex + 1} - {Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} items
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown overlay={menu}>
                  <Button
                    style={{
                      background: 'white',
                      color: 'black',
                      borderRadius: '4px',
                      marginRight: '15px',
                      fontFamily: 'var(--space-grotesk-fonts)',
                    }}
                  >
                    Sort by <DownOutlined />
                  </Button>
                </Dropdown>
                <Select
                  defaultValue={16}
                  style={{
                    width: 120,
                    borderRadius: '4px',
                    borderColor: '#22C55E',
                    marginRight: '15px',
                    fontFamily: 'var(--space-grotesk-fonts)',
                  }}
                  onChange={handleItemsPerPageChange}
                >
                  <Option value={8}>8 per page</Option>
                  <Option value={16}>16 per page</Option>
                  <Option value={32}>32 per page</Option>
                  <Option value={64}>64 per page</Option>
                </Select>
              </div>
            </div>

            {noAuctions ? (
              <div className="no-auctions" style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
                There are no auctions
              </div>
            ) : (
              <>
                <div className="row" style={{ maxWidth: '93%', margin: '0 auto' }}>
                  {currentItems.map((item) => (
                    <div className="col-3" key={item.id} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                      <div className="card" style={{ width: '18rem', position: 'relative' }}>
                        <img alt={item.productName} src={item.imageUrl} className="card-img-top" />
                        <div className="card-body">
                          <h5 className="card-title">{item.productName}</h5>
                          <p className="card-text">{item.description}</p>
                          <p className="card-text">Price: {item.startingPrice}</p>
                          <p className="card-text">Start Time: {new Date(item.startTime).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}</p>
                          <button className="btn btn-success" onClick={() => handleRegisterClick(item.id)}>Register</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={sortedProducts.length}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <FooterAll />
    </>
  );
};

export default ProductPage;
