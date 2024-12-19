'use client';

import React, { useEffect, useState } from "react";
import { Col, DatePicker, Row, Space, Button, Collapse, Table, Input } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import "@/views/style/AuctionResult.css";
import { CaretRightOutlined } from '@ant-design/icons';
import FooterAll from "../components/Footer";
import NavbarAfter from "../components/NavbarAfter";
import { getAuctionResult, handleSearch } from '@/views/utils/getAuctionResult';

// Định nghĩa kiểu dữ liệu
type AuctionItem = {
  productName: string;
  winnerFullName: string;
  highestBid: number;
  endTime: number;
};

const AuctionResults: React.FC = () => {
  const [allAuctionData, setAllAuctionData] = useState<[string, AuctionItem[]][]>([]);
  const [auctionData, setAuctionData] = useState<[string, AuctionItem[]][]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const onChangeStart = (date: moment.Moment | null) => {
    setFromDate(date ? date.format("DD-MM-YYYY") : null);
  };

  const onChangeEnd = (date: moment.Moment | null) => {
    setToDate(date ? date.format("DD-MM-YYYY") : null);
  };

  //xử lí khi nhấn nút search
  const putSearch = () => {
    handleSearch(fromDate, toDate, allAuctionData, setAuctionData);
  }

  //lấy danh sách các cuộc đấu giá kết thúc
  useEffect(() => {
    getAuctionResult(setAllAuctionData, setAuctionData);
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

  // Cấu hình bảng
  const columns = [
    {
      title: "Product's Name",
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: "Winner's Name",
      dataIndex: 'winnerFullName',
      key: 'winnerFullName',
    },
    {
      title: 'Winning auction price',
      dataIndex: `highestBid`,
      key: 'highestBid',
    },
  ];

  return (
    <>
      {isLoggedIn ? <NavbarAfter /> : <Navbar />}
      <section className='auction-result'>
        <div className="container py-5">
          <h1 className="titleStyle">Auction Results</h1>

          <div className="rowStyle">
            <Row gutter={[32, 32]}>
              <Col className="colStyle" span={6}>
                <Space direction="vertical">
                  <DatePicker
                    onChange={onChangeStart}
                    placeholder='From'
                    format="DD-MM-YYYY"
                    className="datePickerStyle"
                  />
                </Space>
              </Col>
              <Col className="colStyle" span={6}>
                <Space direction="vertical">
                  <DatePicker
                    onChange={onChangeEnd}
                    placeholder='To'
                    format="DD-MM-YYYY"
                    className="datePickerStyle"
                  />
                </Space>
              </Col>
              <Col className="colStyle" span={6}>
                <Input placeholder="Product's Name" className="datePickerStyle" />
              </Col>
              <Col className="colStyle" span={6}>
                <Button type="text" className="buttonStyle" onClick={putSearch}>Search</Button>
              </Col>
            </Row>
          </div>

          {auctionData.length > 0 ? (
            auctionData.map(([date, items], index) => (
              <Collapse
                key={index}
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ marginBottom: 24, background: '#f5f5f5', borderRadius: 6 }}
              >
                <Collapse.Panel header={`Auction results on ${date}`} key={index}>
                  <Table
                    columns={columns}
                    dataSource={items.map((item, idx) => ({
                      key: idx,
                      ...item,
                    }))}
                    pagination={false}
                  />
                </Collapse.Panel>
              </Collapse>
            ))
          ) : (
            <p className="no-Auctions" style={{ textAlign: "center", marginTop: 20}}>No auction results found.</p>
          )}
        </div>
      </section>
      <FooterAll />
    </>
  );
};

export default AuctionResults;
