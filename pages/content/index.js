import {
    DownOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import "antd/dist/antd.css"
import useSWR from "swr";
import { Tree } from 'antd';
import utilStyles from '../../styles/utils.module.css'
import FileTree from '../../components/fileTree';
const { Header, Content, Footer, Sider } = Layout;


export default function content() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Header className={utilStyles.siteLayoutBackground} style={{ padding: 0 }} />
            <Sider  collapsed={collapsed} onCollapse={value => setCollapsed(value)} >
                <div className={utilStyles.logo} />
                <FileTree></FileTree>
            </Sider>
            <Layout className="site-layout">
                
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={utilStyles.siteLayoutBackground} style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}