'use client';

import React, { useEffect, useState } from "react";
import { showAuctionResult, showAuctionHistory } from '@/views/services/AuctionServices';

type AuctionItem = {
  productName: string;
  winnerFullName: string;
  highestBid: number;
  endTime: number;
};

type AuctionGroupedData = {
  [date: string]: AuctionItem[];
};

export const getAuctionResult = async (setAllAuctionData: { (value: React.SetStateAction<[string, { productName: string; winnerFullName: string; highestBid: number; endTime: number; }[]][]>): void; (arg0: [string, AuctionItem[]][]): void; }, setAuctionData: { (value: React.SetStateAction<[string, { productName: string; winnerFullName: string; highestBid: number; endTime: number; }[]][]>): void; (arg0: [string, AuctionItem[]][]): void; }) => {
  const response = await showAuctionResult();
  if (response.success == true) {
    const groupedData: AuctionGroupedData = response.data.reduce((acc: AuctionGroupedData, item: AuctionItem) => {
      const auctionEndDate = new Date(item.endTime * 1000).toLocaleDateString("en-GB").replace(/\//g, "-");
      if (!acc[auctionEndDate]) {
        acc[auctionEndDate] = [];
      }
      acc[auctionEndDate].push(item);
      return acc;
    }, {});
    const sortedData = Object.entries(groupedData).reverse();
    setAllAuctionData(sortedData);
    setAuctionData(sortedData);
  } else if (response.success == false) {
    setAllAuctionData([]);
    setAuctionData([]);
    return;
  }
};

export const handleSearch = (
  fromDate: string | null,
  toDate: string | null,
  allAuctionData: [string, any[]][],
  setAuctionData: { (value: React.SetStateAction<[string, { productName: string; winnerFullName: string; highestBid: number; endTime: number; }[]][]>): void; (arg0: [string, AuctionItem[]][]): void; }
) => {
  const currentTimestamp = new Date().getTime();

  // Trường hợp 1: Người dùng chọn đủ 2 mốc thời gian from và to
  if (fromDate && toDate) {
    const fromTimestamp = new Date(fromDate.split("-").reverse().join("-")).getTime();
    const toTimestamp = new Date(toDate.split("-").reverse().join("-")).getTime();
    const filteredData = allAuctionData.filter(([date, items]) => {
      const currentDate = new Date(date.split("-").reverse().join("-")).getTime();
      return currentDate >= fromTimestamp && currentDate <= toTimestamp;
    });
    setAuctionData(filteredData);
    return;
  }

  // Trường hợp 2: Người dùng chọn 1 mốc thời gian from nhưng không chọn to
  if (fromDate && !toDate) {
    const fromTimestamp = new Date(fromDate.split("-").reverse().join("-")).getTime();
    const toTimestamp = currentTimestamp;
    const filteredData = allAuctionData.filter(([date, items]) => {
      const currentDate = new Date(date.split("-").reverse().join("-")).getTime();
      return currentDate >= fromTimestamp && currentDate <= toTimestamp;
    });
    setAuctionData(filteredData);
    return;
  }

  // Trường hợp 3: Người dùng chọn 1 mốc thời gian to nhưng không chọn from
  if (!fromDate && toDate) {
    const toTimestamp = new Date(toDate.split("-").reverse().join("-")).getTime();
    const fromTimestamp = 0;
    const filteredData = allAuctionData.filter(([date, items]) => {
      const currentDate = new Date(date.split("-").reverse().join("-")).getTime();
      return currentDate >= fromTimestamp && currentDate <= toTimestamp;
    });
    setAuctionData(filteredData);
    return;
  }

  // Trường hợp 4: Người dùng không chọn 2 mốc thời gian from và to
  setAuctionData(allAuctionData);
};

const role = localStorage.getItem('role');

export const getHistory = async(setHistoryData) => {
  if (role == 'user') {
    const userId = localStorage.getItem('userId');
    try {
      const response = await showAuctionHistory(userId);
      if (response.errorCode == 0) {
        const auctionHistoryData = response.data.reverse();

        setHistoryData(auctionHistoryData);
        return;
      } else if (response.errorCode == 1) {
        setHistoryData({});
        return;
      }
    } catch (error) {
      console.log('response: ', error);
    }
  } else {
    return;
  }
}