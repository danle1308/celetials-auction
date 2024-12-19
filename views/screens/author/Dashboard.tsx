'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, Form, Input, Row, type MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  BarChartOutlined,
  BellOutlined,
  DollarOutlined,
  ProductOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "@/views/style/DashboardAuthor.css";
import { Footer } from 'antd/es/layout/layout';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import NavbarSetting from '@/views/components/NavbarSetting';
import { getPriceOfAuction } from '@/views/utils/author/compDashBoard'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

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

const items: MenuItem[] = [
  getItem('Dashboard', 'dashboard', <BarChartOutlined />, '/author/settings/DashboardAuthor'),
  getItem('Product', 'product', <ProductOutlined />, '/author/settings/ProductAuthor'),
  getItem('Profile', 'profile', <UserOutlined />, '/author/settings/ProfileAuthor'),
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchAuctionData = async () => {
    const revenue = await getPriceOfAuction();
    if (revenue && Array.isArray(revenue)) {
      setMonthlyRevenue(revenue);
      const total = revenue.reduce((sum, value) => sum + value, 0);
      setTotalRevenue(total);
    } else {
      setMonthlyRevenue(Array(12).fill(0));
      setTotalRevenue(0);
    }
  };

  useEffect(() => {
    fetchAuctionData();
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <NavbarSetting />
        <Content className='contInfor' style={{ margin: '0 16px' }}>
          <div className='divTitle' style={{
            padding: 5,
            maxHeight: 60,
            background: colorBgContainer,
          }}>
            <h3 className='titFromDiv'>Dashboard</h3>
          </div>
          <div className='divInfor' style={{ padding: 15, minHeight: 485, background: colorBgContainer }}>
            <Row style={{ height: '500px' }}>
              <Col className="colWithBorderEffect1" span={19}>
                <Row style={{ marginBottom: '20px' }}>
                  <div style={{ width: '95%' }}>
                    <Bar
                      data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                          {
                            label: "Monthly Revenue",
                            backgroundColor: ["#1ae5de", "#228ec7", "#3dc93b", "#f39c12", "#8e44ad", "#e74c3c"],
                            data: monthlyRevenue,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: { display: false },
                          title: {
                            display: true,
                            text: "Monthly revenue",
                          },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      height={400}
                      width={'100%'}
                    />
                  </div>
                </Row>
              </Col>
              <Col className="colWithBorderEffect" span={5}>
                <div>
                  <div className="totalText">Total revenue of the month:</div>
                  <div className="totalAmount">${totalRevenue.toLocaleString()}</div>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
