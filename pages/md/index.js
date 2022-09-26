import Layout from '../../components/layout'
// import { getBlogDataByPath } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
// export default function Post() { 
//     return (
//         <></>
//     )
import { withRouter, useRouter } from 'next/router'
import useSWR from "swr"
// import {  getPostData } from '../../lib/posts'
// import matter from 'gray-matter'
// import { remark } from 'remark'
// import html from 'remark-html'
// import { createAwait } from '../../lib/mysql-client'
import MarkdownNav from '../../lib/markdown-nav'
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'
import { useEffect, useState } from 'react'
import ClipboardJS from "clipboard"
// import { Button, message, Space } from 'antd';

// }
const md = ({ router }) => {
    console.log(router)
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error1 } = useSWR('/api/getBlogInfo/getBlogByFile?path=' + router.query.mdfile1, fetcher)

    let [width, setWidth] = useState(0)

    useEffect(() => {
        console.log(window.screen.width)
        setWidth(window.screen.width)
    }, [])

    return (
        <Layout>
            <Head>
                <title>{data?.title}</title>
            </Head>

            {width >= 800 &&
                (
                    <div className={utilStyles.noScroll}>
                        <div className={utilStyles.leftNav}>
                            <MarkdownNav
                                source={data?.content}
                                ordered={false}
                                headingTopOffset={80}
                            >
                            </MarkdownNav>
                        </div>
                    </div>
                )}

            <article>
                <h1 className={utilStyles.headingXl}>{data?.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={data?.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: data?.contentHtml }} />
            </article>
        </Layout>
    )
}

let createCopyBtn = (id) => {
    let cb = document.createElement('div')
    cb.innerHTML = "复制"
    cb.setAttribute("id", id)
    cb.setAttribute("data-clipboard-action", "copy");
    cb.setAttribute("data-clipboard-target", "#pre" + id)
    cb.setAttribute("class", "btn1")
    cb.style.position = "absolute"
    cb.style.right = "31.5rem"
    cb.style.float = "right"
    cb.style.color = "white"
    return cb;
}
let copy = () => {
    var clipboard = new ClipboardJS('.btn1');
    clipboard.on('success', function (e) {
        console.log("复制成功")
        message.success("复制成功");

    });
    clipboard.on('error', function (e) {
        console.log("复制失败")
        message.success("复制失败");
    });
}

let addElement = () =>{
    // 配置 highlight.js
    hljs.configure({
        // 忽略未经转义的 HTML 字符
        ignoreUnescapedHTML: true
    })
    // 获取到内容中所有的code标签
    const codes = document?.querySelectorAll('pre code')
    // console.log(codes)
    codes.forEach((el) => {
        // 让code进行高亮
        hljs.highlightElement(el)
    })

    // copy to clipboard
    copy()
    // add copy need info
    let pre = document.getElementsByTagName("pre");
    for (let i = 0; i < pre.length; i++) {
        let code = pre[i].getElementsByTagName("code");
        code[0].setAttribute("id", `pre${i}`)
        pre[i].insertBefore(createCopyBtn(i), code[0])
    }

    
}

export default withRouter(md)

// export async function getStaticPaths() {
//     const paths = []
//     return {
//         paths,
//         fallback: true
//     }
// }

// export async function getStaticProps({params}) {
//     // console.log(router)
//     console.log(params)
//     // const postData = await getBlogDataByPath(params.mdfile)
//     return {
//         props: {
//             // postData
//         }
//     }
// }