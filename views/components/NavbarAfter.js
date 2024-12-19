'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Layout, Dropdown, message, Badge, Card, Row, Col } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/views/style/components/NavbarAfter.css";
import { getBalace } from '@/views/services/user/ProfileServices';
import { connect } from '@/views/utils/connectWallet';
import { ProductOutlined } from '@ant-design/icons';
import { useSignal } from '@/views/store/context/SignalContext';
import { getTotalAuctionRegis, getAuctionForIcon } from '@/views/utils/user/compMyDocument/compGetAuctions'


const { Header } = Layout;

const NavbarAfter = () => {
    const [balance, setBalance] = useState('0');
    const { cartSignal } = useSignal();
    const [count, setCount] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [zooming, setZooming] = useState(false);
    const [listAuction, setListAuction] = useState({});

    //lấy số lượng cuộc đấu giá đã đăng kí
    const getTotal = async () => {
        const totalAuctionRegis = await getTotalAuctionRegis();
        setCount(totalAuctionRegis);
    }

    useEffect(() => {
        getAuctionForIcon(setListAuction);
        getTotal();
    }, [])

    //chạy hiệu ứng
    useEffect(() => {
        if (cartSignal) {
            setAnimating(true);
            setZooming(true);
            getTotal();
            getAuctionForIcon(setListAuction);
        }
        const timer = setTimeout(() => {
            setAnimating(false);
            setZooming(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [cartSignal]);



    const userMenu = (
        <div className="login-dropdown">
            <button
                onClick={(e) => {
                    if (role == 'user') {
                        e.preventDefault();
                        window.location.href = '/user/settings/Profile';
                    } else {
                        e.preventDefault();
                        window.location.href = '/author/settings/ProfileAuthor';
                    }

                }}
            >
                Edit Profile
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    localStorage.clear();
                    window.location.href = '/user/signin';
                }}
            >
                Logout
            </button>
        </div>
    );

    const goToDoc = () => {
        window.location.href = '/user/settings/MyDocument';
    };

    const loginMenu = (
        <div className='over'>
            <div className="auctions-dropdown">
                {Array.isArray(listAuction) && listAuction.length > 0 ? (
                    listAuction.map((auction) => (
                        <Card
                            className='card-fromIcon'
                            key={auction.registrationId}
                            size="small"
                            title={auction.name}
                            style={{ width: 300, marginBottom: 16 }}
                        >
                            <Row gutter={16}>
                                <Col span={8}>
                                    <img
                                        src={auction.imageUrl}
                                        alt={auction.name}
                                        style={{
                                            width: '100%',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </Col>
                                <Col span={16} style={{ gap: '10px' }}>
                                    <div className='price-icon' style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                                        <p>Price: </p>
                                        <p style={{ color: '#22C55E', fontWeight: 'bold', marginBottom: 8 }}>
                                            {auction.price} $
                                        </p>
                                    </div>
                                    <div className='time-icon' style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                                        <p>Start Time: </p>
                                        <p style={{ color: '#888888', marginBottom: 0 }}>
                                            {new Date(auction.startTime).toLocaleString('vi-VN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    ))
                ) : (
                    <p className='no-auctions' style={{ textAlign: 'center', color: '#888888' }}>No auctions registered</p>
                )}
            </div>
            <button className='view-all' onClick={goToDoc}>View All</button>
        </div>

    );

    const goToProducts = () => {
        window.location.href = '/author/settings/ProductAuthor';
    };

    const checkLogin = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const getAddress = await connect();
                if (!getAddress) {
                    return;
                }
                const address1 = getAddress.walletAddress;
                if (!address1) {
                    return;
                }
                const responseBalanceUser = await getBalace(address1);
                if (!responseBalanceUser) {
                    console.error('Failed to fetch balance. Exiting...');
                    return;
                }
                const balanceUser = responseBalanceUser.balanceOf;
                setBalance(balanceUser);
            } else {
                console.log('No accessToken found');
            }
        } catch (error) {
            console.error('Error during checkLogin:', error);
        }
    };
    const role = localStorage.getItem('role');

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container d-flex justify-content-between align-items-center">

                <div className="logo">
                    <a> <img src='/CeLestial.png' alt="logo"></img> </a>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/products">Product</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Blogs/Technology">Blogs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/auctionresult">Auction results</a>
                        </li>
                    </ul>
                    <div className="infor-user">
                        {role == 'user' ? (
                            <div className='row row-infor'>
                                <Dropdown overlay={loginMenu} trigger={['hover']}>
                                    <div className={`col-4 cart ${animating ? 'animate-cart' : ''}`} onClick={goToDoc}>
                                        <a>
                                            <Badge
                                                count={count}
                                                showZero
                                                style={{
                                                    backgroundColor: '#22C55E',
                                                    color: 'white',
                                                    position: 'absolute',
                                                    top: '-11px',
                                                    right: '31px',
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    className={`bi bi-cart ${zooming ? 'zoomed' : ''}`}
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                </svg>
                                            </Badge>
                                        </a>
                                    </div>
                                </Dropdown>
                                <div className='col-4 money'>
                                    <div className='icon-money'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                                        </svg>
                                    </div>
                                    <div className='show-total'>
                                        <h3 className='total'>{balance}</h3>
                                    </div>
                                </div>
                                <div className='col-4 user'>
                                    <Dropdown overlay={userMenu} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                            </svg>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                        ) : (
                            <div className='row row-infor'>
                                <div className='col-4 cart'>
                                    <a onClick={e => goToProducts()}>
                                        <ProductOutlined />
                                    </a>
                                </div>
                                <div className='col-4 money'>
                                    <div className='icon-money'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                                        </svg>
                                    </div>
                                    <div className='show-total'>
                                        <h3 className='total'>{balance}</h3>
                                    </div>
                                </div>
                                <div className='col-4 user'>
                                    <Dropdown overlay={userMenu} trigger={['click']}>
                                        <a onClick={e => e.preventDefault()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                            </svg>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarAfter;
