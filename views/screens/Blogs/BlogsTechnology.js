'use client'

import { Card, Col, Input, Menu, Row } from "antd";
import React from "react";
const { SubMenu } = Menu;
import "@/views/style/Blogs.css";
import Meta from "antd/es/card/Meta";
import BlogsTitle from "../../components/BlogsTitle";

const { Search } = Input;

const BlogsTechnology = () => {
    return (
    <div>
        <BlogsTitle />
        <div style={{ padding: '30px 150px' }}>
            <Row gutter={[70, 40]} justify="center">
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://znews.vn/cap-quang-truyen-dan-internet-nhanh-nhat-the-gioi-post1488806.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image11.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px' }}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Fiber optic cable transmits the fastest Internet in the world" 
                        description="The new record for data transmission speed via fiber optic cable is 402 Tb/s, about 1.6 million times higher than normal home broadband speed." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://tuoitre.vn/su-co-crowdstrike-phoi-bay-su-mong-manh-trong-ha-tang-cong-nghe-toan-cau-20240721075621959.htm" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image12.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="The CrowdStrike incident exposed the fragility of the global technology infrastructure" 
                        description="On July 19, the world witnessed the paralysis of a series of network systems operating airports, hospitals, banks... everywhere." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://tuoitre.vn/su-co-crowdstrike-phoi-bay-su-mong-manh-trong-ha-tang-cong-nghe-toan-cau-20240721075621959.htm" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image13.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Samsung's biggest smartwatch yet" 
                        description="The Galaxy Watch Ultra marks Samsung's first foray into the sports-oriented smartwatch segment, with a host of in-depth features." />
                    </Card>
                    </a>
                </Col>
                


                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://znews.vn/ban-do-apple-vua-co-nang-cap-lon-post1488179.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image14.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Apple Maps Just Got a Major Upgrade" 
                        description="The launch of Apple Maps on the web shows that Apple wants to expand the service and reach more users." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://znews.vn/nhieu-co-hoi-moi-cho-cong-ty-viet-nam-trong-nganh-oto-post1487969.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image15.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' ,height : '390px' }}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="Many new opportunities for Vietnamese companies in the automobile industry" 
                        description="For software companies like FPT Automotive, manufacturers' increasing desire to proactively control both hardware and software will open up many new opportunities." />
                    </Card>
                </a>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8}>
                <a href="https://znews.vn/trien-lam-lg-oled-art-khai-phong-ky-nguyen-da-tuyet-dinh-post1488099.html" style={{ textDecoration: 'none' }}>
                    <Card
                        className="card-hover-effect no-padding-card"
                        hoverable
                        bordered={false}
                        cover={<img alt="example" src="/Image16.png" style={{ objectFit: 'cover', height: '200px', width: '100%' }} />}
                        style={{ textAlign: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' , height : '390px'}}
                    >
                        <p className="time-info">09:00 AM - 07/10/2024</p>
                        <Meta 
                        title="LG OLED ART Exhibition - 'Unleashing the era of multi-ultimate'" 
                        description="Technology and art inspire creativity, supporting the celebration of digital works through OLED TV technology from LG at the exhibition “Unleashing the era of multi-ultimate”." />
                    </Card>
                </a>
                </Col>

            </Row>
        </div>
    </div>
    )
}

export default BlogsTechnology;
