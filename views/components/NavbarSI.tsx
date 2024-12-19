'use client'

import React from 'react';
import { Layout, Menu, Dropdown, Badge, Avatar } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import "@/views/style/NavbarSI.css";
import { BellOutlined, DollarOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const NavbarSI = () => {

  const avatarMenu = (
    <Menu>
      <Menu.Item key="setting" icon = {<SettingOutlined />}>
        <a href='/user/settings/Profile'>Settings</a>
      </Menu.Item>
      <Menu.Item key="logout" icon = {<LogoutOutlined />}>
        <a href='/user/settings/Profile'>Log Out</a>
      </Menu.Item>
    </Menu>
  )


  return (
    <Header className="header">
      <div className="logo">
         <img src="/CeLestial-wbg.png" alt="Logo" className="img-fluid" width="150" height="100" /> 
      </div>
      <Menu mode="horizontal" className="menu">
        <Menu.Item key="home">
          <Link href="/products">Product</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/Blogs/Technology">Blogs</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link href="/auctionresult">Auction results</Link>
        </Menu.Item>
      </Menu>

      <div className="navbar-inforUser">
        <Badge count={5} className="navbar-iconStyle">
          <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Badge>
        <div className="navbar-iconStyle">
          <DollarOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <span className="navbar-amountStyle">$100</span>
        </div>
        <Dropdown overlay={avatarMenu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} className="navbar-iconStyle" style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>

    </Header>
  );
}

export default NavbarSI;
