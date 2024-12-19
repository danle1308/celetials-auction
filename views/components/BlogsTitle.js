'use client'


import { Button, Menu } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React from "react";
const { SubMenu } = Menu;
import "@/views/style/Blogs.css";
import Link from "next/link";
import Search from "antd/es/transfer/search";


const BlogsTitle = () =>{
    return(
        <div>
             <div style={{ margin: '80px auto', textAlign: 'center', maxWidth: '800px' }}>
            <h1>
                Our mission is to make 
                knowledge and news accessible for everyone.
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '40px' , marginTop: '30px' }}>
                With our integrated CRM, project management, collaboration and invoicing capabilities, 
                you can manage your business in one secure platform.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', maxWidth: '400px', width: '100%' , marginTop: '50px'}}>
                <Search
                    placeholder="Search..."
                    enterButton={
                        <Button style={{background : '#22C55E' , color : 'white' ,fontSize:'15px'}}>
                            <SearchOutlined/> Search
                        </Button>
                    }
                    size="large"
                />
            </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Menu mode="horizontal" className="directional">
        <Menu.Item key="technology">
          <Link href="/Blogs/Technology">Technology</Link>
        </Menu.Item>
        <Menu.Item key="development">
          <Link href="/Blogs/Development">Development</Link>
        </Menu.Item>
        <Menu.Item key="startUp">
          <Link href="/Blogs/StartUp">Start-up</Link>
        </Menu.Item> 
        </Menu>
        </div>
        </div>
       
    )
}
export default BlogsTitle;