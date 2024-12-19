'use client'

import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Row, Table, Image, Modal, message, MenuProps, Tooltip } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { AppstoreOutlined, FileOutlined, HistoryOutlined, SearchOutlined } from '@ant-design/icons';
import "@/views/style/MyDocument.css";
import NavbarSetting from '@/views/components/NavbarSetting';
import { handleDeleteRegis } from '@/views/utils/user/compMyDocument/compDeleteRegis';
import { handleApprove } from '@/views/utils/user/compMyDocument/compApprove';
import { handleJoinLiveAuction, checkIsJoin } from '@/views/utils/user/compMyDocument/compJoinAuction';
import moment from 'moment';
import { fetchProductData, updateProductStatus, fetchStatusProductData } from '@/views/utils/user/compMyDocument/compGetAuctions'
import { checkAllowance } from '@/views/services/user/ProfileServices';

const { Content, Sider } = Layout;

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

interface Product {
  name: any;
  startTime: number;
  endTime: number;
  id: any;
  productname: string;
  image: string;
  description: string;
  price: string;
  auctionTime: any;
  status: 'The auction has not started yet' | 'The auction is ongoing' | 'The auction is over';
}

const items = [
  getItem('Profile', 'profile', <AppstoreOutlined />, '/user/settings/Profile'),
  getItem('Auction History', 'auctionHistory', <HistoryOutlined />, '/user/settings/AuctionHistory'),
  getItem('Registered Auctions', 'myDocument', <FileOutlined />, '/user/settings/MyDocument'),
];

const MyDocument = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [registeredAuctions, setRegisteredAuctions] = useState<Product[]>([]);
  const [deletingRegisId, setDeletingRegisId] = useState<number | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCanJoin, setIsCanJoin] = useState(0);

  const loadData = async () => {
    await fetchProductData(setRegisteredAuctions);
    updateProductStatus(registeredAuctions, setRegisteredAuctions);
  }

  useEffect(() => {
    loadData();
    checkIsJoin(setIsCanJoin);
  }, [])


  useEffect(() => {
    console.log('registeredAuctions: ', registeredAuctions);
  }, [])

  //hàm xử lí khi nhấn tên sản phẩm
  const handleNavigateToDetail = async (auctionIdLive: number) => {
    window.location.href = `/products/${auctionIdLive}`
  };

  const handleDelete = (id: number) => {
    setDeletingRegisId(id);
    setConfirmDeleteVisible(true);
  };

  const confirmDeleteProduct = async () => {
    if (deletingRegisId !== null) {
      await handleDeleteRegis(deletingRegisId, setRegisteredAuctions);
      loadData();
      setDeletingRegisId(null);
      setConfirmDeleteVisible(false);
    }
  };

  const handleApproveAuction = async () => {
    await handleApprove();
    setIsCanJoin(0);
  }

  //tham gia đấu giá
  const JoinAuction = async (auctionIdLive: any, registrationId: any, status: string) => {
    const getStatus = await fetchStatusProductData();
    const auction = getStatus.find(
      (item: any) => item.auctionIdLive === auctionIdLive
    );
    if (auction) {
      if (auction.status === 'The auction is over') {
        message.warning(`The auction is over, you can't enter to view it`);
        return;
      }
      if (auction.status === 'The auction has not started yet') {
        message.warning(`The auction has not started yet, please wait`);
        return;
      }
    } else {
      message.error('The auction does not exist in your registration list');
      return;
    }
    await handleJoinLiveAuction(auctionIdLive, registrationId)
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchTerm],
      onFilter: (value: any, record: Product) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      render: (name: string, record: Product) => (
        <span
          className='name-product'
          style={{ color: 'blue', cursor: 'pointer', }}
          onClick={() => handleNavigateToDetail(record.auctionIdLive)}
        >
          {name}
        </span>
      ),
    },
    {
      title: 'GIF',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string | undefined) => <Image width={100} src={imageUrl} alt="Product" />,
    },
    {
      title: 'Starting Price',
      dataIndex: 'price',
      key: 'price',
      className: 'startPrice-table',
    },
    {
      title: 'Auction Time',
      dataIndex: 'auctionTime',
      key: 'auctionTime',
      className: 'auctionTime-table',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'status-table',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      className: 'startTime-table',
      key: 'startTime',
      render: (startTime: number) => (
        startTime ? moment(startTime).format('YYYY-MM-DD HH:mm:ss') : 'Không có dữ liệu'
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: { key: any, auctionIdLive: any, registrationId: any }) => (
        <div className='but-join-delete' key={record.registrationId}>
          <Button className='but-join' disabled={isCanJoin == 1} onClick={() => JoinAuction(record.auctionIdLive, record.registrationId)}>Join</Button>
          <Button className='but-delete' danger onClick={() => handleDelete(record.registrationId)}>Unsubscribe </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['myDocument']} mode="inline" items={items} />
      </Sider>
      <Layout>

        <NavbarSetting />

        <Content className='contInfor' style={{ margin: '0 16px' }}>
          <div className='divTitle' style={{
            padding: 5,
            maxHeight: 60,
            background: colorBgContainer,
          }}>
            <h3 className='titFromDiv'>Registered Auctions</h3>
          </div>
          <div className='divInfor' style={{ padding: 15, minHeight: 485, background: colorBgContainer }}>
            <Row className='row1'>
              <div className='div-approve'>
                <Button className='but-approve' type="primary" onClick={() => handleApproveAuction()}>Approve</Button>
              </div>
              <div className='divSearch'>
                <div className='productName' >
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
                        dataSource={registeredAuctions.filter(auction =>
                          auction.name && auction.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )}
                        rowKey='registrationId'
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                      />
                    </Col>
                  </div>
                </Row>
              </Col>
            </Row>
            <Modal
              title="Confirm Delete"
              visible={confirmDeleteVisible}
              onCancel={() => setConfirmDeleteVisible(false)}
              onOk={confirmDeleteProduct}
              okText="Yes"
              cancelText="No"
            >
              <p>Are you sure you want to unsubscribe this auction?</p>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default MyDocument;
