import {
    DownOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import "antd/dist/antd.css"
import useSWR from "swr";
import { Tree } from 'antd';
import { MD_FILE_DIR } from '../lib/constant';
import { useRouter } from 'next/router'
// import appRootPath from 'app-root-path';


export default function FileTree () {
    // console.log(appRootPath)
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error1 } = useSWR('/api/getBlogInfo/getTree?path='+MD_FILE_DIR , fetcher)
    let router = useRouter()
    const onSelect = (selectedKeys, info) => {
        console.log("/md?mdfile="+`${info.node.path}\\${info.node.title}`)
        router.push({
            pathname: `/md`,
            query:{
                mdfile1: `${info.node.path}\\${info.node.title}`,
                isRefresh: true
            }
        })
        console.log('selected', selectedKeys, info.node.path);
    };
    if (!data) {
        return <></>
    }
    console.log(data)
    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0']}
            onSelect={onSelect}
            treeData={data}
        />
    );
};