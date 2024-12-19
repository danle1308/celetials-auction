'use client';

import { ethers } from 'ethers';
import { message } from 'antd';
import { editInforById } from '@/views/services/user/ProfileServices';
import { connectContract } from '@/views/contract/connectContract';


let isRequestingAccounts = false; // Biến cờ để theo dõi trạng thái yêu cầu

export const connect = async () => {
  if (!window.ethereum) {
    message.error('MetaMask is not installed!');
    return null;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Thông tin về mạng Holesky
    const holeskyNetwork = {
      chainId: '0x4268',
      chainName: 'Holesky Test Network',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://1rpc.io/holesky'],
      blockExplorerUrls: ['https://holesky.beaconcha.in/'],
    };

    // Kiểm tra và thêm mạng Holesky nếu cần
    const { chainId } = await provider.getNetwork();
    if (Number(chainId) !== parseInt(holeskyNetwork.chainId, 16)) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [holeskyNetwork],
      });
    }

    // Yêu cầu quyền truy cập tài khoản
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    // Lấy vai trò từ localStorage
    const role = localStorage.getItem('role');
    if (role === 'user') {
      localStorage.setItem('userAddress', walletAddress);
    } else if (role === 'author') {
      localStorage.setItem('authorAddress', walletAddress);
    }

    // Lấy số dư ví
    const balance = await provider.getBalance(walletAddress);
    const formattedBalance = parseFloat(ethers.formatEther(balance)).toFixed(3);

    return { walletAddress, formattedBalance, signer };
  } catch (error) {
    if (error.code === -32002) {
      message.warning('MetaMask is already processing a request. Please complete the previous action.');
    } else if (error.code === 4001) {
      message.error('User rejected the request.');
    } else {
      console.error('Failed to connect wallet:', error);
    }
    return null;
  }
};


export const connectWallet = async () => {
  // Kết nối ví
  const connection = await connect();
  if (!connection) {
    message.warning('Please enter your Metamask wallet password before Connecting!');
    return;
  }
  const { walletAddress, formattedBalance, signer } = connection;
  const role = localStorage.getItem('role');
  // Lưu thông tin vào localStorage
  if (role == 'user') {
    localStorage.setItem('userAddress', walletAddress);
  } else if (role == 'author') {
    localStorage.setItem('authorAddress', walletAddress);
  };
  // Lấy địa chỉ ví từ kết nối
  return walletAddress;
};