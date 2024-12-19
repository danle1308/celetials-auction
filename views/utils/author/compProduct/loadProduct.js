'use client';

import { getProductById } from '@/views/services/author/AuthorServices';
import { getAuction } from '@/views/services/AuctionServices';
import { message } from 'antd';


export const fetchProductData = async (setProducts) => {
    const authorId = localStorage.getItem("authorId");
    try {
        if (authorId) {
            const response = await getProductById(authorId);
            if (response && response.products) {
                const fetchedProducts = response.products.map((product) => {
                    const endTimeInSeconds = product.endTime;
                    const startTimeInMs = new Date(product.startTime).getTime();
                    const endTime = endTimeInSeconds * 1000;
                    return {
                        id: product.id,
                        name: product.productName,
                        image: product.imageUrl,
                        description: product.description,
                        price: product.startingPrice,
                        startTime: startTimeInMs,
                        endTime,
                    };
                });
                const auctionStatusData = await getAuction();
                const updatedProducts = fetchedProducts.map((product) => {
                    const productStatus = auctionStatusData.find(
                        (statusItem) =>
                            statusItem.productId === product.id || statusItem.id === product.id
                    );
                    const currentTime = Date.now();
                    let status = "";

                    if (currentTime < product.startTime) {
                        status = "The auction has not started yet";
                    } else if (currentTime >= product.startTime && currentTime < product.endTime) {
                        status = "The auction is ongoing";
                    } else {
                        status = "The auction is over";
                    }
                    return {
                        ...product,
                        status,
                    };
                });
                const sortedProducts = updatedProducts.sort((a, b) => b.id - a.id);
                setProducts(sortedProducts);
            } else {
              setProducts([]);
              return;
            }
        } 
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        return;
    }
};


export const updateProductStatus = (products, setProducts) => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const currentTime = Date.now();
          if (currentTime < product.startTime) {
            return {
              ...product,
              auctionTime: "Not started yet",
              status: "The auction has not started yet",
            };
          } else if (currentTime >= product.startTime && currentTime < product.endTime) {
            const remainingTime = Math.max(0, product.endTime - currentTime);
            return {
              ...product,
              auctionTime: `${Math.floor((remainingTime % 3600000) / 60000)}:${Math.floor(
                (remainingTime % 60000) / 1000
              )}`,
              status: "The auction is ongoing",
            };
          } else {
            return {
              ...product,
              auctionTime: "Out of time",
              status: "The auction is over",
            };
          }
        })
      );
    }, 1000);
  
    return () => clearInterval(interval);
  };