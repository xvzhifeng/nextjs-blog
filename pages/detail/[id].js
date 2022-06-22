import Layout from '../../components/layout'
// import {  getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    let res = await fetch('http://127.0.0.1:3000/api/getBlogInfo/getAllIds');
    let paths = await res.json()
    console.log(paths)
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps ({ params }) {

    console.log(params.id)
    let res = await fetch('http://127.0.0.1:3000/api/getBlogInfo/getById?id='+params.id);
    let data = await res.json()
    console.log(data)
    console.log(typeof data)
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
        'id' :params.id,
            contentHtml,
            ...matterResult.data
        }
    return {
        props: {
            postData
        }
    }
}