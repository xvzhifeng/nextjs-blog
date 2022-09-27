import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';
const menu = (
    <Menu
        selectable
        defaultSelectedKeys={['3']}
        items={[
            {
                key: '1',
                label: 'Item 1',
            },
            {
                key: '2',
                label: 'Item 2',
            },
            {
                key: '3',
                label: 'Item 3',
            },
        ]}
    />
);

const App = () => (
    <Dropdown overlay={menu}>
        <Typography.Link>
            <Space>
                Kind
                <DownOutlined />
            </Space>
        </Typography.Link>
    </Dropdown>
);

export default App;