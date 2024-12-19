'use client';

import { getRegisterAuction } from '@/views/services/user/ProfileServices';


export const fetchProductData = async (setRegisteredAuctions) => {
    const userId = localStorage.getItem('userId');
    try {
        if (userId) {
            const register = await getRegisterAuction(userId);
            if (register) {
                const mappedAuctions = register.map((auction) => {
                    const endTimeInSeconds = auction.endTime;
                    const startTimeInMs = new Date(auction.startTime).getTime();
                    const endTime = endTimeInSeconds * 1000;
                    return {
                        registrationId: auction.registrationId,
                        auctionIdLive: auction.id,
                        name: auction.productName,
                        auctionMinutes: Math.floor((auction.endTime - Date.now() / 1000) / 60),
                        price: auction.startingPrice,
                        startTime: startTimeInMs,
                        imageUrl: auction.imageUrl,
                        endTime,
                    }
                });
                const updatedProducts = mappedAuctions.map((auction) => {
                    const currentTime = Date.now();
                    let status = "";
                    if (currentTime < auction.startTime) {
                        status = "The auction has not started yet";
                    } else if (currentTime >= auction.startTime && currentTime < auction.endTime) {
                        status = "The auction is ongoing";
                    } else {
                        status = "The auction is over";
                    }
                    return {
                        ...auction,
                        status,
                    };
                });
                const reversedProducts = updatedProducts.reverse();
                setRegisteredAuctions(reversedProducts);
            } else {
                setRegisteredAuctions([]);
                return;
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        return;
    }
};


export const updateProductStatus = (registeredAuctions, setRegisteredAuctions) => {
    const interval = setInterval(() => {
        setRegisteredAuctions((prevProducts) =>
            prevProducts.map((auction) => {
                const currentTime = Date.now();
                if (currentTime < auction.startTime) {
                    return {
                        ...auction,
                        auctionTime: "Not started yet",
                        status: "The auction has not started yet",
                    };
                } else if (currentTime >= auction.startTime && currentTime < auction.endTime) {
                    const remainingTime = Math.max(0, auction.endTime - currentTime);
                    return {
                        ...auction,
                        auctionTime: `${Math.floor((remainingTime % 3600000) / 60000)}:${Math.floor(
                            (remainingTime % 60000) / 1000
                        )}`,
                        status: "The auction is ongoing",
                    };
                } else {
                    return {
                        ...auction,
                        auctionTime: "Out of time",
                        status: "The auction is over",
                    };
                }
            })
        );
    }, 1000);
    return () => clearInterval(interval);
};

export const fetchStatusProductData = async () => {
    const userId = localStorage.getItem('userId');
    try {
        if (userId) {
            const register = await getRegisterAuction(userId);
            if (register) {
                const mappedAuctions = register.map((auction) => {
                    const endTimeInSeconds = auction.endTime;
                    const startTimeInMs = new Date(auction.startTime).getTime();
                    const endTime = endTimeInSeconds * 1000;
                    return {
                        registrationId: auction.registrationId,
                        auctionIdLive: auction.id,
                        name: auction.productName,
                        auctionMinutes: Math.floor((auction.endTime - Date.now() / 1000) / 60),
                        price: auction.startingPrice,
                        startTime: startTimeInMs,
                        imageUrl: auction.imageUrl,
                        endTime,
                    }
                });
                const updatedProducts = mappedAuctions.map((auction) => {
                    const currentTime = Date.now();
                    let status = "";
                    if (currentTime < auction.startTime) {
                        status = "The auction has not started yet";
                    } else if (currentTime >= auction.startTime && currentTime < auction.endTime) {
                        status = "The auction is ongoing";
                    } else {
                        status = "The auction is over";
                    }
                    return {
                        ...auction,
                        status,
                    };
                });
                console.log('updatedProducts: ', updatedProducts);
                return updatedProducts
            } else {
                return;
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        return;
    }
};


export const getTotalAuctionRegis = async() => {
    const userId = localStorage.getItem('userId');
    try {
        if (userId) {
            const register = await getRegisterAuction(userId);
            if (!register) {
                return 0;
            } else if (register) {
                return register.length;
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải số lượng cuộc đấu giá đã đăng kí:", error);
    }
}

export const getAuctionForIcon = async (setListAuction) => {
    const userId = localStorage.getItem('userId');
    try {
        if (userId) {
            const register = await getRegisterAuction(userId);
            if (register) {
                const mappedAuctions = register.map((auction) => {
                    return {
                        registrationId: auction.registrationId,
                        auctionIdLive: auction.id,
                        name: auction.productName,
                        price: auction.startingPrice,
                        imageUrl: auction.imageUrl,
                        startTime: auction.startTime,
                    }
                });
                // console.log('mappedAuctions: ', mappedAuctions)
                const reversedProducts = mappedAuctions.reverse();
                setListAuction(reversedProducts);
            } else {
                setListAuction({});
                return;
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        return;
    }
};