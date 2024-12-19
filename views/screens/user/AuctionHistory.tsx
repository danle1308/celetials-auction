'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Input, Row, Table, type MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  AppstoreOutlined,
  BellOutlined,
  DollarOutlined,
  FileOutlined,
  HistoryOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import "@/views/style/auctionHistory.css";
import { Footer } from 'antd/es/layout/layout';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import NavbarSetting from '@/views/components/NavbarSetting';
import { getHistory } from '@/views/utils/getAuctionResult';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  href?: string,
): MenuItem {
  return {
    key,
    icon,
    label: <a href={href}>{label}</a>,
  } as MenuItem;
}

interface History {
  id: any;
  productname: string;
  description: string;
  highestBid: any;
}

const items: MenuItem[] = [
  getItem('Profile', 'profile', <AppstoreOutlined />, '/user/settings/Profile'),
  getItem('Auction History', 'auctionHistory', <HistoryOutlined />, '/user/settings/AuctionHistory'),
  getItem('Registered Auctions', 'myDocument', <FileOutlined />, '/user/settings/MyDocument'),
];


const AuctionHistory = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState('');
  const [historyData, setHistoryData] = useState<History[]>([]);

  useEffect(() => {
    getHistory(setHistoryData);
  }, [])

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      filteredValue: [searchTerm],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hammer Price",
      dataIndex: "highestBid",
      key: "highestBid",
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['auctionHistory']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <NavbarSetting />

        <Content className='contInfor' style={{ margin: '0 16px' }}>
          <div className='divTitle' style={{
            padding: 5,
            maxHeight: 60,
            background: colorBgContainer,
          }}>
            <h3 className='titFromDiv'>Auction History</h3>
          </div>

          <div className='dibInfor' style={{ padding: 15, minHeight: 485, background: colorBgContainer }}>
            <Row className='row1'>
              <div className='divSearch'>
                <div className='divFrom'>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Row>
            <Row className='row2'>
              <Col className='colRow2'>
                <Row className='rowProduct'>
                  <div className='divTable'>
                    <Col className='colTable'>
                      <Table
                        dataSource={historyData.filter(item =>
                          item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((item, index) => ({
                          key: index,
                          id: item.id,
                          productname: item.productName,
                          highestBid: item.highestBid,
                          description: item.description,
                        }))}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                      />
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AuctionHistory;