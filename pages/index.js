import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import useSWR from "swr";
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import TopBar from '../lib/topbar'
import {PREFIX_URL} from '../lib/api'
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import FileTree from '../components/fileTree';
import Router, { useRouter } from 'next/router';
export default function Home({ }) {
  let router = useRouter()
  console.log(router.query.kind)
  let kind = router.query.kind.trim()
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/getBlogInfo?kind=${kind}`, fetcher)
  if (!data) {
    return (
      <Layout home>
        <img
          src="/images/loading.gif"
        // className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
        // alt={name}
        />
      </Layout>
    )
  }
  return (
    <Layout home topbar={TopBar}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href={`/upload`}>
        <section className={utilStyles.headingMd}>
          <p>A wild programmer.</p>
          <p>
          </p>
        </section>
      </Link>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/detail/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <FileTree></FileTree> */}
    </Layout>
  )
}

// const App = () => {
//   const fetcher = (url) => fetch(url).then((res) => res.json())
//   const { data, error1 } = useSWR('/api/getBlogInfo/getTree', fetcher)
//   const onSelect = (selectedKeys, info) => {
//     console.log('selected', selectedKeys, info.node.path);
//   };
//   if (!data){
//     return <></>
//   }
//   console.log(data)
//   return (
//     <Tree
//       showLine
//       switcherIcon={<DownOutlined />}
//       defaultExpandedKeys={['0-0-0']}
//       onSelect={onSelect}
//       treeData={data}
//     />
//   );
// };
export async function getServerSideProps(context) {
  // const fetcher = (url) => fetch(url).then((res) => res.json())
  // const { data, error } = useSWR('http://localhost:3000/api/getBlogInfo', fetcher)
  // const res = await fetch(PREFIX_URL + '/api/getBlogInfo')
  // const data = await res.json()
  // let allPostsData = data
  // console.log(allPostsData)
  return {
    props: {
      allPostsData:""
    }
  }
}