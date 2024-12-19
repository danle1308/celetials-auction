'use client'

import React, { useState } from 'react'
import { Avatar, Button, Card, Col, Row,  type MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import {
  AppstoreOutlined,
  BellOutlined,
  DollarOutlined,
  FileOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  } from '@ant-design/icons';
import "@/views/style/ListCart.css";
import { Footer } from 'antd/es/layout/layout';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';



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
    getItem('Profile', 'profile', <AppstoreOutlined />, '/user/settings/Profile'),
    getItem('Cart', 'cart', <ShoppingCartOutlined />, '/user/settings/Cart'),
    getItem('Auction History', 'auctionHistory', <HistoryOutlined />, '/user/settings/AuctionHistory'),
    getItem('My Document', 'myDocument', <FileOutlined />, '/user/settings/MyDocument'),
  ];

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
  ];

const Cart = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer }} = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical"  />
        <Menu theme="dark" defaultSelectedKeys={['cart']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className='headerInfor'>
            <Row className='row'>
                <Col className='col1' span={12}>
                    <div className='name'><p>Hello, DanLe</p></div>
                    <div className='date'><p>Tue, 29 July 2024</p></div>
                </Col>
            <Col className='col2' span={12}>
                <Row className='headerRight'>
                    <div className='iconBell'><BellOutlined style={{color: 'grey'}}/></div>
                    <div className='iconDollar'><DollarOutlined style={{color: 'grey'}}/>
                        <div className='showTotalMoney'>:</div>
                    </div>
                    <div className='avt1'><Avatar shape="square" style={{color: 'grey', background: 'white'}} size={40} icon={<UserOutlined />} /></div>
              </Row>
            </Col>

            </Row>
        </Header>

        <Content className='contInfor' style={{ margin: '0 16px' }}>
            <div className='divTitle' style={{
                padding: 5,
                maxHeight: 60,
                background: colorBgContainer,
                }}><h3>Cart</h3>
            </div>

          <div className='divInfor' style={{padding: 15, minHeight: 485, background: colorBgContainer}}>
            <Row className='row1'>
                <div className='divButton'>
                    <Button className='butUnpaid' type='text'>Unpaid</Button>
                    <Button className='butPaid' type='text'>Paid</Button>
                    <Button className='butRefunded' type='text'>Refunded</Button>
                </div>
            </Row>

            <Row className='row2'>
                <Col className='colRow2'>

                  <Row className='rowProduct'>

                    <div className='divCard'>
                    <Card className='card'>
                      <Row className='rowCard'>
                        <Col className='colDetail' span={22} push={2}>
                          <div className='divDescription'>
                            <Card.Meta title='Product Name' description = {
                              <div>
                                <span className='spanPrice'>Starting Price: 100$</span>
                              </div>
                            }/>
                            <Button className='butDetail' type='text'>Detail</Button>
                          </div>
                        </Col>
                        <Col className='colGif' span={2} pull={22}>
                          <Card.Meta avatar={<Avatar shape='square' src="/gif-ne-2.gif" className="avatar" />} />
                        </Col>
                      </Row>
                    </Card>
                    </div>

                    <div className='divCard'>
                    <Card className='card'>
                      <Row className='rowCard'>
                        <Col className='colDetail' span={22} push={2}>
                          <div className='divDescription'>
                            <Card.Meta title='Product Name' description = {
                              <div>
                                <span className='spanPrice'>Starting Price: 100$</span>
                              </div>
                            }/>
                            <Button className='butDetail' type='text'>Detail</Button>
                          </div>
                        </Col>
                        <Col className='colGif' span={2} pull={22}>
                          <Card.Meta avatar={<Avatar shape='square' src="/gif-6-LINE FRIENDS.gif" className="avatar" />} />
                        </Col>
                      </Row>
                    </Card>
                    </div>

                    <div className='divCard'>
                    <Card className='card'>
                      <Row className='rowCard'>
                        <Col className='colDetail' span={22} push={2}>
                          <div className='divDescription'>
                            <Card.Meta title='Product Name' description = {
                              <div>
                                <span className='spanPrice'>Starting Price: 100$</span>
                              </div>
                            }/>
                            <Button className='butDetail' type='text'>Detail</Button>
                          </div>
                        </Col>
                        <Col className='colGif' span={2} pull={22}>
                          <Card.Meta avatar={<Avatar shape='square' src="/gif-ne-3.gif" className="avatar" />} />
                        </Col>
                      </Row>
                    </Card>
                    </div>

                  </Row>

                </Col>
            </Row>
          </div>
        </Content>

        <Footer>
        </Footer>
      </Layout>
    </Layout>
    )
}

export default Cart;