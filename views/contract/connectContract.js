import { ethers } from 'ethers';
import abiToken from '@/views/store/abiToken.json';
import abiBid from '@/views/store/abiBid.json';

// Địa chỉ smart contract
const contractAddress = '0x00E0DAd8665a5d70B3aAE546a9182186a3b94cCf';

// Hàm kết nối MetaMask và smart contract
export const connectContract = async (signer) => {
    try {
      const bidContract = new ethers.Contract(contractAddress, abiBid, signer);
      const tokenContract = new ethers.Contract(contractAddress, abiToken, signer);
  
      console.log("Smart contract connected:", bidContract, tokenContract);
      
      return { bidContract, tokenContract };
    } catch (error) {
      console.error("Failed to connect to smart contract:", error);
    }
  };
