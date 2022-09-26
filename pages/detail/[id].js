import Layout from '../../components/layout'
// import {  getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { createAwait } from '../../lib/mysql-client'
import MarkdownNav from '../../lib/markdown-nav'
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'
import { useEffect, useState } from 'react'
import ClipboardJS from "clipboard"
import { Button, message, Space } from 'antd';



let CopyBtn = () => {
    return (
        <div className={utilStyles.CopyBtn}>
            <button>复制代码</button>
        </div>
    )
}

export default function detail({ postData }) {
    // let content = postData.content.replace(/```[^`\n]*\n+[^```]+```\n*/g, '')
    // console.log(content)
    let [width, setWidth] = useState(0)
    let createCopyBtn = (id) => {
        let cb = document.createElement('div')
        cb.innerHTML = "复制"
        cb.setAttribute("id",id)
        cb.setAttribute("data-clipboard-action", "copy");
        cb.setAttribute("data-clipboard-target", "#pre"+id)
        cb.setAttribute("class", "btn1")
        cb.style.position = "absolute"
        cb.style.right = "31.5rem"
        cb.style.float = "right"
        cb.style.color = "white"
        // cb.onclick = (cb) => {
        //     console.log(id)
        // }
        // cb.addEventListener('click',(envent, cb) => {
        //     console.log(envent)
        //     console.log(envent.path)
        //     console.log(cb)
        //     alert("test")
        // })
        return cb;
    }
    let copy = () => {
        var clipboard = new ClipboardJS('.btn1');
        clipboard.on('success', function(e) {
            console.log("复制成功")
            message.success("复制成功");
            
        });
        clipboard.on('error', function(e) {
            console.log("复制失败")
            message.success("复制失败");
        });
    }

    useEffect(() => {
        console.log(window.screen.width)
        setWidth(window.screen.width)
        
        // 配置 highlight.js
        hljs.configure({
            // 忽略未经转义的 HTML 字符
            ignoreUnescapedHTML: true
        })
        // 获取到内容中所有的code标签
        const codes = document.querySelectorAll('pre code')
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
            code[0].setAttribute("id",`pre${i}`)
            pre[i].insertBefore(createCopyBtn(i), code[0])
        }
        console.log(width)
    }, [])

    return (
        <Layout>
            <Head>
                <title>{postData?.title}</title>
            </Head>
            { width>=800 &&
            (
                <div className={utilStyles.noScroll}>
                <div className={utilStyles.leftNav}>
                    <MarkdownNav
                        source={postData?.content}
                        ordered={false}
                        headingTopOffset={80}
                    >
                    </MarkdownNav>
                </div>
            </div>
            )}
            

            <article>
                <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData?.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData?.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    let client = createAwait()
    let select_md = "select file_name from blog_content where file_name like '%md'"
    let results = await client.awaitQuery(select_md)
    let paths = results.map(fileName => {
        return {
            params: {
                id: fileName.file_name.replace(/\.md$/, '')
            }
        }
    })
    // console.log(paths);
    // let res = await fetch('/api/getBlogInfo/getAllIds');
    // let paths = await res.json()
    // console.log(paths)
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    let client = createAwait()
    let select_md = `select * from blog_content where file_name like '%md' and file_name = '${params.id}.md'`
    console.log(params.id)
    let results = await client.awaitQuery(select_md)
    let data = await results.map(result => {
        // console.log(result.content.toString())
        let content = result.content.toString();
        // console.log(content)
        return {
            'id': result.file_name,
            content,
            'date': result.create_date
        }
    })
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(data[0].content)

    // // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // // Combine the data with the id and contentHtml
    // return {
    //     id,
    //     contentHtml,
    //     ...matterResult.data
    // }
    // const postData = await getPostData(params.id)
    const postData = {
        'id': params.id,
        contentHtml,
        'title': params.id,
        'content': data[0].content.replace(/```[^`\n]*\n+[^```]+```\n*/g, ''),
        ...matterResult.data
    }
    // console.log(postData)
    return {
        props: {
            postData
        },
        revalidate: 10,
    }
}