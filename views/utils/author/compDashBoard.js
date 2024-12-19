'use client'

import { getProductById } from '@/views/services/author/AuthorServices';
import { showAuctionResult, showAuctionHistory } from '@/views/services/AuctionServices';


const authorId = localStorage.getItem("authorId");


export const getPriceOfAuction = async () => {
    try {
        if (authorId) {
            const auctionsAuthor = await getProductById(authorId);
            const auctionsAuthorData = auctionsAuthor.products;

            const auctionsResult = await showAuctionResult();
            const auctionsResultData = auctionsResult.data;

            const finishedAuctions = auctionsResultData.filter(resultAuction =>
                auctionsAuthorData.some(authorAuction => authorAuction.id === resultAuction.auctionId)
            );

            const auctionPriceData = finishedAuctions.map(auction => ({
                highestBid: auction.highestBid,
                endTime: new Date(auction.endTime * 1000),
            }));

            const monthlyRevenue = Array(12).fill(0);
            auctionPriceData.forEach(({ highestBid, endTime }) => {
                const month = endTime.getMonth();
                monthlyRevenue[month] += highestBid;
            });
            return monthlyRevenue;
        }

    } catch (error) {
        console.error("Error fetching auction data:", error);
        return Array(12).fill(0);
    }
};

