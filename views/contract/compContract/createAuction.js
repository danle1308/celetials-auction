// compContract/createAuction.js

import { message } from 'antd';

export const createAuction = async (bidContract, productName, description, imageUrl, startingPrice, duration) => {
  try {
    // Gọi hàm createAuction trên smart contract
    const tx = await bidContract.createAuction(productName, description, imageUrl, startingPrice, duration);
    
    await tx.wait();

    message.success('Auction created successfully!');
    console.log('Transaction details:', tx);
    return tx;
  } catch (error) {
    console.error("Failed to create auction:", error);
    message.error('Failed to create auction!');
  }
};
