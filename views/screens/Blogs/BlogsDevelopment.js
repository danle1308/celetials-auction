'use client'

import React from "react";
import BlogsTitle from "@/views/components/BlogsTitle";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import "@/views/style/Blogs.css";


const BlogsDevelopment = () => {
    return(
        <div>
        <BlogsTitle />
        <div style={{ padding: '30px 150px' }}>
            <Row gutter={[70, 40]} justify="center">
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/robot-cua-google-tu-hoc-di-trong-moi-truong-thuc-4064581.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image17.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px' }}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Google's robot learns to walk in real environment" 
                        description="Rainbow Dash can walk on a variety of surfaces such as foam mattresses or rugs with random kinks." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/cam-bien-phat-hien-muc-do-cang-thang-cua-co-the-4061694.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image18.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Sensor detects body stress level" 
                        description="The device will detect changes in cortisol levels that affect anxiety, post-traumatic stress disorder and depression." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/tan-dung-co2-de-tai-che-pin-4044922.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image20.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Utilizing CO2 to recycle batteries" 
                        description="CARBON dioxide could be used to extract useful metals for recycling instead of just being buried underground. " />
                    </Card>
                    </a>
                </Col>
                


                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/google-dung-tri-tue-nhan-tao-bao-ve-ca-voi-4047546.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image19.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Google uses artificial intelligence to protect whales" 
                        description="Google is developing a way to use artificial intelligence to track whales in an effort to protect the endangered species." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/ai-du-bao-thoi-tiet-chinh-xac-thoi-gian-thuc-4044417.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image21.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' ,height : '390px' }}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="AI Real-Time Accurate Weather Forecast" 
                        description="Google's AI system accurately predicts rainfall 6 hours before it occurs, with an accuracy of up to 1 km and a delay of only a few minutes." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://vnexpress.net/viet-nam-xay-dung-thanh-cong-phan-mem-doc-benh-qua-anh-x-quang-3962804.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image22.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Vietnam successfully builds software to read diseases through X-ray images" 
                        description="The Big Data Institute research team built a trial version of software that automatically diagnoses diseases based on input data of X-ray images, with up to 90% accuracy." />
                    </Card>
                </a>
                </Col>

            </Row>
        </div>
    </div>
    )
}
export default BlogsDevelopment;