'use client'

import { ethers } from 'ethers';


export const handleApprove = async() => {
    try {
        let userAddress = localStorage.getItem('userAddress');
        if (!userAddress) {
          alert("Please connect wallet");
          if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
          }
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          userAddress = localStorage.getItem('userAddress');
          if (!userAddress) {
            return;
          }
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
  
        const tokenAddress = process.env.NEXT_PUBLIC_Contract_Token;
        const spenderAddress = process.env.NEXT_PUBLIC_Contract_Auction;
        const approveAmount = ethers.parseUnits("10", 18);

        const gasPrice = ethers.parseUnits("3", "gwei"); //gốc là 300
  
        const tokenABI = [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ];

        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
        // console.log("Hợp đồng token đã được tạo:", tokenContract);
  
        const transaction = await tokenContract.approve(spenderAddress, approveAmount, {gasPrice: gasPrice});
        // console.log("Đang thực hiện approve, đợi xác nhận giao dịch...");
        await transaction.wait();
        // console.log("Giao dịch approve hoàn tất:", transaction);
        alert("Approve successful!");
  
      } catch (error) {
        console.error("Lỗi khi thực hiện approve:", error);
        alert("An error occurred while performing approve");
      }
}