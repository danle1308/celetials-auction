'use client'

import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/views/style/Navbar.css";

const { Header } = Layout;

const Navbar = () => {

  const loginMenu = (
    <div className="login-dropdown">
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/user/signin';
        }}
      >
        Login for User
      </button>
    </div>
  );

  const signupMenu = (
    <div className="login-dropdown">
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/user/signup';
        }}
      >
        Sign Up for User
      </button>
    </div>
  );

  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container d-flex justify-content-between align-items-center">
        
        <div class="logo">
          <a> <img src='/CeLestial.png'></img> </a>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto" >
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/products">Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Blogs/Technology">Blogs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/auctionresult">Auction results</a>
            </li>
          </ul>

          <div class="button">
            <Dropdown overlay={loginMenu} trigger={['hover']}>
              <a className="login"  href='/user/signin'>
                Login
              </a>
            </Dropdown>

            <Dropdown overlay={signupMenu} trigger={['hover']}>
              <button className="signup" href=''>
                Sign Up
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
